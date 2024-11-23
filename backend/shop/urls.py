# shop/urls.py
from django.urls import path
from .views import product_list, cart_detail, add_to_cart, update_cart_item, remove_from_cart, add_product, delete_product, product_detail, ProductReviewView


app_name = 'shop'

urlpatterns = [
    path('products/', product_list, name='product_list'),
    path('products/add/', add_product, name='add_product'),
    path('products/delete/<int:product_id>/', delete_product, name='delete_product'),  # Nueva ruta para eliminar producto
    path('cart/', cart_detail, name='cart_detail'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/update/', update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:cart_item_id>/', remove_from_cart, name='remove_from_cart'),
    path('products/<int:id>/', product_detail, name='product_detail'),
    path('products/<int:product_id>/reviews/', ProductReviewView.as_view(), name='product-reviews'),
    
]
