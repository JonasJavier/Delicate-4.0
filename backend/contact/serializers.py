from rest_framework import serializers

from .models import ContactMessage, NewsletterSubscription


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "subject", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]

    def validate_email(self, value):
        return value.strip().lower()
