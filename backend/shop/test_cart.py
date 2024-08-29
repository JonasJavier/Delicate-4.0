from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Product, Cart, CartItem
from rest_framework_simplejwt.tokens import RefreshToken  # Importar JWT

User = get_user_model()

class CartTests(APITestCase):

    def setUp(self):
        # Crear un usuario de prueba
        self.user = User.objects.create_user(email="testuser@example.com", password="password123")

        # Obtener el token de acceso JWT
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # Autenticar al usuario usando el token JWT
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

        # Crear productos de ejemplo
        self.product1 = Product.objects.create(name="Producto 1", description="Descripción 1", price=10.00, stock=5)
        self.product2 = Product.objects.create(name="Producto 2", description="Descripción 2", price=20.00, stock=3)

        # URL endpoints con espacio de nombres
        self.cart_detail_url = reverse('shop:cart_detail')
        self.add_to_cart_url = reverse('shop:add_to_cart')
        self.update_cart_item_url = reverse('shop:update_cart_item')
        self.remove_from_cart_url = reverse('shop:remove_from_cart', kwargs={'cart_item_id': 1})
        self.product_list_url = reverse('shop:product_list')

    def tearDown(self):
        # Limpiar el carrito del usuario después de cada prueba
        Cart.objects.filter(user=self.user).delete()

    def test_product_list(self):
        """Probar la obtención de la lista de productos"""
        response = self.client.get(self.product_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_add_to_cart(self):
        """Probar la adición de productos al carrito"""
        data = {'product_id': self.product1.id, 'quantity': 2}
        response = self.client.post(self.add_to_cart_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['items'][0]['product']['name'], "Producto 1")
        self.assertEqual(response.data['items'][0]['quantity'], 2)

    def test_update_cart_item(self):
        """Probar la actualización de un producto en el carrito"""
        # Añadir un producto primero
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 1})
        cart_item = CartItem.objects.first()

        # Actualizar la cantidad del producto en el carrito
        data = {'cart_item_id': cart_item.id, 'quantity': 3}
        response = self.client.post(self.update_cart_item_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['items'][0]['quantity'], 3)

    def test_remove_from_cart(self):
        """Probar la eliminación de un producto del carrito"""
        # Añadir un producto primero
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 1})
        cart_item = CartItem.objects.first()

        # Eliminar el producto del carrito
        remove_url = reverse('shop:remove_from_cart', kwargs={'cart_item_id': cart_item.id})
        response = self.client.delete(remove_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 0)

    def test_cart_detail(self):
        """Probar la obtención del detalle del carrito"""
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 2})
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['items'][0]['quantity'], 2)
        self.assertEqual(response.data['items'][0]['product']['name'], "Producto 1")
