from django.db import migrations
from django.utils.text import slugify


def populate_unique_slugs(apps, schema_editor):
    Product = apps.get_model("shop", "Product")
    used_slugs = set()
    for product in Product.objects.order_by("pk"):
        base_slug = slugify(product.name) or "producto"
        candidate = base_slug
        suffix = 2
        while candidate in used_slugs:
            candidate = f"{base_slug}-{suffix}"
            suffix += 1
        used_slugs.add(candidate)
        Product.objects.filter(pk=product.pk).update(slug=candidate)


class Migration(migrations.Migration):
    dependencies = [("shop", "0006_remove_cart_user_remove_cartitem_cart_and_more")]

    operations = [migrations.RunPython(populate_unique_slugs, migrations.RunPython.noop)]
