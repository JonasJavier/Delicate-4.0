from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle, ScopedRateThrottle

from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer


class ContactMessageCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ContactMessageSerializer
    throttle_classes = [AnonRateThrottle, ScopedRateThrottle]
    throttle_scope = "contact"


class NewsletterSubscriptionCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewsletterSubscriptionSerializer
    throttle_classes = [AnonRateThrottle, ScopedRateThrottle]
    throttle_scope = "newsletter"
