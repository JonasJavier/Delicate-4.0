from django.test import TestCase

from .models import CustomUser


class CustomUserManagerTests(TestCase):
    def test_creates_superuser_for_admin_access(self):
        user = CustomUser.objects.create_superuser("owner@example.com", "a-strong-test-password")

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertTrue(user.check_password("a-strong-test-password"))

    def test_rejects_superuser_without_staff_permission(self):
        with self.assertRaises(ValueError):
            CustomUser.objects.create_superuser(
                "owner@example.com",
                "a-strong-test-password",
                is_staff=False,
            )
