from django.urls import path

from .views import ContactMessageCreateView, NewsletterSubscriptionCreateView


app_name = "contact"

urlpatterns = [
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
    path("newsletter/", NewsletterSubscriptionCreateView.as_view(), name="newsletter-create"),
]
