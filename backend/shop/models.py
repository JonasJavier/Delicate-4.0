from django.conf import settings
from django.db import models

class Product(models.Model):
    """
    Model to represent a product in the store.
    """
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    # Additional fields for product attributes
    ingredients = models.TextField(blank=True, null=True)
    dimensions = models.CharField(max_length=255, blank=True, null=True)
    weight = models.CharField(max_length=255, blank=True, null=True)
    skintype = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    """
    Model to store reviews for products.
    Each review is linked to a specific product and user.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()  # The review comment left by the user
    rating = models.PositiveSmallIntegerField()  # Rating from 1 to 5
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of when the review was created

    def __str__(self):
        return f"{self.user.email} - {self.product.name} ({self.rating}/5)"


class Cart(models.Model):
    """
    Model to represent a shopping cart.
    A cart can belong to a user or be anonymous (session-based).
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True)  # For anonymous users, link by session key
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"Cart of {self.user.email}"
        return f"Anonymous Cart with session key {self.session_key}"

    @property
    def items(self):
        """
        Property to get all items in the cart.
        """
        return self.cartitem_set.all()  # Returns all cart items related to this cart


class CartItem(models.Model):
    """
    Model to represent individual items in a shopping cart.
    Each CartItem links to a Cart and a Product.
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)  # Link to the cart
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # The product being added to the cart
    quantity = models.PositiveIntegerField(default=1)  # Quantity of the product

    def subtotal(self):
        """
        Calculate the subtotal for this cart item (price * quantity).
        """
        return self.quantity * self.product.price

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
