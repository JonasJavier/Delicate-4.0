import re

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path

from . import views


admin.site.site_header = "Delicaté · Administración"
admin.site.site_title = "Delicaté"
admin.site.index_title = "Catálogo y contactos"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", views.health_check, name="health-check"),
    path("api/", include("shop.urls")),
    path("api/", include("contact.urls")),
]

if settings.SERVE_MEDIA:
    media_prefix = re.escape(settings.MEDIA_URL.lstrip("/"))
    urlpatterns.append(re_path(rf"^{media_prefix}(?P<path>.+)$", views.media, name="media"))
