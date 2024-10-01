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
        # Verifica que la solicitud es POST, PUT o DELETE (modifica datos)
        if request.method in ['POST', 'PUT', 'DELETE'] and request.user.is_authenticated:
            # Obtener el carrito o item del carrito según la URL
            cart_item_id = request.data.get('cart_item_id')
            cart_id = request.data.get('cart_id')

            # Si es una operación sobre un item del carrito
            if cart_item_id:
                try:
                    cart_item = CartItem.objects.get(id=cart_item_id)
                    # Verificar que el carrito de este item pertenece al usuario
                    if cart_item.cart.user != request.user:
                        return JsonResponse({"error": "You are not authorized to access this cart item."}, status=403)
                except CartItem.DoesNotExist:
                    return JsonResponse({"error": "Cart item not found."}, status=404)

            # Si es una operación sobre el carrito
            elif cart_id:
                try:
                    cart = Cart.objects.get(id=cart_id)
                    # Verificar que el carrito pertenece al usuario
                    if cart.user != request.user:
                        return JsonResponse({"error": "You are not authorized to access this cart."}, status=403)
                except Cart.DoesNotExist:
                    return JsonResponse({"error": "Cart not found."}, status=404)

        # Llamar a la siguiente parte del proceso de la solicitud
        response = self.get_response(request)
        return response
