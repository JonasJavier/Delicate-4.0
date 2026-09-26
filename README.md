# Delicaté 4.0

Ecommerce y sitio de marca para jabones artesanales. El catálogo se administra desde Django, la experiencia pública está construida con React + Vite y los pedidos se terminan de coordinar por WhatsApp.

> WhatsApp comercial: **(849) 862-5049** · enlace internacional: `18498625049`

## Qué incluye

- Landing ecommerce responsive con identidad visual propia.
- Catálogo conectado a Django REST Framework; el respaldo visual queda limitado a desarrollo/demo.
- Filtros por categoría, ingredientes y beneficios, estados de carga, error y productos agotados.
- Carrito persistente en `localStorage`, sin obligar al cliente a registrarse.
- Pedido preformateado con productos, cantidades y total para WhatsApp.
- Formulario de consulta que abre una conversación de WhatsApp.
- Django Admin para inventario, precios, imágenes, destacados y contactos.
- API pública de solo lectura para productos.
- Navegación accesible por teclado, foco controlado en diálogos y soporte para movimiento reducido.
- Configuración segura mediante variables de entorno, PostgreSQL y archivos estáticos comprimidos.
- Límites de frecuencia para formularios públicos y validación de imágenes del catálogo.
- Pruebas de API, lint y build de producción.

## Stack

| Capa | Tecnología |
| --- | --- |
| Backend | Python 3.12+ · Django 5.2 LTS · Django REST Framework 3.17 |
| Frontend | React 19 · Vite 8 · CSS responsive propio |
| Datos | SQLite en desarrollo · PostgreSQL en producción |
| Compra | Carrito local + WhatsApp |
| Hosting | Railway · un contenedor Docker (Django + build de React) · volumen para imágenes |

## License

This project is proprietary and all rights reserved. See [LICENSE](LICENSE).
The repository may be inspected for evaluation, but its code, design, brand,
catalog, and visual materials may not be reused without written permission.

## Estructura

```text
Delicate-4.0/
├── backend/
│   ├── accounts/        # Usuario administrador por correo
│   ├── backend/         # Configuración, rutas, salud, media y cabeceras de seguridad
│   ├── contact/         # Mensajes y suscripciones
│   ├── shop/            # Productos, API, admin y comando de datos demo
│   │   └── seed_images/ # Fotos originales que copia `seed_products`
│   ├── media/           # Imágenes subidas (local; ignorado por Git)
│   ├── gunicorn.conf.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/          # Íconos, portada para redes y robots.txt
│   ├── src/
│   │   ├── assets/      # Fotografía de marca y productos
│   │   ├── components/  # Navegación, catálogo, carrito y footer
│   │   ├── data/        # Catálogo visual de respaldo
│   │   ├── hooks/       # Estado persistente del carrito
│   │   ├── api.js       # Lectura del catálogo (todas las páginas)
│   │   ├── config.js    # Variables VITE_* y enlaces de WhatsApp
│   │   ├── App.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
├── docs/                # Salida a producción y despliegue en Railway
├── Dockerfile           # Build de React + runtime de Django en una imagen
├── railway.json         # Build, migraciones y healthcheck en Railway
├── .env.example
└── README.md
```

## Inicio rápido en Windows (PowerShell)

### 1. Backend

Desde la raíz del repositorio:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
python backend\manage.py migrate
python backend\manage.py seed_products --reset
python backend\manage.py runserver
```

La API quedará en [http://127.0.0.1:8000/api/products/](http://127.0.0.1:8000/api/products/) y el panel en [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/).

### 2. Frontend

Abre otra terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Abre [http://127.0.0.1:5173](http://127.0.0.1:5173).

## Inicio rápido en macOS o Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/manage.py seed_products --reset
python backend/manage.py runserver
```

En otra terminal:

```bash
cd frontend
npm ci
npm run dev
```

## Administrar el catálogo

Crea primero un usuario administrador:

```powershell
.\.venv\Scripts\Activate.ps1
python backend\manage.py createsuperuser
```

Luego entra a `/admin/`. Desde **Productos** puedes:

- cambiar nombre, descripción y categoría;
- subir la fotografía del producto;
- ajustar precio en pesos dominicanos y existencias;
- marcar productos destacados o agotados;
- ocultar un producto sin borrarlo.

El comando siguiente crea o actualiza diez productos de demostración, copia sus fotos desde `backend/shop/seed_images/` al almacenamiento de media si aún no están y comprueba que ninguno comparta fotografía. Con `--reset` también oculta los productos antiguos; úsalo solo cuando quieras restaurar el catálogo demo.

> **Cuidado en producción:** vuelve a poner precio, existencias y textos de demostración a esos diez productos. Ejecútalo solo una vez, sobre una base vacía.

```powershell
python backend\manage.py seed_products --reset
```

## Variables de entorno

Los valores por defecto funcionan en desarrollo. Para personalizarlos, copia `.env.example` a un archivo `.env` y carga sus valores en tu terminal o plataforma de despliegue.

| Variable | Uso |
| --- | --- |
| `DJANGO_SECRET_KEY` | Clave larga y privada para Django |
| `DJANGO_DEBUG` | `True` en local; la imagen Docker usa `False` por defecto |
| `DJANGO_ALLOWED_HOSTS` | Dominios permitidos, separados por coma (el dominio de Railway se añade solo) |
| `DATABASE_URL` | Conexión PostgreSQL de producción; si se omite usa SQLite |
| `DJANGO_MEDIA_ROOT` | Carpeta absoluta de imágenes subidas; en Railway se deriva del volumen montado |
| `CORS_ALLOWED_ORIGINS` | Orígenes autorizados para consumir la API desde otro dominio |
| `CSRF_TRUSTED_ORIGINS` | Orígenes confiables para formularios de Django (el dominio de Railway se añade solo) |
| `DJANGO_TRUST_PROXY_SSL_HEADER` | `True` si un proxy confiable termina HTTPS (automático en Railway) |
| `DJANGO_NUM_PROXIES` | Proxies delante de Django, para identificar la IP real en los límites de frecuencia (`1` en Railway) |
| `DJANGO_HSTS_INCLUDE_SUBDOMAINS` / `DJANGO_HSTS_PRELOAD` | Actívalos solo con dominio propio y todos sus subdominios en HTTPS |
| `DJANGO_LOG_LEVEL` | Nivel de logs de Django (por defecto `INFO`) |
| `VITE_API_URL` | Base de la API; `/api` en local y en producción |
| `VITE_WHATSAPP_NUMBER` | Número internacional sin `+`, espacios ni guiones |
| `VITE_WHATSAPP_DISPLAY` | Número con formato legible para mostrar al cliente |
| `VITE_ENABLE_DEMO_CATALOG` | `true` solo para demo; en producción comercial usa `false` |
| `VITE_SITE_URL` | URL pública; se usa en la vista previa de enlaces y la etiqueta canónica |

Vite solo incorpora variables que empiecen por `VITE_`, y lo hace al construir. Si cambias el número de WhatsApp o la URL pública en producción, hay que volver a desplegar.

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health/` | Estado del servicio y de la base de datos (503 si no responde) |
| `GET` | `/api/products/` | Productos activos paginados (`?page_size=` hasta 100) |
| `GET` | `/api/products/?category=suaves` | Filtro por categoría |
| `GET` | `/api/products/?featured=true` | Solo destacados |
| `GET` | `/api/products/?search=avena` | Búsqueda en catálogo |
| `GET` | `/api/products/<slug>/` | Detalle de producto |
| `POST` | `/api/contact/` | Guardar mensaje de contacto |
| `POST` | `/api/newsletter/` | Registrar un correo |

Las escrituras de productos no se exponen públicamente: se realizan desde Django Admin.

## Calidad y pruebas

Backend:

```powershell
python backend\manage.py check
python backend\manage.py test
python backend\manage.py makemigrations --check --dry-run
```

Frontend:

```powershell
cd frontend
npm run lint
npm run build
npm run preview
```

## Build y producción

Producción corre como **un solo servicio**: el `Dockerfile` construye React y lo sirve Django con WhiteNoise junto a la API y el admin. Tienda, API y panel comparten dominio, así que no hace falta CORS.

| Ruta | La atiende |
| --- | --- |
| `/`, `/assets/*`, íconos | Build de React (WhiteNoise, comprimido y con caché larga en archivos con hash) |
| `/api/*` | Django REST Framework |
| `/admin/` | Django Admin |
| `/static/*` | Archivos del admin (WhiteNoise) |
| `/media/*` | Imágenes subidas, guardadas en un volumen persistente |

En cada despliegue Railway construye la imagen, ejecuta `migrate` como *pre-deploy* y solo publica la nueva versión cuando `/api/health/` responde 200. La guía completa, con los recursos creados y cómo operar el servicio, está en [docs/DEPLOY_RAILWAY.md](docs/DEPLOY_RAILWAY.md).

Para probar la imagen de producción en local:

```bash
docker build -t delicate .
docker run --rm -p 8080:8000 -e DJANGO_SECRET_KEY=solo-local-$(date +%s)-cambia-esto -e DJANGO_ALLOWED_HOSTS=localhost -e DJANGO_SECURE_SSL_REDIRECT=False delicate
```

Antes de recibir pedidos reales, completa la [lista de salida a producción](docs/GO_LIVE.md). Incluye contenido, privacidad, entrega, respaldo y comprobaciones operativas que dependen del negocio y no pueden resolverse únicamente con código.

La propuesta funcional y técnica para una futura experiencia de jabón personalizado está desarrollada en [Atelier Delicaté](docs/ATELIER_JABON_PERSONALIZADO.md). Es una especificación de producto; todavía no añade modelos, endpoints ni pantallas al sistema.

La base `backend/db.sqlite3`, los entornos virtuales, los logs, `node_modules` y los builds están ignorados por Git para evitar publicar datos personales o archivos generados.

## Decisiones de experiencia

- No hay registro ni login de clientes: para este modelo de venta añade fricción sin aportar valor.
- El usuario personalizado de Django existe solo para el equipo administrador; no se conservan perfiles, direcciones ni datos de facturación de compradores.
- El carrito vive en el navegador y se actualiza con los precios y existencias del catálogo en cada visita; si algo cambió, se avisa al abrirlo. El catálogo demo puede respaldar una presentación local, pero nunca reemplaza silenciosamente los datos reales en producción.
- El cliente ve un total estimado, pero el sitio aclara que no realiza cobros.
- El mensaje de WhatsApp incluye el pedido completo y campos para nombre y modalidad de entrega.
- El contenido evita promesas médicas; cualquier condición o alergia debe consultarse con un profesional.

---

Proyecto de portafolio personal. Fotografías de marca generadas específicamente para esta versión; fotografías de producto conservadas del proyecto original.
