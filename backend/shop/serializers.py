from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "slug",
            "name",
            "short_description",
            "description",
            "price",
            "stock",
            "image",
            "category",
            "category_label",
            "ingredients",
            "benefit",
            "skin_type",
            "weight_grams",
            "is_featured",
        ]
