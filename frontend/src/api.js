import { API_URL } from './config.js';
import { fallbackProducts } from './data/fallbackProducts.js';

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

// Reads every page so products beyond the first page are never hidden.
export async function fetchCatalog(signal) {
  const products = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(`${API_URL}/products/?page_size=${PAGE_SIZE}&page=${page}`, { signal });
    if (!response.ok) throw new Error('No se pudo cargar el catálogo');
    const data = await response.json();
    if (Array.isArray(data)) return data.map(withFallbackImage);
    products.push(...(data.results ?? []));
    if (!data.next) break;
  }
  return products.map(withFallbackImage);
}

function withFallbackImage(product) {
  const localProduct = fallbackProducts.find((item) => item.slug === product.slug);
  const fallbackImage = localProduct?.image || fallbackProducts[0].image;
  return { ...product, image: product.image || fallbackImage, fallback_image: fallbackImage };
}
