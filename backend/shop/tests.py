import tempfile
from io import StringIO
from pathlib import Path

from django.core.management import call_command
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product


class ProductApiTests(APITestCase):
    def setUp(self):
        self.featured = Product.objects.create(
            name="Avena Calma",
            description="Suave",
            price=350,
            stock=10,
            category=Product.Category.SOFT,
            is_featured=True,
        )
        Product.objects.create(
            name="Coco Puro",
            description="Fresco",
            price=350,
            stock=8,
            category=Product.Category.CLASSIC,
        )
        Product.objects.create(
            name="Oculto",
            description="No visible",
            price=300,
            stock=2,
            is_active=False,
        )

    def test_list_returns_only_active_products(self):
        response = self.client.get(reverse("shop:product-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 2)

    def test_filters_by_category_and_featured(self):
        response = self.client.get(reverse("shop:product-list"), {"category": "suaves", "featured": "true"})
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["name"], "Avena Calma")

    def test_detail_uses_slug(self):
        response = self.client.get(reverse("shop:product-detail", kwargs={"slug": self.featured.slug}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["category_label"], "Piel sensible")

    def test_duplicate_names_receive_unique_slugs(self):
        duplicate = Product.objects.create(
            name="Avena Calma",
            description="Otra fórmula",
            price=360,
            stock=2,
        )
        self.assertEqual(self.featured.slug, "avena-calma")
        self.assertEqual(duplicate.slug, "avena-calma-2")

    def test_inactive_product_detail_is_not_public(self):
        response = self.client.get(reverse("shop:product-detail", kwargs={"slug": "oculto"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_page_size_can_be_requested_and_is_capped(self):
        response = self.client.get(reverse("shop:product-list"), {"page_size": 1})
        self.assertEqual(len(response.data["results"]), 1)
        self.assertIsNotNone(response.data["next"])

        Product.objects.bulk_create(
            Product(name=f"Extra {index}", slug=f"extra-{index}", description="Extra", price=100)
            for index in range(120)
        )
        response = self.client.get(reverse("shop:product-list"), {"page_size": 500})
        self.assertEqual(len(response.data["results"]), 100)

    def test_demo_catalog_has_unique_images(self):
        with tempfile.TemporaryDirectory() as media_root, override_settings(MEDIA_ROOT=media_root):
            call_command("seed_products", "--reset", stdout=StringIO())
            products = Product.objects.filter(is_active=True)
            images = list(products.values_list("image", flat=True))

            self.assertEqual(products.count(), 10)
            self.assertEqual(len(images), len(set(images)))
            for image in images:
                self.assertTrue((Path(media_root) / image).is_file(), image)

            # Running it again reuses the stored photos instead of duplicating them.
            call_command("seed_products", stdout=StringIO())
            self.assertEqual(sorted(images), sorted(products.values_list("image", flat=True)))
