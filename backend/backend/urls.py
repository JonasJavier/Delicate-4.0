from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # Ruta para el panel de administración
    path('api/', include('accounts.urls')),  # Tus rutas para la app accounts
    path('api/', include('shop.urls')),  # Tus rutas para la app shop
    path('accounts/', include('django.contrib.auth.urls')),  # Incluye las URLs de autenticación de Django
]


# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
