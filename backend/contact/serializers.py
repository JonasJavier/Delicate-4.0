from rest_framework import serializers
from .models import NewsletterSubscription  # Asegúrate de importar el modelo

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['email']

    def validate_email(self, value):
        """
        Validate that the email is valid and not already subscribed.
        """
        if NewsletterSubscription.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value
