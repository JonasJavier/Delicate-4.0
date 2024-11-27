from django.http import JsonResponse
from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from .models import Cart, CartItem
import json

class UserCartOwnershipMiddleware:
    """
    Middleware para garantizar que un usuario autenticado
    solo pueda acceder a su propio carrito o elementos del carrito.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Asegurar que `request.user` esté disponible
        request.user = SimpleLazyObject(lambda: get_user(request))

        # Procesar solo métodos que podrían modificar el carrito
        if request.method in ['POST', 'PUT', 'DELETE']:
            try:
                # Procesar el cuerpo JSON de la solicitud si existe
                if not hasattr(request, 'json_body'):
                    try:
                        request.json_body = json.loads(request.body.decode('utf-8'))
                    except (json.JSONDecodeError, UnicodeDecodeError):
                        request.json_body = {}

                cart_item_id = request.json_body.get('cart_item_id')
                cart_id = request.json_body.get('cart_id')

                # Verificar acceso a un elemento del carrito
                if cart_item_id and getattr(request, 'user', None) and request.user.is_authenticated:
                    try:
                        cart_item = CartItem.objects.get(id=cart_item_id)
                        if cart_item.cart.user != request.user:
                            return JsonResponse({"error": "You are not authorized to access this cart item."}, status=403)
                    except CartItem.DoesNotExist:
                        return JsonResponse({"error": "Cart item not found."}, status=404)

                # Verificar acceso al carrito
                elif cart_id and getattr(request, 'user', None) and request.user.is_authenticated:
                    try:
                        cart = Cart.objects.get(id=cart_id)
                        if cart.user != request.user:
                            return JsonResponse({"error": "You are not authorized to access this cart."}, status=403)
                    except Cart.DoesNotExist:
                        return JsonResponse({"error": "Cart not found."}, status=404)
            except Exception as e:
                return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

        # Continuar con la solicitud
        response = self.get_response(request)
        return response
