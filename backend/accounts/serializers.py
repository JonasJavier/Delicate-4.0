from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db import IntegrityError
from django.contrib.auth.hashers import make_password
from django.core.validators import EmailValidator, validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _
from .models import UserProfile

# Obtener el modelo de usuario personalizado
User = get_user_model()

# Serializer para la creación y validación de usuarios
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[EmailValidator(message=_("Please enter a valid email address."))]
    )
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            "min_length": _("Password must be at least 8 characters long.")
        }
    )

    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def create(self, validated_data):
        try:
            validated_data['password'] = make_password(validated_data.get('password'))
            user = User.objects.create_user(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'email': [_("This email is already registered.")]})
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        return user

# Serializer para la obtención de tokens JWT con manejo de errores personalizado
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(username=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError(_('User is inactive'))
                data = super().validate(attrs)
                data['user'] = {
                    'email': user.email
                }
                return data
            else:
                raise serializers.ValidationError(_('Incorrect email or password'))
        else:
            raise serializers.ValidationError(_('Must include "email" and "password"'))

        return data

# Serializer para el perfil de usuario con validaciones robustas
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'billing_first_name',
            'billing_last_name',
            'company_name',
            'street_address',
            'country',
            'state',
            'zip_code',
            'billing_email',
            'billing_phone',
        ]
        read_only_fields = ['email']  # El email principal no debe ser editable

    def validate(self, data):
        """
        Centraliza todas las validaciones de campos.
        """
        # Validar que el correo de facturación es válido y no es igual al correo principal
        billing_email = data.get('billing_email')
        if billing_email:
            if billing_email == self.instance.email:
                raise serializers.ValidationError(
                    _("Personal and billing emails must be different.")
                )
            try:
                validate_email(billing_email)
            except DjangoValidationError:
                raise serializers.ValidationError(
                    {"billing_email": _("Please enter a valid billing email address.")}
                )
        
        # Validar formato de número de teléfono
        phone_number = data.get('phone_number')
        if phone_number and len(phone_number) < 10:
            raise serializers.ValidationError(
                {"phone_number": _("Phone number must be at least 10 digits long.")}
            )

        return data

    def update(self, instance, validated_data):
        """
        Personaliza el comportamiento de actualización de perfiles.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.billing_first_name = validated_data.get('billing_first_name', instance.billing_first_name)
        instance.billing_last_name = validated_data.get('billing_last_name', instance.billing_last_name)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.street_address = validated_data.get('street_address', instance.street_address)
        instance.country = validated_data.get('country', instance.country)
        instance.state = validated_data.get('state', instance.state)
        instance.zip_code = validated_data.get('zip_code', instance.zip_code)
        instance.billing_email = validated_data.get('billing_email', instance.billing_email)
        instance.billing_phone = validated_data.get('billing_phone', instance.billing_phone)

        instance.save()
        return instance
