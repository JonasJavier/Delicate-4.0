from django.http import JsonResponse
from .models import Cart, CartItem

class UserCartOwnershipMiddleware:
    """
    Middleware para asegurar que el usuario autenticado
    solo pueda acceder a su propio carrito y items de carrito.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Procesar el cuerpo JSON en caso de ser necesario
        if request.method in ['POST', 'PUT', 'DELETE']:
            cart_item_id = getattr(request, 'json_body', {}).get('cart_item_id')
            cart_id = getattr(request, 'json_body', {}).get('cart_id')

            # Si es una operación sobre un item del carrito
            if cart_item_id and request.user.is_authenticated:
                try:
                    cart_item = CartItem.objects.get(id=cart_item_id)
                    if cart_item.cart.user != request.user:
                        return JsonResponse({"error": "You are not authorized to access this cart item."}, status=403)
                except CartItem.DoesNotExist:
                    return JsonResponse({"error": "Cart item not found."}, status=404)

            # Si es una operación sobre el carrito
            elif cart_id and request.user.is_authenticated:
                try:
                    cart = Cart.objects.get(id=cart_id)
                    if cart.user != request.user:
                        return JsonResponse({"error": "You are not authorized to access this cart."}, status=403)
                except Cart.DoesNotExist:
                    return JsonResponse({"error": "Cart not found."}, status=404)

        response = self.get_response(request)
        return response
