import { useEffect, useMemo, useState } from 'react';
import { fetchCatalog } from '../api.js';
import { DEMO_CATALOG_ENABLED } from '../config.js';
import { fallbackProducts, formatPrice } from '../data/fallbackProducts.js';
import { ArrowIcon, BagIcon } from './Icons.jsx';
import { ProductModal } from './ProductModal.jsx';

const categories = [
  ['todos', 'Todos'],
  ['suaves', 'Piel sensible'],
  ['nutritivos', 'Nutritivos'],
  ['clasicos', 'Clásicos'],
  ['aromaticos', 'Aromáticos'],
  ['botanicos', 'Botánicos'],
  ['regalos', 'Para regalar'],
];

export function ProductGrid({ onAdd, onCatalogLoad }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('todos');
  const [status, setStatus] = useState('loading');
  const [addedId, setAddedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const catalog = await fetchCatalog(controller.signal);
        if (!catalog.length) throw new Error('Catálogo vacío');
        setProducts(catalog);
        setStatus('ready');
        onCatalogLoad?.(catalog);
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (DEMO_CATALOG_ENABLED) {
          setProducts(fallbackProducts);
          setStatus('fallback');
        } else {
          setProducts([]);
          setStatus('error');
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [loadAttempt, onCatalogLoad]);

  const visibleProducts = useMemo(
    () => products.filter((product) => category === 'todos' || product.category === category),
    [category, products],
  );

  const handleAdd = (product) => {
    onAdd(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="products-section section-shell" id="coleccion" aria-labelledby="products-title">
      <div className="section-heading section-heading--row">
        <div>
          <span className="eyebrow">La colección</span>
          <h2 id="products-title">Encuentra el jabón que vas a amar</h2>
        </div>
        <p>Descubre ingredientes, aromas y texturas creados para regalarle a tu piel un momento especial.</p>
      </div>

      <div className="category-filter" role="group" aria-label="Filtrar por categoría">
        {categories.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={category === value ? 'is-active' : ''}
            aria-pressed={category === value}
            onClick={() => setCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {status === 'loading' ? (
        <div className="product-grid" aria-label="Cargando productos" aria-busy="true">
          {[1, 2, 3].map((item) => <div className="product-skeleton" key={item} />)}
        </div>
      ) : status === 'error' ? (
        <div className="catalog-error" role="alert">
          <span>Catálogo temporalmente no disponible</span>
          <h3>No pudimos cargar los productos.</h3>
          <p>Inténtalo nuevamente o escríbenos por WhatsApp para consultar disponibilidad.</p>
          <button className="primary-button" type="button" onClick={() => { setStatus('loading'); setLoadAttempt((value) => value + 1); }}>
            Volver a intentar <ArrowIcon />
          </button>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="catalog-empty" role="status">
          <h3>No hay productos en esta categoría por ahora.</h3>
          <p>Prueba otra selección o consulta por WhatsApp nuestras próximas tandas.</p>
          <button type="button" className="text-link" onClick={() => setCategory('todos')}>Ver todos <ArrowIcon /></button>
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                {product.is_featured && <span className="product-badge">Favorito</span>}
                <img
                  src={product.image}
                  alt={`Jabón artesanal ${product.name}`}
                  loading="lazy"
                  onError={(event) => {
                    if (product.fallback_image && event.currentTarget.src !== product.fallback_image) {
                      event.currentTarget.src = product.fallback_image;
                    }
                  }}
                />
                <button type="button" onClick={() => handleAdd(product)} disabled={!product.stock}>
                  <BagIcon />
                  {addedId === product.id ? 'Agregado' : product.stock ? 'Agregar' : 'Agotado'}
                </button>
              </div>
              <div className="product-info">
                <div>
                  <span>{product.category_label || product.category}</span>
                  <h3>{product.name}</h3>
                </div>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              <p>{product.short_description || product.description}</p>
              <dl className="product-meta">
                <div><dt>Ideal para</dt><dd>{product.skin_type || 'Todo tipo de piel'}</dd></div>
                <div><dt>Peso</dt><dd>{product.weight_grams || 100} g</dd></div>
              </dl>
              <button
                className="product-details-button"
                type="button"
                onClick={() => setSelectedProduct(product)}
                aria-label={`Ver ingredientes y beneficios de ${product.name}`}
              >
                Ver ingredientes y beneficios <ArrowIcon />
              </button>
            </article>
          ))}
        </div>
      )}

      {status === 'fallback' && (
        <p className="catalog-note" role="status">Mostrando una colección de referencia. Confirma disponibilidad y precios por WhatsApp.</p>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={handleAdd} />
    </section>
  );
}
