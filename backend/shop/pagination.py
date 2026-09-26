from rest_framework.pagination import PageNumberPagination


class CatalogPagination(PageNumberPagination):
    """Lets the storefront request the whole catalog in one call."""

    page_size = 24
    page_size_query_param = "page_size"
    max_page_size = 100
