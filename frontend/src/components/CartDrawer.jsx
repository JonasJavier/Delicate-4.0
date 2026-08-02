import { useEffect } from 'react';
import { formatPrice } from '../data/fallbackProducts.js';
import { ArrowIcon, CloseIcon, WhatsAppIcon } from './Icons.jsx';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '18498625049';

function createWhatsAppUrl(items, total) {
  const lines = items.map(
    ({ product, quantity }) => `• ${quantity} × ${product.name} — ${formatPrice(Number(product.price) * quantity)}`,
  );
  const message = [
    'Hola Delicaté 👋',
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
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function CartDrawer({ open, onClose, items, total, updateQuantity, removeItem }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, open]);

  return (
    <div className={`drawer-root${open ? ' drawer-root--open' : ''}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label="Cerrar carrito" tabIndex={open ? 0 : -1} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-header">
          <div><span className="eyebrow">Tu selección</span><h2 id="cart-title">Carrito</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar carrito"><CloseIcon /></button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span>01</span>
            <h3>Tu ritual empieza aquí</h3>
            <p>Agrega los jabones que más te gusten y prepara tu pedido por WhatsApp.</p>
            <button type="button" className="text-link" onClick={onClose}>Ver la colección <ArrowIcon /></button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-info">
                    <div><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong></div>
                    <div className="quantity-row">
                      <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Restar uno">−</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Agregar uno">+</button>
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
              <a className="whatsapp-checkout" href={createWhatsAppUrl(items, total)} target="_blank" rel="noreferrer">
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
