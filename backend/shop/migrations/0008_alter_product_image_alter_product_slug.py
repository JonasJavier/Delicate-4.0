import django.core.validators
import shop.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("shop", "0007_populate_unique_product_slugs")]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="products/",
                validators=[
                    django.core.validators.FileExtensionValidator(["jpg", "jpeg", "png", "webp"]),
                    shop.models.validate_image_size,
                ],
                verbose_name="imagen",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="slug",
            field=models.SlugField(blank=True, max_length=180, unique=True),
        ),
    ]
