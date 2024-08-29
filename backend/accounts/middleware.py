# middleware.py

import json
from django.http import JsonResponse
import logging
from django.core.exceptions import ValidationError

logger = logging.getLogger(__name__)

class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        response_data = {'error': 'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.'}

        if isinstance(exception, ValidationError):
            response_data['error'] = exception.message
            response_data['type'] = 'Error de Validación'
            logger.warning(f"Error de Validación: {exception}")
            return JsonResponse(response_data, status=400)

        response_data['type'] = type(exception).__name__
        logger.error(f"Excepción: {exception}", exc_info=True)
        return JsonResponse(response_data, status=500)
