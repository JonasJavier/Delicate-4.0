import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'delicate-cart-v4';

function readStoredCart() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((current) => {
      const found = current.find((item) => item.product.id === product.id);
      if (found) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock || 99) }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, Math.min(quantity, item.product.stock || 99)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  };

  const summary = useMemo(
    () => ({
      count: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0),
    }),
    [items],
  );

  return {
    items,
    ...summary,
    addItem,
    updateQuantity,
    removeItem,
    clearCart: () => setItems([]),
  };
}
