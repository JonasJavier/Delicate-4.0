from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Product, Cart, CartItem
from .serializers import ProductSerializer, CartSerializer
from django.shortcuts import get_object_or_404
import logging
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Review
from .serializers import ReviewSerializer

# Configura el logger para la depuración
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([AllowAny])  
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_detail(request):
    cart = get_user_cart(request)
    logger.debug(f"Cart retrieved: {cart}, with items: {cart.items.all()}")
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')  # Solo debe recibir el ID
    quantity = int(request.data.get('quantity', 1))
    quantity = max(1, quantity)

    try:
        product = get_object_or_404(Product, id=product_id)  # Buscar el producto por su ID
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Validar que el producto tenga stock suficiente
    if product.stock < quantity:
        return Response({"error": f"Only {product.stock} items left in stock."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Validar si el precio cambió en la base de datos
    if product.price != request.data.get('price', product.price):
        return Response({
            "error": "Price has changed for this product.",
            "current_price": product.price
        }, status=status.HTTP_400_BAD_REQUEST)

    # Obtener o crear el carrito del usuario
    cart = get_user_cart(request)

    # Agregar o actualizar el item en el carrito
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity
    cart_item.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    if not hasattr(request, 'user') or not request.user.is_authenticated:
        return Response({"error": "Authentication is required."}, status=status.HTTP_401_UNAUTHORIZED)

    cart_item_id = request.data.get('cart_item_id')
    quantity = int(request.data.get('quantity', 1))

    if quantity < 1:
        return Response({"error": "Quantity must be at least 1"}, status=status.HTTP_400_BAD_REQUEST)

    cart_item = get_cart_item_for_user_or_session(request, cart_item_id)
    if not cart_item:
        logger.error(f"Cart item not found: {cart_item_id} for user {request.user.email}")
        return Response({"error": "Cart item not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)

    product = cart_item.product
    if product.stock < quantity:
        return Response({"error": f"Only {product.stock} items left in stock."}, status=status.HTTP_400_BAD_REQUEST)

    cart_item.quantity = quantity
    cart_item.save()

    serializer = CartSerializer(cart_item.cart)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, cart_item_id):
    cart_item = get_cart_item_for_user_or_session(request, cart_item_id)
    if not cart_item:
        logger.error(f"Cart item not found or not authorized: ID {cart_item_id}")
        return Response({"error": "Cart item not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)

    logger.debug(f"Removing cart item: {cart_item}")

    cart_item.delete()
    serializer = CartSerializer(cart_item.cart)
    return Response(serializer.data)

def get_user_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)

    session_key = request.session.session_key
    if session_key:
        try:
            session_cart = Cart.objects.get(session_key=session_key)
            if session_cart and session_cart.items.exists():
                for item in session_cart.items.all():
                    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=item.product)
                    if not created:
                        cart_item.quantity += item.quantity
                    cart_item.save()
                session_cart.delete()
                logger.debug(f"Session cart merged into user cart for {request.user.email}")
        except Cart.DoesNotExist:
            logger.debug(f"No session cart found for {request.user.email}")

    return cart

def get_cart_item_for_user_or_session(request, cart_item_id):
    try:
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
        logger.debug(f"Cart item found for authenticated user: {request.user.email}")
        return cart_item
    except Exception as e:
        logger.error(f"Error retrieving cart item for authenticated user: {e}")
        return None

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def add_product(request):
    """
    Vista para agregar un producto al catálogo.
    Solo permite acceso a usuarios autenticados con permisos de administrador.
    """
    # Verificar si el usuario tiene permisos de administrador
    if not request.user.is_staff:
        logger.warning(f"Unauthorized access attempt by user: {request.user.email}")
        return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
    
    # Registrar intento de agregar producto
    logger.info(f"User {request.user.email} attempting to add a product.")
    
    # Crear el serializer con los datos de la solicitud
    serializer = ProductSerializer(data=request.data)
    
    if serializer.is_valid():
        try:
            # Guardar el producto si los datos son válidos
            product = serializer.save()
            logger.info(f"Product created successfully: {product.name} by user {request.user.email}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error saving product: {e}")
            return Response({'error': 'An unexpected error occurred while saving the product.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Registrar errores de validación
    logger.warning(f"Validation errors for product creation by user {request.user.email}: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para eliminar productos
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_product(request, product_id):
    # Verifica que el usuario autenticado sea el admin específico
    admin_user = get_user_model().objects.get(email='redacted@example.com')
    
    if request.user != admin_user:
        return Response({"error": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
    
    # Si el usuario es el admin correcto, procedemos a eliminar el producto
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    
    return Response({"success": "Product deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    

class ProductReviewView(APIView):
    """
    Permite listar y agregar reseñas a un producto específico.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        reviews = Review.objects.filter(product=product)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
