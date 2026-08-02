import { useEffect, useMemo, useState } from 'react';
import { fallbackProducts, formatPrice } from '../data/fallbackProducts.js';
import { ArrowIcon, BagIcon } from './Icons.jsx';
import { ProductModal } from './ProductModal.jsx';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const DEMO_CATALOG_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_CATALOG === 'true';
const categories = [
  ['todos', 'Todos'],
  ['suaves', 'Piel sensible'],
  ['nutritivos', 'Nutritivos'],
  ['clasicos', 'Clásicos'],
  ['aromaticos', 'Aromáticos'],
  ['botanicos', 'Botánicos'],
  ['regalos', 'Para regalar'],
];

export function ProductGrid({ onAdd }) {
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
        const response = await fetch(`${API_URL}/products/`, { signal: controller.signal });
        if (!response.ok) throw new Error('No se pudo cargar el catálogo');
        const data = await response.json();
        const results = Array.isArray(data) ? data : data.results;
        if (!results?.length) throw new Error('Catálogo vacío');
        const normalizedProducts = results.map((product) => {
          const localProduct = fallbackProducts.find((item) => item.slug === product.slug);
          return { ...product, image: product.image || localProduct?.image || fallbackProducts[0].image };
        });
        setProducts(normalizedProducts);
        setStatus('ready');
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
  }, [loadAttempt]);

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
          <h2 id="products-title">Elige tu ritual cotidiano</h2>
        </div>
        <p>Fórmulas sencillas, texturas honestas y aromas que acompañan sin invadir.</p>
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
                <img src={product.image} alt={`Jabón artesanal ${product.name}`} loading="lazy" />
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
              <button className="product-details-button" type="button" onClick={() => setSelectedProduct(product)}>
                Ver fórmula y detalles <ArrowIcon />
              </button>
            </article>
          ))}
        </div>
      )}

      {status === 'fallback' && (
        <p className="catalog-note" role="status">Mostrando la colección de demostración. Al iniciar Django, el catálogo se sincroniza automáticamente.</p>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={handleAdd} />
    </section>
  );
}
