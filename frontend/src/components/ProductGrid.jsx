import { useEffect, useMemo, useState } from 'react';
import { fallbackProducts, formatPrice } from '../data/fallbackProducts.js';
import { BagIcon } from './Icons.jsx';

const API_URL = import.meta.env.VITE_API_URL || '/api';
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

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products/`, { signal: controller.signal });
        if (!response.ok) throw new Error('No se pudo cargar el catálogo');
        const data = await response.json();
        const results = Array.isArray(data) ? data : data.results;
        if (!results?.length) throw new Error('Catálogo vacío');
        setProducts(results);
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setProducts(fallbackProducts);
        setStatus('fallback');
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

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
            onClick={() => setCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {status === 'loading' ? (
        <div className="product-grid" aria-label="Cargando productos">
          {[1, 2, 3].map((item) => <div className="product-skeleton" key={item} />)}
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
            </article>
          ))}
        </div>
      )}

      {status === 'fallback' && (
        <p className="catalog-note" role="status">Mostrando la colección de demostración. Al iniciar Django, el catálogo se sincroniza automáticamente.</p>
      )}
    </section>
  );
}
