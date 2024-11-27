// Helper para manejo de logs
const debugLog = (message, ...optionalParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(message, ...optionalParams);
  }
};

// Encapsular manejo de localStorage
const getLocalStorageItem = (key, defaultValue = '[]') => {
  try {
    return JSON.parse(localStorage.getItem(key) || defaultValue);
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return JSON.parse(defaultValue);
  }
};

const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    debugLog(`localStorage item "${key}" set:`, value);
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
};

// Obtener carrito
export const getCart = () => {
  const cart = getLocalStorageItem('cart');
  debugLog('Cart retrieved:', cart);
  return cart;
};

// Guardar carrito
export const saveCart = (cart) => {
  setLocalStorageItem('cart', cart);
  debugLog('Cart saved:', cart);
};

// Agregar elemento al carrito
export const addItemToCart = (item) => {
  const cart = getCart();
  const updatedCart = cart.map(cartItem =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
      : cartItem
  );

  // Si el item no existe, agregarlo
  if (!updatedCart.find(cartItem => cartItem.id === item.id)) {
    updatedCart.push({ ...item });
  }

  saveCart(updatedCart);
  debugLog('Item added to cart:', updatedCart);
};

// Actualizar cantidad de un elemento
export const updateCartItem = (cart_item_id, quantity) => {
  if (quantity < 1) {
    console.warn(`Invalid quantity "${quantity}" for cart item "${cart_item_id}".`);
    return;
  }

  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.id === cart_item_id ? { ...item, quantity } : item
  );

  saveCart(updatedCart);
  debugLog('Cart item updated:', updatedCart);
};

// Eliminar un elemento del carrito
export const removeItemFromCart = async (cartItemId) => {
  try {
    // Opcional: enviar al servidor
    const response = await axiosInstance.post('/api/cart/remove/', { id: cartItemId });
    debugLog('Item removed from server:', response.data);

    // Remover del localStorage
    const updatedCart = getCart().filter(cartItem => cartItem.id !== cartItemId);
    saveCart(updatedCart);
    debugLog('Item removed from local cart:', updatedCart);
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
    throw error;
  }
};
