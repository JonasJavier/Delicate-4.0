import logging

# Django Imports
from django.contrib.auth import get_user_model, login
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import update_session_auth_hash

# Django Rest Framework Imports
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import NotFound

# Social Auth Imports
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden

# Local Imports
from .models import UserProfile
from .serializers import UserSerializer, MyTokenObtainPairSerializer, UserProfileSerializer

# Obtener el modelo de usuario
User = get_user_model()

# Configuración del logger
logger = logging.getLogger(__name__)

# Vista para registrar usuarios
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            logger.debug(_("Attempting to validate email: %(email)s") % {'email': email})
            validate_password(password)

            if User.objects.filter(email=email).exists():
                logger.debug(_("Email %(email)s is already registered.") % {'email': email})
                return Response({"error": _("This email is already registered.")}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(email=email, password=password)

            # Asegurar la creación del perfil
            try:
                profile = UserProfile.objects.create(user=user, email=email)
                logger.debug(_("Profile created for user %(email)s.") % {'email': email})
            except Exception as profile_error:
                user.delete()  # Rollback user creation if profile fails
                logger.error(_("Failed to create profile for %(email)s: %(error)s") % {'email': email, 'error': profile_error})
                return Response({"error": _("Error creating user profile.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            logger.debug(_("User %(email)s registered successfully.") % {'email': email})
            return Response({"message": _("User registered successfully.")}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            logger.error(_("Validation Error: %(error)s") % {'error': e})
            return Response({"password": e.messages}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(_("Unexpected Error: %(error)s") % {'error': e})
            return Response({"error": _("Unexpected error occurred.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Vista personalizada para obtener el token JWT
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            logger.error(_("Error during token obtain: %(error)s") % {'error': e})
            return Response({'error': _("An error occurred during authentication. Please try again later.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Vista para obtener y actualizar el perfil del usuario
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            profile = self.request.user.profile
            logger.debug(_("Profile found for user %(email)s") % {'email': self.request.user.email})
            return profile
        except UserProfile.DoesNotExist:
            logger.error(_("Profile does not exist for user %(email)s") % {'email': self.request.user.email})
            raise NotFound(_("User profile not found."))

    def put(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        logger.warning(_("Profile update failed: %(errors)s") % {'errors': serializer.errors})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para verificar el correo electrónico del usuario
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_email_verified = True
            user.save()
            return Response({'message': _("Email verified successfully!")}, status=status.HTTP_200_OK)
        else:
            return Response({'message': _("Invalid verification link!")}, status=status.HTTP_400_BAD_REQUEST)

# Vista protegida de ejemplo
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': _("This is a protected view.")})

# Vista para el inicio de sesión con Google
class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        backend = 'google-oauth2'
        strategy = load_strategy(request)
        token = request.data.get('access_token')

        try:
            backend = load_backend(strategy=strategy, name=backend, redirect_uri=None)
            user = backend.do_auth(token)
            if user and user.is_active:
                login(request, user)
                return Response({'message': _("Login successful")}, status=status.HTTP_200_OK)
            else:
                return Response({'error': _("Authentication failed")}, status=status.HTTP_400_BAD_REQUEST)
        except (MissingBackend, AuthTokenError, AuthForbidden) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not user.check_password(current_password):
            return Response({"error": _("The current password is incorrect.")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password, user)
            user.set_password(new_password)
            user.save()

            update_session_auth_hash(request, user)

            return Response({"message": _("Password changed successfully.")}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)