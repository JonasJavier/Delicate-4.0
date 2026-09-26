import tempfile
from pathlib import Path
from unittest import mock

from django.db import DatabaseError
from django.test import TestCase, override_settings
from django.urls import reverse


class HealthCheckTests(TestCase):
    def test_reports_ok_when_database_answers(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_reports_unavailable_when_database_fails(self):
        with mock.patch("backend.views.connection.cursor", side_effect=DatabaseError("down")):
            with self.assertLogs("backend.views", level="ERROR"):
                response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 503)


class MediaTests(TestCase):
    def setUp(self):
        self.media_root = tempfile.TemporaryDirectory()
        self.addCleanup(self.media_root.cleanup)
        products = Path(self.media_root.name) / "products"
        products.mkdir()
        (products / "foto.webp").write_bytes(b"RIFF-demo")

    def test_serves_uploaded_images_with_cache_headers(self):
        with override_settings(MEDIA_ROOT=self.media_root.name):
            response = self.client.get("/media/products/foto.webp")
        self.addCleanup(response.close)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(b"".join(response.streaming_content), b"RIFF-demo")
        self.assertIn("max-age=604800", response["Cache-Control"])

    def test_rejects_paths_outside_media_root(self):
        with override_settings(MEDIA_ROOT=self.media_root.name):
            response = self.client.get("/media/../settings.py")
        # Django answers a traversal attempt with 400 (SuspiciousFileOperation).
        self.assertIn(response.status_code, {400, 404})


class SecurityHeadersTests(TestCase):
    @override_settings(CONTENT_SECURITY_POLICY="default-src 'self'")
    def test_adds_hardening_headers(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response["Content-Security-Policy"], "default-src 'self'")
        self.assertIn("camera=()", response["Permissions-Policy"])
        self.assertEqual(response["X-Frame-Options"], "DENY")
