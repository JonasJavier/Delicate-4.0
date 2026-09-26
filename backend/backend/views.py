import logging

from django.conf import settings
from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.static import serve


logger = logging.getLogger(__name__)


def health_check(_request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except DatabaseError:
        logger.exception("Health check could not reach the database.")
        return JsonResponse({"status": "unavailable", "service": "delicate-api"}, status=503)
    return JsonResponse({"status": "ok", "service": "delicate-api"})


def media(request, path):
    """Serve catalog images uploaded through the admin.

    Uploads get a unique file name, so a changed photo always has a new URL
    and the cached copy can live for a week.
    """
    response = serve(request, path, document_root=settings.MEDIA_ROOT)
    response["Cache-Control"] = "public, max-age=604800"
    return response
