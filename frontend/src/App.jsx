import { useCallback, useState } from 'react';
import heroImage from './assets/images/brand/hero-artesanal.webp';
import storyImage from './assets/images/brand/proceso-artesanal.webp';
import { CartDrawer } from './components/CartDrawer.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { ArrowIcon, HeartIcon, LeafIcon, SparkIcon, WhatsAppIcon } from './components/Icons.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { useCart } from './hooks/useCart.js';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from './config.js';

const features = [
  { icon: LeafIcon, title: 'Ingredientes que cuidan', text: 'Aceites vegetales, mantecas y botánicos elegidos para acompañar tu piel con suavidad.' },
  { icon: HeartIcon, title: 'Hechos con amor', text: 'Cada barra se prepara en pequeñas tandas, con manos, tiempo y atención.' },
  { icon: SparkIcon, title: 'Un momento para ti', text: 'Aromas y texturas que convierten tu rutina diaria en una pausa especial.' },
];

const faqs = [
  ['¿Cómo hago mi pedido?', 'Agrega tus jabones al carrito y pulsa “Finalizar por WhatsApp”. Recibiremos tu selección y coordinaremos contigo disponibilidad, entrega y pago.'],
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
            <span className="eyebrow">Jabones artesanales · Hechos en RD</span>
            <h1>Cuidado hecho con <em>amor.</em></h1>
            <p>Jabones creados en pequeñas tandas para llenar tu rutina de suavidad, aromas y cariño.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#coleccion">Descubrir la colección <ArrowIcon /></a>
              <a className="secondary-link" href="#historia">Conoce nuestra historia</a>
            </div>
          </div>
        </section>

        <section className="feature-strip" aria-label="Nuestros valores">
          <div className="section-shell">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title}>
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
              <span className="story-seal">Hecho<br />con amor</span>
            </div>
            <div className="story-copy">
              <span className="eyebrow">Nuestra historia</span>
              <h2>El amor por lo hecho a mano se siente en cada barra.</h2>
              <p className="story-lead">Delicaté nació para transformar un gesto diario en un momento especial de cuidado.</p>
              <p>Elegimos aceites vegetales, mantecas y botánicos, y elaboramos cada tanda con paciencia. Queremos que cada aroma, textura y detalle te recuerde regalarte un poco de amor todos los días.</p>
              <dl className="story-stats">
                <div><dt>Hecho</dt><dd>a mano</dd></div>
                <div><dt>Origen</dt><dd>local</dd></div>
                <div><dt>Mucho</dt><dd>amor</dd></div>
              </dl>
              <a className="text-link" href="#proceso">Conoce cómo pedir <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="process-section section-shell" id="proceso">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Pedir es muy fácil</span>
            <h2>Tu jabón favorito, más cerca de ti</h2>
            <p>Elige lo que amas y nosotros nos encargamos de acompañarte personalmente.</p>
          </div>
          <div className="process-grid">
            <article><span>01</span><h3>Encuentra tu favorito</h3><p>Descubre sus ingredientes, aromas y beneficios antes de elegir.</p></article>
            <article><span>02</span><h3>Prepara tu pedido</h3><p>Guarda tus favoritos y envíanos tu selección por WhatsApp.</p></article>
            <article><span>03</span><h3>Lo coordinamos contigo</h3><p>Confirmamos disponibilidad, entrega y forma de pago.</p></article>
          </div>
        </section>

        <section className="quote-section">
          <div className="section-shell">
            <span className="quote-mark">“</span>
            <blockquote>Cada barra guarda el tiempo, el cuidado y el amor que ponemos en crearla.</blockquote>
            <p>Hecho a mano en República Dominicana</p>
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
              <h2>Encontremos el jabón ideal para ti.</h2>
              <p>Cuéntanos qué te gusta y te ayudaremos a elegir con cariño por WhatsApp.</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> {WHATSAPP_DISPLAY}</a>
            </div>
            <form onSubmit={handleContact}>
              <label htmlFor="name">Tu nombre</label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamas?" required />
              <label htmlFor="message">¿Cómo podemos ayudarte?</label>
              <textarea id="message" name="message" rows="4" placeholder="Cuéntanos qué aromas, ingredientes o tipo de cuidado buscas…" required />
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
