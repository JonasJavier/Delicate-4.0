import logging
# Set up logging
logger = logging.getLogger(__name__)

logger = logging.getLogger(__name__)
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch

User = get_user_model()

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.token_url = reverse('token_obtain_pair')
        self.profile_url = reverse('user_profile')
        self.protected_url = reverse('protected_view')

    def test_register_user(self):
        data = {
            'email': 'testuser@example.com',
            'password': 'Password123!'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        user = User.objects.get(email='testuser@example.com')
        profile = user.profile
        self.assertIsNotNone(profile)
        self.assertEqual(profile.email, 'testuser@example.com')

    def test_register_user_with_existing_email(self):
        User.objects.create_user(email='testuser@example.com', password='Password123!')
        data = {
            'email': 'testuser@example.com',
            'password': 'Password123!'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_with_weak_password(self):
        data = {
            'email': 'testuser@example.com',
            'password': 'weakpass'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)
        self.assertIn('La contraseña debe contener al menos 1 letra mayúscula.', response.data['password'])

    def test_login_user(self):
        User.objects.create_user(email='testuser@example.com', password='Password123!')
        data = {
            'email': 'testuser@example.com',
            'password': 'Password123!'
        }
        response = self.client.post(self.token_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_access_protected_view_without_token(self):
        response = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_protected_view_with_token(self):
        user = User.objects.create_user(email='testuser@example.com', password='Password123!')
        token_response = self.client.post(self.token_url, {
            'email': 'testuser@example.com',
            'password': 'Password123!'
        }, format='json')

        if 'access' in token_response.data:
            self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token_response.data['access'])
        else:
            self.fail("Token response did not contain 'access'")

        response = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

def test_update_user_profile(self):
    user = User.objects.create_user(email='testuser@example.com', password='Password123!')
    token_response = self.client.post(self.token_url, {
        'email': 'testuser@example.com',
        'password': 'Password123!'
    }, format='json')

    if 'access' in token_response.data:
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token_response.data['access'])
    else:
        self.fail("Token response did not contain 'access'")

    # Check if the profile exists
    self.assertIsNotNone(user.profile)
    logger.debug(f"Profile exists for user {user.email}")

    updated_data = {
        'first_name': 'NewName',
        'last_name': 'NewLastName',
        'phone_number': '(603) 555-6789'
    }
    response = self.client.put(self.profile_url, updated_data, format='json')
    logger.debug(f"Update response status: {response.status_code}, data: {response.data}")
    self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Verificar que los datos se han actualizado correctamente en el perfil
    profile = user.profile
    self.assertEqual(profile.first_name, 'NewName')
    self.assertEqual(profile.last_name, 'NewLastName')
    self.assertEqual(profile.phone_number, '(603) 555-6789')


def test_register_user_with_invalid_email(self):
    data = {
        'email': 'invalid-email',
        'password': 'Password123!'
    }
    response = self.client.post(self.register_url, data, format='json')
    logger.debug(f"Register response status: {response.status_code}, data: {response.data}")
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertIn('email', response.data)


def test_update_user_profile_with_invalid_phone_number(self):
    user = User.objects.create_user(email='testuser@example.com', password='Password123!')
    token_response = self.client.post(self.token_url, {
        'email': 'testuser@example.com',
        'password': 'Password123!'
    }, format='json')

    if 'access' in token_response.data:
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token_response.data['access'])
    else:
        self.fail("Token response did not contain 'access'")

    updated_data = {
        'phone_number': 'invalid-phone'
    }
    response = self.client.put(self.profile_url, updated_data, format='json')
    logger.debug(f"Update with invalid phone response status: {response.status_code}, data: {response.data}")
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertIn('phone_number', response.data)

def test_unexpected_server_error(self):
    with patch('accounts.views.RegisterView.post', side_effect=Exception('Unexpected error')):
        data = {'email': 'testuser@example.com', 'password': 'Password123!'}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        response_json = response.json()
        self.assertIn('error', response_json)
        self.assertEqual(response_json['error'], 'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.')