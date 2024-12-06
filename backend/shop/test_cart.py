from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Product, Cart, CartItem
from rest_framework_simplejwt.tokens import RefreshToken  # Import JWT

User = get_user_model()

class CartTests(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(email="testuser@example.com", password="password123")

        # Get the JWT access token
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # Authenticate the user using the JWT token
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

        # Create sample products
        self.product1 = Product.objects.create(name="Product 1", description="Description 1", price=10.00, stock=5)
        self.product2 = Product.objects.create(name="Product 2", description="Description 2", price=20.00, stock=3)

        # URL endpoints with namespace
        self.cart_detail_url = reverse('shop:cart_detail')
        self.add_to_cart_url = reverse('shop:add_to_cart')
        self.update_cart_item_url = reverse('shop:update_cart_item')
        self.remove_from_cart_url = reverse('shop:remove_from_cart', kwargs={'cart_item_id': 1})
        self.product_list_url = reverse('shop:product_list')

    def tearDown(self):
        # Clear the user's cart after each test
        Cart.objects.filter(user=self.user).delete()

    def test_product_list(self):
        """Test retrieving the product list"""
        response = self.client.get(self.product_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_add_to_cart(self):
        """Test adding products to the cart"""
        data = {'product_id': self.product1.id, 'quantity': 2}
        response = self.client.post(self.add_to_cart_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['items'][0]['product']['name'], "Product 1")
        self.assertEqual(response.data['items'][0]['quantity'], 2)

    def test_update_cart_item(self):
        """Test updating a product in the cart"""
        # First add a product
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 1})
        cart_item = CartItem.objects.first()

        # Update the quantity of the product in the cart
        data = {'cart_item_id': cart_item.id, 'quantity': 3}
        response = self.client.post(self.update_cart_item_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['items'][0]['quantity'], 3)

    def test_remove_from_cart(self):
        """Test removing a product from the cart"""
        # First add a product
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 1})
        cart_item = CartItem.objects.first()

        # Remove the product from the cart
        remove_url = reverse('shop:remove_from_cart', kwargs={'cart_item_id': cart_item.id})
        response = self.client.delete(remove_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 0)

    def test_cart_detail(self):
        """Test retrieving the cart details"""
        self.client.post(self.add_to_cart_url, {'product_id': self.product1.id, 'quantity': 2})
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['items'][0]['quantity'], 2)
        self.assertEqual(response.data['items'][0]['product']['name'], "Product 1")
