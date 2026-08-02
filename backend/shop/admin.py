from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "is_featured", "is_active")
    list_editable = ("price", "stock", "is_featured", "is_active")
    list_filter = ("category", "is_featured", "is_active")
    search_fields = ("name", "description", "ingredients")
    readonly_fields = ("created_at", "updated_at")
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        ("Información principal", {"fields": ("name", "slug", "short_description", "description", "image")}),
        ("Venta", {"fields": ("price", "stock", "category", "is_featured", "is_active")}),
        ("Detalles", {"fields": ("ingredients", "benefit", "skin_type", "weight_grams")}),
        ("Registro", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )
