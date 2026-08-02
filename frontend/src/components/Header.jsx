import { useEffect, useState } from 'react';
import { BagIcon, CloseIcon, MenuIcon } from './Icons.jsx';

const navItems = [
  ['Colección', '#coleccion'],
  ['Nuestra historia', '#historia'],
  ['Proceso', '#proceso'],
  ['Preguntas', '#preguntas'],
];

export function Header({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.body.classList.add('menu-is-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-is-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="nav-shell">
        <a className="brand" href="#inicio" aria-label="Delicaté, inicio">
          <span className="brand-mark">D</span>
          <span>
            <strong>Delicaté</strong>
            <small>hecho a mano</small>
          </span>
        </a>

        <nav id="main-navigation" className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Navegación principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="mobile-whatsapp" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-contact" href="#contacto">Hablemos</a>
          <button className="icon-button cart-button" type="button" onClick={onCartOpen} aria-label={`Abrir carrito, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}>
            <BagIcon />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
