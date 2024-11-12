from django.urls import path
from .views import contact_api, newsletter_subscription_api

app_name = 'contact'

urlpatterns = [
    path('api/contact/', contact_api, name='contact_api'),  # URL para el API
    path('api/newsletter/', newsletter_subscription_api, name='newsletter_subscription_api'),
]
