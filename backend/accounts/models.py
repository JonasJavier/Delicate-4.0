from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import EmailValidator, RegexValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.mail import send_mail 
import random 

# Manager personalizado para el modelo CustomUser
class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

# Modelo de usuario personalizado
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message=_("Please enter a valid email address."))]
    )
    is_email_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, null=True)  
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def generate_and_send_verification_code(self):
        """Genera un código de verificación y envía un correo."""
        self.verification_code = str(random.randint(100000, 999999))
        self.save()
        self.send_verification_email()

    def send_verification_email(self):
        """Envía el código de verificación por correo."""
        send_mail(
            subject="Your Verification Code",
            message=f"Your verification code is: {self.verification_code}",
            from_email="no-reply@yourdomain.com",
            recipient_list=[self.email],
            fail_silently=False,
        )

    def validate_verification_code(self, code):
        """Valida el código de verificación."""
        if self.verification_code == code:
            self.verification_code = None  
            self.save()
            return True
        return False


User = CustomUser


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(
        validators=[EmailValidator(message=_("Please enter a valid email address."))], 
        blank=True, 
        null=True
    )
    
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message=_("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
            )
        ]
    )
    
    billing_first_name = models.CharField(max_length=50, blank=True, null=True)
    billing_last_name = models.CharField(max_length=50, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    street_address = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    
    billing_email = models.EmailField(
        validators=[EmailValidator(message=_("Please enter a valid email address."))], 
        blank=True, 
        null=True
    )
    
    billing_phone = models.CharField(
        max_length=15, 
        blank=True, 
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message=_("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
            )
        ]
    )

    def __str__(self):
        return f"{self.user.email} Profile"

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")
