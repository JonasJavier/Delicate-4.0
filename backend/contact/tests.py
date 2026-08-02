from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, NewsletterSubscription


class ContactApiTests(APITestCase):
    def setUp(self):
        cache.clear()

    def test_creates_contact_message(self):
        response = self.client.post(
            reverse("contact:contact-create"),
            {
                "name": "Ana",
                "email": "ana@example.com",
                "subject": "Pedido especial",
                "message": "Quiero 20 jabones.",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_normalizes_newsletter_email(self):
        response = self.client.post(
            reverse("contact:newsletter-create"),
            {"email": "ANA@Example.com"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsletterSubscription.objects.get().email, "ana@example.com")

    def test_rejects_message_that_is_too_short(self):
        response = self.client.post(
            reverse("contact:contact-create"),
            {
                "name": "Ana",
                "email": "ana@example.com",
                "subject": "Ayuda",
                "message": "Hola",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("message", response.data)

    def test_rate_limits_contact_spam(self):
        payload = {
            "name": "Ana",
            "email": "ana@example.com",
            "subject": "Pedido",
            "message": "Quiero información de un pedido.",
        }
        for _ in range(10):
            response = self.client.post(reverse("contact:contact-create"), payload, format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse("contact:contact-create"), payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
