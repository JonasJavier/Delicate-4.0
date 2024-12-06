# accounts/urls.py
from django.urls import path, include
from .views import (
    MyTokenObtainPairView, RegisterView, UserProfileView, VerifyEmailView, 
    ProtectedView, GoogleLoginView, ChangePasswordView, TwoFactorAuthView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify_email'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('auth/', include('rest_framework_social_oauth2.urls')),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('google-login/', GoogleLoginView.as_view(), name='google_login'),  
    path('auth/', TwoFactorAuthView.as_view(), name='two_factor_auth'),
]
