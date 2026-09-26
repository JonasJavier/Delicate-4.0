import { useCallback, useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'delicate-cart-v4';
const FALLBACK_MAX_QUANTITY = 99;

export function maxQuantity(product) {
  return Number.isInteger(product?.stock) ? product.stock : FALLBACK_MAX_QUANTITY;
}

const clampQuantity = (quantity, product) => Math.max(0, Math.min(quantity, maxQuantity(product)));
const isSameProduct = (a, b) => a.id === b.id || (a.slug && a.slug === b.slug);

function readStoredItems() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value)
      ? value.filter((item) => item?.product?.id != null && Number.isInteger(item.quantity) && item.quantity > 0)
      : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product } = action;
      const exists = state.items.some((item) => isSameProduct(item.product, product));
      const items = exists
        ? state.items.map((item) =>
            isSameProduct(item.product, product)
              ? { product, quantity: clampQuantity(item.quantity + 1, product) }
              : item,
          )
        : [...state.items, { product, quantity: clampQuantity(1, product) }];
      return { ...state, items: items.filter((item) => item.quantity > 0) };
    }
    case 'setQuantity':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: clampQuantity(action.quantity, item.product) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.product.id !== action.productId) };
    case 'sync': {
      // A saved cart may hold prices or stock from a previous visit. Refresh
      // it from the live catalog so the WhatsApp order is always current.
      let adjusted = false;
      const items = [];
      for (const item of state.items) {
        const fresh = action.catalog.find((product) => isSameProduct(product, item.product));
        const quantity = fresh ? clampQuantity(item.quantity, fresh) : 0;
        if (quantity !== item.quantity) adjusted = true;
        if (quantity > 0) items.push({ product: fresh, quantity });
      }
      return { items, adjusted: state.adjusted || adjusted };
    }
    case 'dismissNotice':
      return state.adjusted ? { ...state, adjusted: false } : state;
    default:
      return state;
  }
}

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: readStoredItems(),
    adjusted: false,
  }));
  const { items, adjusted } = state;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be full or blocked (private browsing); the cart still works for this visit.
    }
  }, [items]);

  const addItem = useCallback((product) => dispatch({ type: 'add', product }), []);
  const updateQuantity = useCallback(
    (productId, quantity) => dispatch({ type: 'setQuantity', productId, quantity }),
    [],
  );
  const removeItem = useCallback((productId) => dispatch({ type: 'remove', productId }), []);
  const syncWithCatalog = useCallback((catalog) => dispatch({ type: 'sync', catalog }), []);
  const dismissNotice = useCallback(() => dispatch({ type: 'dismissNotice' }), []);

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
    adjusted,
    addItem,
    updateQuantity,
    removeItem,
    syncWithCatalog,
    dismissNotice,
  };
}
