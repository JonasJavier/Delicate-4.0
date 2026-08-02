import { useEffect, useRef } from 'react';
import { formatPrice } from '../data/fallbackProducts.js';
import { BagIcon, CloseIcon, LeafIcon, SparkIcon } from './Icons.jsx';

export function ProductModal({ product, onClose, onAdd }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !product) return undefined;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onClose();
    onAdd(product);
  };

  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      aria-labelledby="product-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <button className="icon-button product-dialog-close" type="button" onClick={onClose} aria-label="Cerrar detalles">
        <CloseIcon />
      </button>
      <div className="product-dialog-grid">
        <div className="product-dialog-image">
          {product.is_featured && <span className="product-badge">Favorito</span>}
          <img
            src={product.image}
            alt={`Jabón artesanal ${product.name}`}
            onError={(event) => {
              if (product.fallback_image && event.currentTarget.src !== product.fallback_image) {
                event.currentTarget.src = product.fallback_image;
              }
            }}
          />
        </div>
        <div className="product-dialog-content">
          <span className="eyebrow">{product.category_label || product.category}</span>
          <h2 id="product-dialog-title">{product.name}</h2>
          <div className="product-dialog-price">
            <strong>{formatPrice(product.price)}</strong>
            <span>{product.stock > 0 ? `${product.stock} disponibles` : 'Temporalmente agotado'}</span>
          </div>
          <p className="product-dialog-description">{product.description || product.short_description}</p>

          <div className="product-highlights">
            <div><SparkIcon /><span><small>Beneficio</small>{product.benefit || 'Limpieza suave'}</span></div>
            <div><LeafIcon /><span><small>Ideal para</small>{product.skin_type || 'Todo tipo de piel'}</span></div>
          </div>

          <div className="ingredients-block">
            <h3>Ingredientes principales</h3>
            <p>{product.ingredients || 'Consulta la composición disponible por WhatsApp antes de ordenar.'}</p>
          </div>

          <div className="product-dialog-footer">
            <span>{product.weight_grams || 100} g · Hecho con amor en pequeñas tandas</span>
            <button className="primary-button" type="button" onClick={handleAdd} disabled={!product.stock}>
              <BagIcon /> {product.stock ? 'Agregar al carrito' : 'Agotado'}
            </button>
          </div>
          <small className="product-disclaimer">Producto cosmético de limpieza. Suspende su uso si notas irritación.</small>
        </div>
      </div>
    </dialog>
  );
}
