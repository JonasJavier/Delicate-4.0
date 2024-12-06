from django.http import JsonResponse
from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from .models import Cart, CartItem
import json

class UserCartOwnershipMiddleware:
    """
    Middleware to ensure that an authenticated user
    can only access their own cart or cart items.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Ensure `request.user` is available
        request.user = SimpleLazyObject(lambda: get_user(request))

        # Process only methods that could modify the cart
        if request.method in ['POST', 'PUT', 'DELETE']:
            try:
                # Process the JSON body of the request if it exists
                if not hasattr(request, 'json_body'):
                    try:
                        request.json_body = json.loads(request.body.decode('utf-8'))
                    except (json.JSONDecodeError, UnicodeDecodeError):
                        request.json_body = {}

                cart_item_id = request.json_body.get('cart_item_id')
                cart_id = request.json_body.get('cart_id')

                # Verify access to a cart item
                if cart_item_id and getattr(request, 'user', None) and request.user.is_authenticated:
                    try:
                        cart_item = CartItem.objects.get(id=cart_item_id)
                        if cart_item.cart.user != request.user:
                            return JsonResponse({"error": "You are not authorized to access this cart item."}, status=403)
                    except CartItem.DoesNotExist:
                        return JsonResponse({"error": "Cart item not found."}, status=404)

                # Verify access to the cart
                elif cart_id and getattr(request, 'user', None) and request.user.is_authenticated:
                    try:
                        cart = Cart.objects.get(id=cart_id)
                        if cart.user != request.user:
                            return JsonResponse({"error": "You are not authorized to access this cart."}, status=403)
                    except Cart.DoesNotExist:
                        return JsonResponse({"error": "Cart not found."}, status=404)
            except Exception as e:
                return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

        # Proceed with the request
        response = self.get_response(request)
        return response
