import logging

# Django Imports
from google.auth.transport import requests
from django.contrib.auth import get_user_model, login
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as trans
from django.contrib.auth import update_session_auth_hash
from google.oauth2 import id_token
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import AuthTokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import JSONParser

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

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            logger.debug("Attempting to register user with email: %s", email)

            # Validar la contraseña
            validate_password(password)

            # Verificar si el correo ya está registrado
            if User.objects.filter(email=email).exists():
                logger.debug("Email %s is already registered", email)
                return Response({"error": trans("This email is already registered.")}, status=status.HTTP_400_BAD_REQUEST)

            # Crear un nuevo usuario
            user = User.objects.create_user(email=email, password=password)
            profile = UserProfile.objects.create(user=user, email=email)
            
            logger.debug("User registered successfully with email: %s", email)

            return Response({
                "message": trans("User registered successfully. You can now log in.")
            }, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            logger.error("Password validation error: %s", e)
            # Devolver todos los errores de validación de la contraseña
            return Response({"errors": e.messages}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error("Unexpected error during registration: %s", e)
            return Response({"error": trans("Unexpected error occurred.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TwoFactorAuthView(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        verification_code = request.data.get("verification_code")

        try:
            user = User.objects.get(email=email)

            if verification_code:
                # Paso 2: Validar el código de verificación
                if user.validate_verification_code(verification_code):
                    # Generar tokens JWT al validar el código
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "message": trans("Login successful."),
                        "access_token": str(refresh.access_token),
                        "refresh_token": str(refresh),
                    }, status=status.HTTP_200_OK)
                return Response({"error": trans("Invalid verification code.")}, status=status.HTTP_400_BAD_REQUEST)

            # Paso 1: Validar credenciales y enviar código
            if not user.check_password(password):
                return Response({"error": trans("Invalid credentials.")}, status=status.HTTP_400_BAD_REQUEST)

            if not user.is_active:
                return Response({"error": trans("Account is disabled.")}, status=status.HTTP_400_BAD_REQUEST)

            # Generar y enviar el código de verificación
            user.generate_and_send_verification_code()
            return Response({"message": trans("Verification code sent to your email.")}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": trans("User does not exist.")}, status=status.HTTP_404_NOT_FOUND)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            logger.error(trans("Error during token obtain: %(error)s") % {'error': e})
            return Response({'error': trans("An error occurred during authentication. Please try again later.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            profile = self.request.user.profile
            logger.debug(trans("Profile found for user %(email)s") % {'email': self.request.user.email})
            return profile
        except UserProfile.DoesNotExist:
            logger.error(trans("Profile does not exist for user %(email)s") % {'email': self.request.user.email})
            raise NotFound(trans("User profile not found."))

    def put(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        logger.warning(trans("Profile update failed: %(errors)s") % {'errors': serializer.errors})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            return Response({'message': trans("Email verified successfully!")}, status=status.HTTP_200_OK)
        else:
            return Response({'message': trans("Invalid verification link!")}, status=status.HTTP_400_BAD_REQUEST)


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': trans("This is a protected view.")})


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = getattr(request, 'json_body', {})
        token = data.get('id_token')
        logger.debug("Received Google id_token: %s", token)

        if not token:
            return Response({'error': trans("Google id_token is missing")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                "***REMOVED***.apps.googleusercontent.com"
            )
            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            if not email:
                return Response({'error': trans("Email not available in token")}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=email)
            if created:
                logger.info(f"New user registered with email: {email}")
                user.is_email_verified = True
                user.save()

            profile, _ = UserProfile.objects.get_or_create(user=user)
            if first_name:
                profile.first_name = first_name
            if last_name:
                profile.last_name = last_name
            profile.email = email
            profile.save()

            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                'message': trans("Login successful"),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': {
                    'email': user.email,
                    'first_name': profile.first_name,
                    'last_name': profile.last_name,
                    'is_admin': user.is_superuser
                }
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            logger.error("Google id_token error: %s", e)
            return Response({'error': trans("Invalid token")}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error("Unexpected error during Google login: %s", e)
            return Response({'error': trans("An unexpected error occurred.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not user.check_password(current_password):
            return Response({"error": trans("The current password is incorrect.")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password, user)
            user.set_password(new_password)
            user.save()

            update_session_auth_hash(request, user)

            return Response({"message": trans("Password changed successfully.")}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)
