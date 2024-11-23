export const getCart = () => {
  // Retrieve the cart from localStorage and parse it as JSON
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.debug('Cart retrieved from localStorage:', cart);
  return cart;
};

export const saveCart = (cart) => {
  // Save the cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.debug('Cart saved to localStorage:', cart);
};

export const addItemToCart = (item) => {
  const cart = getCart(); // Get the current cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    // Update quantity if the item already exists in the cart
    existingItem.quantity += item.quantity;
  } else {
    // Add the new item to the cart with all required properties
    cart.push({
      ...item,
      quantity: item.quantity, // Include quantity
      image: item.image,       // Include image
      price: item.price,       // Include price
    });
  }

  saveCart(cart); // Save the updated cart to localStorage
};

export const updateCartItem = async (cart_item_id, quantity) => {
  try {
    // Send request to the server to update the cart item
    console.log('Sending update request to server:', { cart_item_id, quantity });
    const response = await API.post('/cart/update/', { cart_item_id, quantity });
    console.log('Response from server:', response.data); // Log the server response
    return response.data;
  } catch (error) {
    console.error('Error updating cart item via API:', error);
    throw error; // Propagate the error to be handled elsewhere
  }
};

export const removeItemFromCart = async (cartItemId) => {
  try {
    // Send a request to the server to remove the item
    const response = await axiosInstance.post('/api/cart/remove/', { id: cartItemId });
    console.log('Item removed from server:', response.data);

    // Remove the item locally from the cart in localStorage
    const cart = getCart().filter(cartItem => cartItem.id !== cartItemId);
    saveCart(cart); // Save the updated cart
  } catch (error) {
    console.error('Failed to remove item from server:', error); // Log the error
  }
};
