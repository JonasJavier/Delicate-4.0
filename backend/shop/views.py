from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Product
from .serializers import ProductSerializer


class ProductListView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")
        search = self.request.query_params.get("search", "").strip()

        if category:
            queryset = queryset.filter(category=category)
        if featured and featured.lower() in {"1", "true", "yes"}:
            queryset = queryset.filter(is_featured=True)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(description__icontains=search)
                | Q(ingredients__icontains=search)
            )
        return queryset


class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Product.objects.filter(is_active=True)
