from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer


class ContactMessageCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ContactMessageSerializer


class NewsletterSubscriptionCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewsletterSubscriptionSerializer
