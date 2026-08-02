from rest_framework import serializers

from .models import ContactMessage, NewsletterSubscription


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "subject", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]

    def validate_name(self, value):
        return value.strip()

    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("El asunto debe tener al menos 3 caracteres.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("El mensaje debe tener al menos 10 caracteres.")
        if len(value) > 5000:
            raise serializers.ValidationError("El mensaje no puede superar 5000 caracteres.")
        return value


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]

    def validate_email(self, value):
        return value.strip().lower()
