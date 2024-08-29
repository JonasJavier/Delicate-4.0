from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import logging

logger = logging.getLogger(__name__)

class UppercaseValidator:
    def __init__(self, min_upper=1):
        self.min_upper = min_upper

    def validate(self, password, user=None):
        if sum(1 for c in password if c.isupper()) < self.min_upper:
            raise ValidationError(
                _("La contraseña debe contener al menos %(min_upper)d letra mayúscula."),
                code='password_no_upper',
                params={'min_upper': self.min_upper},
            )

    def get_help_text(self):
        return _(
            "Tu contraseña debe contener al menos %(min_upper)d letra mayúscula."
        ) % {'min_upper': self.min_upper}

class LowercaseValidator:
    def __init__(self, min_lower=1):
        self.min_lower = min_lower

    def validate(self, password, user=None):
        if sum(1 for c in password if c.islower()) < self.min_lower:
            raise ValidationError(
                _("La contraseña debe contener al menos %(min_lower)d letra minúscula."),
                code='password_no_lower',
                params={'min_lower': self.min_lower},
            )

    def get_help_text(self):
        return _(
            "Tu contraseña debe contener al menos %(min_lower)d letra minúscula."
        ) % {'min_lower': self.min_lower}

class CustomPasswordValidator:
    def validate(self, password, user=None):
        logger.debug("Validating password...")
        if len(password) < 8:
            logger.debug("Password too short")
            raise ValidationError(
                _("La contraseña debe tener al menos 8 caracteres."),
                code='password_too_short'
            )
        if password.isdigit():
            logger.debug("Password is entirely numeric")
            raise ValidationError(
                _("La contraseña no puede ser completamente numérica."),
                code='password_entirely_numeric'
            )
        logger.debug("Password validation passed")
