import { WhatsAppIcon } from './Icons.jsx';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../config.js';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <a className="brand brand--light" href="#inicio">
            <span className="brand-mark">D</span>
            <span><strong>Delicaté</strong><small>hecho a mano</small></span>
          </a>
          <p>Jabones artesanales hechos con amor para acompañar el cuidado de tu piel.</p>
        </div>
        <div>
          <h2>Explora</h2>
          <a href="#coleccion">Colección</a>
          <a href="#historia">Nuestra historia</a>
          <a href="#proceso">Cómo comprar</a>
        </div>
        <div>
          <h2>Ayuda</h2>
          <a href="#preguntas">Preguntas frecuentes</a>
          <a href="#contacto">Contacto</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <div className="footer-contact">
          <h2>Hablemos</h2>
          <p>¿Tienes una piel sensible, buscas un regalo o quieres hacer un pedido especial?</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> {WHATSAPP_DISPLAY}</a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>© {new Date().getFullYear()} Delicaté</span>
        <span>Hecho con amor en República Dominicana</span>
      </div>
    </footer>
  );
}
