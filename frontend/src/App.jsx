import { useCallback, useState } from 'react';
import heroImage from './assets/images/brand/hero-artesanal.webp';
import storyImage from './assets/images/brand/proceso-artesanal.webp';
import { CartDrawer } from './components/CartDrawer.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { ArrowIcon, HeartIcon, LeafIcon, SparkIcon, WhatsAppIcon } from './components/Icons.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { useCart } from './hooks/useCart.js';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '18498625049';

const features = [
  { icon: LeafIcon, title: 'Ingredientes honestos', text: 'Aceites vegetales, mantecas y botánicos elegidos con intención.' },
  { icon: HeartIcon, title: 'Hecho en pequeñas tandas', text: 'Cada barra recibe tiempo, cuidado y un acabado verdaderamente artesanal.' },
  { icon: SparkIcon, title: 'Una rutina más amable', text: 'Limpieza efectiva y sensorial, sin complicar tu cuidado diario.' },
];

const faqs = [
  ['¿Cómo realizo mi pedido?', 'Agrega tus jabones al carrito y pulsa “Finalizar por WhatsApp”. Recibiremos el detalle completo y coordinaremos contigo disponibilidad, entrega y pago.'],
  ['¿Hacen entregas?', 'Sí. Coordinamos opciones de entrega o recogida directamente por WhatsApp según tu ubicación en República Dominicana.'],
  ['¿Cuánto dura una barra?', 'Depende del uso y el secado entre duchas. Para alargar su vida, déjala escurrir en una jabonera seca y ventilada.'],
  ['¿Puedo pedir recuerdos o regalos?', 'Claro. Podemos conversar sobre cantidades, combinaciones y presentación para celebraciones o regalos corporativos.'],
  ['¿Los jabones sustituyen un tratamiento dermatológico?', 'No. Son productos cosméticos de limpieza. Si tienes una condición, alergia o sensibilidad importante, consulta a un profesional de salud antes de usarlos.'],
];

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = (product) => {
    cart.addItem(product);
    setCartOpen(true);
  };

  const handleContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola Delicaté 👋\nMi nombre es ${data.get('name')}.\n\n${data.get('message')}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header cartCount={cart.count} onCartOpen={() => setCartOpen(true)} />
      <main id="contenido">
        <section className="hero" id="inicio" style={{ '--hero-image': `url(${heroImage})` }}>
          <div className="hero-content section-shell">
            <span className="eyebrow">Jabones artesanales · RD</span>
            <h1>Cuidado que se siente <em>honesto.</em></h1>
            <p>Ingredientes botánicos, procesos lentos y barras hechas a mano para cuidar tu piel todos los días.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#coleccion">Descubrir la colección <ArrowIcon /></a>
              <a className="secondary-link" href="#historia">Conoce nuestra historia</a>
            </div>
            <div className="hero-note"><span>100%</span><p>hecho a mano en pequeñas tandas</p></div>
          </div>
        </section>

        <section className="feature-strip" aria-label="Nuestros valores">
          <div className="section-shell">
            {features.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <span className="feature-number">0{index + 1}</span>
                <Icon />
                <div><h2>{title}</h2><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <ProductGrid onAdd={addToCart} />

        <section className="story-section" id="historia">
          <div className="story-grid section-shell">
            <div className="story-image-wrap">
              <img src={storyImage} alt="Proceso artesanal de preparación de jabones botánicos" loading="lazy" />
              <span className="story-seal">Hecho<br />con calma</span>
            </div>
            <div className="story-copy">
              <span className="eyebrow">Nuestra historia</span>
              <h2>Volver a lo simple también es una forma de cuidarse.</h2>
              <p className="story-lead">Delicaté nace del deseo de hacer mejor una de las rutinas más cotidianas: limpiar y cuidar nuestra piel.</p>
              <p>Trabajamos en pequeñas tandas, combinando aceites vegetales, mantecas y botánicos. No buscamos prometer milagros; buscamos crear una barra honesta, agradable y hecha con atención.</p>
              <dl className="story-stats">
                <div><dt>Pequeñas</dt><dd>tandas</dd></div>
                <div><dt>Origen</dt><dd>local</dd></div>
                <div><dt>Proceso</dt><dd>artesanal</dd></div>
              </dl>
              <a className="text-link" href="#proceso">Así puedes ordenar <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="process-section section-shell" id="proceso">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Comprar es sencillo</span>
            <h2>De nuestra mesa a tus manos</h2>
            <p>Sin formularios largos ni pagos confusos. Te acompañamos personalmente.</p>
          </div>
          <div className="process-grid">
            <article><span>01</span><h3>Elige tus barras</h3><p>Explora la colección y agrega al carrito tus favoritas.</p></article>
            <article><span>02</span><h3>Envía el pedido</h3><p>Tu carrito se convierte en un mensaje listo para WhatsApp.</p></article>
            <article><span>03</span><h3>Coordinamos contigo</h3><p>Confirmamos existencias, forma de entrega y método de pago.</p></article>
          </div>
        </section>

        <section className="quote-section">
          <div className="section-shell">
            <span className="quote-mark">“</span>
            <blockquote>La belleza de un objeto cotidiano está en cómo fue hecho y en cómo te hace sentir.</blockquote>
            <p>La filosofía detrás de cada barra Delicaté</p>
          </div>
        </section>

        <section className="faq-section section-shell" id="preguntas">
          <div className="section-heading section-heading--row">
            <div><span className="eyebrow">Antes de ordenar</span><h2>Preguntas frecuentes</h2></div>
            <p>Si no encuentras tu respuesta, escríbenos. Nos encantará ayudarte a elegir.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i>+</i></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-grid section-shell">
            <div>
              <span className="eyebrow">Hablemos</span>
              <h2>¿Te ayudamos a encontrar tu jabón?</h2>
              <p>Cuéntanos qué buscas y continuaremos la conversación personalmente por WhatsApp.</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> (849) 862-5049</a>
            </div>
            <form onSubmit={handleContact}>
              <label htmlFor="name">Tu nombre</label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamas?" required />
              <label htmlFor="message">¿Cómo podemos ayudarte?</label>
              <textarea id="message" name="message" rows="4" placeholder="Quiero conocer cuál jabón es ideal para mí…" required />
              <button className="primary-button" type="submit">Enviar por WhatsApp <ArrowIcon /></button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="Escribir a Delicaté por WhatsApp"><WhatsAppIcon /></a>
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        items={cart.items}
        total={cart.total}
        updateQuantity={cart.updateQuantity}
        removeItem={cart.removeItem}
      />
    </>
  );
}

export default App;
