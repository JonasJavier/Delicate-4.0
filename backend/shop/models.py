from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Product(models.Model):
    class Category(models.TextChoices):
        SOFT = "suaves", "Piel sensible"
        NOURISHING = "nutritivos", "Nutritivos"
        CLASSIC = "clasicos", "Clásicos"
        AROMATIC = "aromaticos", "Aromáticos"
        BOTANICAL = "botanicos", "Botánicos"
        GIFT = "regalos", "Para regalar"

    name = models.CharField("nombre", max_length=160)
    slug = models.SlugField(max_length=180, blank=True, db_index=True)
    short_description = models.CharField("descripción breve", max_length=180, blank=True)
    description = models.TextField("descripción")
    price = models.DecimalField(
        "precio (RD$)",
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    stock = models.PositiveIntegerField("existencias", default=0)
    image = models.ImageField("imagen", upload_to="products/", blank=True, null=True)
    category = models.CharField(
        "categoría",
        max_length=20,
        choices=Category.choices,
        default=Category.CLASSIC,
    )
    ingredients = models.TextField("ingredientes", blank=True, default="")
    benefit = models.CharField("beneficio principal", max_length=120, blank=True)
    skin_type = models.CharField("tipo de piel", max_length=120, blank=True)
    weight_grams = models.PositiveSmallIntegerField("peso (g)", default=100)
    is_featured = models.BooleanField("destacado", default=False)
    is_active = models.BooleanField("activo", default=True)
    created_at = models.DateTimeField("creado", default=timezone.now, editable=False)
    updated_at = models.DateTimeField("actualizado", auto_now=True)

    class Meta:
        ordering = ["-is_featured", "name"]
        verbose_name = "producto"
        verbose_name_plural = "productos"
        indexes = [models.Index(fields=["is_active", "category"])]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "producto"
            slug = base_slug
            suffix = 2
            while Product.objects.exclude(pk=self.pk).filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
