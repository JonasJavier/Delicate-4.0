import logging

# Django Imports
from django.contrib.auth import get_user_model, login
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

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

# Get User model
User = get_user_model()

# Set up logging
logger = logging.getLogger(__name__)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            logger.debug(f"Attempting to validate email: {email}")
            validate_password(password)

            if User.objects.filter(email=email).exists():
                logger.debug(f"Email {email} is already registered.")
                return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(email=email, password=password)
            UserProfile.objects.create(user=user, email=email)
            logger.debug(f"User {email} registered successfully.")
            return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            logger.error(f"Validation Error: {e}")
            return Response({"password": e.messages}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected Error: {e}")
            return Response({"error": "Unexpected error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            profile = self.request.user.profile
            logger.debug(f"Profile found for user {self.request.user.email}")
            return profile
        except UserProfile.DoesNotExist:
            logger.error(f"Profile does not exist for user {self.request.user.email}")
            raise NotFound("El perfil de usuario no existe.")

    def get(self, request):
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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
            return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid verification link!'}, status=status.HTTP_400_BAD_REQUEST)

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'This is a protected view'})

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
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Authentication failed'}, status=status.HTTP_400_BAD_REQUEST)
        except (MissingBackend, AuthTokenError, AuthForbidden) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
