export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.debug('Cart retrieved from localStorage:', cart);
  return cart;
};

export const addItemToCart = (item) => {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
    console.debug('Existing item quantity updated:', existingItem);
  } else {
    cart.push(item);
    console.debug('New item added to cart:', item);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  console.debug('Cart saved to localStorage:', cart);
};

export const updateCartItem = (cartItemId, quantity) => {
  let cart = getCart();
  cart = cart.map(cartItem => 
    cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
  );
  
  localStorage.setItem('cart', JSON.stringify(cart));
  console.debug(`Cart item updated in localStorage: id ${cartItemId}, quantity ${quantity}`);
};

export const removeItemFromCart = (cartItemId) => {
  const cart = getCart().filter(cartItem => cartItem.id !== cartItemId);
  
  localStorage.setItem('cart', JSON.stringify(cart));
  console.debug(`Cart item removed from localStorage: id ${cartItemId}`);
};
