export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.debug('Cart retrieved from localStorage:', cart);
  return cart;
};

export const saveCart = (cart) => {
  // Guardar el carrito en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.debug('Cart saved to localStorage:', cart);
};

export const addItemToCart = (item) => {
  const cart = getCart(); // Obtener el carrito actual
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity; // Actualizar la cantidad si el producto ya está en el carrito
  } else {
    // Añadir el producto al carrito con la imagen y el precio
    cart.push({
      ...item,
      quantity: item.quantity, // Añadir la cantidad
      image: item.image,       // Añadir la imagen
      price: item.price,       // Añadir el precio
    });
  }

  // Usar la nueva función `saveCart` para guardar el carrito actualizado
  saveCart(cart);
};

export const updateCartItem = async (cart_item_id, quantity) => {
  try {
    // Asegurarte que los datos correctos son enviados al servidor
    console.log('Sending update request to server:', { cart_item_id, quantity });
    
    const response = await API.post('/cart/update/', { cart_item_id, quantity });
    console.log('Response from server:', response.data); // Mostrar la respuesta del servidor
    return response.data;
  } catch (error) {
    console.error('Error updating cart item via API:', error);
    throw error;
  }
};

export const removeItemFromCart = async (cartItemId) => {
  try {
    const response = await axiosInstance.post('/api/cart/remove/', { id: cartItemId });
    console.log('Item removed from server:', response.data);

    // After successful removal from server, remove it from localStorage
    const cart = getCart().filter(cartItem => cartItem.id !== cartItemId);
    
    // Usar `saveCart` para guardar el carrito actualizado
    saveCart(cart);
  } catch (error) {
    console.error('Failed to remove item from server:', error);
  }
};
