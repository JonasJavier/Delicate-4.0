import { useEffect, useRef } from 'react';
import { formatPrice } from '../data/fallbackProducts.js';
import { whatsappUrl } from '../config.js';
import { maxQuantity } from '../hooks/useCart.js';
import { ArrowIcon, CloseIcon, WhatsAppIcon } from './Icons.jsx';

function createOrderMessage(items, total) {
  const lines = items.map(
    ({ product, quantity }) => `• ${quantity} × ${product.name} — ${formatPrice(Number(product.price) * quantity)}`,
  );
  // No emoji: WhatsApp's web page turns them into "�".
  return [
    '¡Hola, Delicaté!',
    'Quiero realizar este pedido:',
    '',
    ...lines,
    '',
    `Total estimado: ${formatPrice(total)}`,
    '',
    'Mi nombre es: ',
    'Prefiero: entrega / recoger',
    '',
    '¿Me confirman disponibilidad y forma de entrega? Gracias.',
  ].join('\n');
}

export function CartDrawer({ open, onClose, items, total, adjusted, updateQuantity, removeItem }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    previouslyFocusedRef.current = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (previouslyFocusedRef.current?.isConnected) previouslyFocusedRef.current.focus();
    };
  }, [onClose, open]);

  const browseProducts = () => {
    onClose();
    window.setTimeout(() => document.querySelector('#coleccion')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className={`drawer-root${open ? ' drawer-root--open' : ''}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label="Cerrar carrito" tabIndex="-1" />
      <aside ref={drawerRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-header">
          <div><span className="eyebrow">Tus favoritos</span><h2 id="cart-title">Tu pedido</h2></div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Cerrar carrito"><CloseIcon /></button>
        </div>

        {adjusted && (
          <p className="cart-notice" role="status">
            Actualizamos tu pedido con los precios y la disponibilidad de hoy.
          </p>
        )}

        {items.length === 0 ? (
          <div className="empty-cart">
            <span>01</span>
            <h3>Elige algo hecho con amor</h3>
            <p>Agrega tus jabones favoritos y prepara tu pedido por WhatsApp.</p>
            <button type="button" className="text-link" onClick={browseProducts}>Ver la colección <ArrowIcon /></button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-info">
                    <div><h3>{product.name}</h3><strong>{formatPrice(Number(product.price) * quantity)}</strong></div>
                    <div className="quantity-row">
                      <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Restar uno">−</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Agregar uno" disabled={quantity >= maxQuantity(product)}>+</button>
                      </div>
                      <button className="remove-button" type="button" onClick={() => removeItem(product.id)}>Quitar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div><span>Total estimado</span><strong>{formatPrice(total)}</strong></div>
              <p>Coordinaremos disponibilidad, entrega y pago directamente contigo.</p>
              <a className="whatsapp-checkout" href={whatsappUrl(createOrderMessage(items, total))} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Finalizar por WhatsApp <ArrowIcon />
              </a>
              <small>No se realizará ningún cobro en este sitio.</small>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
