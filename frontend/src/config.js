export const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
export const DEMO_CATALOG_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_CATALOG === 'true';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '18498625049';
export const WHATSAPP_DISPLAY = import.meta.env.VITE_WHATSAPP_DISPLAY || '(849) 862-5049';

export const whatsappUrl = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
