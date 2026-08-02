# Delicaté 4.0

Ecommerce y sitio de marca para jabones artesanales. El catálogo se administra desde Django, la experiencia pública está construida con React + Vite y los pedidos se terminan de coordinar por WhatsApp.

> WhatsApp comercial: **(849) 862-5049** · enlace internacional: `18498625049`

## Qué incluye

- Landing ecommerce responsive con identidad visual propia.
- Catálogo conectado a Django REST Framework y catálogo local de respaldo.
- Filtros por categoría, estados de carga y productos agotados.
- Carrito persistente en `localStorage`, sin obligar al cliente a registrarse.
- Pedido preformateado con productos, cantidades y total para WhatsApp.
- Formulario de consulta que abre una conversación de WhatsApp.
- Django Admin para inventario, precios, imágenes, destacados y contactos.
- API pública de solo lectura para productos.
- Configuración segura mediante variables de entorno.
- Pruebas de API, lint y build de producción.

## Stack

| Capa | Tecnología |
| --- | --- |
| Backend | Python 3.12+ · Django 5.2 LTS · Django REST Framework 3.17 |
| Frontend | React 19 · Vite 8 · CSS responsive propio |
| Desarrollo | SQLite · proxy de Vite hacia Django |
| Compra | Carrito local + WhatsApp |

## Estructura

```text
Delicate-4.0/
├── backend/
│   ├── accounts/        # Usuario administrador por correo
│   ├── backend/         # Configuración y rutas del proyecto
│   ├── contact/         # Mensajes y suscripciones
│   ├── shop/            # Productos, API, admin y comando de datos demo
│   ├── media/           # Imágenes del catálogo local
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── assets/      # Fotografía de marca y productos
│   │   ├── components/  # Navegación, catálogo, carrito y footer
│   │   ├── data/        # Catálogo visual de respaldo
│   │   ├── hooks/       # Estado persistente del carrito
│   │   ├── App.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
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
npm install
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
npm install
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

El comando siguiente crea o actualiza seis productos de demostración. Con `--reset` también oculta los productos antiguos; úsalo solo cuando quieras restaurar el catálogo demo.

```powershell
python backend\manage.py seed_products --reset
```

## Variables de entorno

Los valores por defecto funcionan en desarrollo. Para personalizarlos, copia `.env.example` a un archivo `.env` y carga sus valores en tu terminal o plataforma de despliegue.

| Variable | Uso |
| --- | --- |
| `DJANGO_SECRET_KEY` | Clave larga y privada para Django |
| `DJANGO_DEBUG` | `True` en local, `False` en producción |
| `DJANGO_ALLOWED_HOSTS` | Dominios permitidos, separados por coma |
| `CORS_ALLOWED_ORIGINS` | Orígenes autorizados para consumir la API |
| `CSRF_TRUSTED_ORIGINS` | Orígenes confiables para formularios de Django |
| `VITE_API_URL` | Base de la API; en local se recomienda `/api` |
| `VITE_WHATSAPP_NUMBER` | Número internacional sin `+`, espacios ni guiones |

Vite solo incorpora variables que empiecen por `VITE_`. Si cambias el número de WhatsApp en producción debes volver a generar el build.

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health/` | Estado del servicio |
| `GET` | `/api/products/` | Productos activos paginados |
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

1. Define `DJANGO_DEBUG=False`, una clave secreta fuerte y los hosts/orígenes reales.
2. Usa PostgreSQL en producción si el proyecto empieza a recibir pedidos frecuentes.
3. Sirve `frontend/dist` desde un hosting estático y Django desde un servicio Python.
4. Configura almacenamiento persistente para `backend/media` o un servicio de objetos.
5. Ejecuta `python backend/manage.py collectstatic` y las migraciones en cada despliegue.
6. Mantén el número de WhatsApp en `VITE_WHATSAPP_NUMBER`.

La base `backend/db.sqlite3`, los entornos virtuales, los logs, `node_modules` y los builds están ignorados por Git para evitar publicar datos personales o archivos generados.

## Decisiones de experiencia

- No hay registro ni login de clientes: para este modelo de venta añade fricción sin aportar valor.
- El carrito vive en el navegador y funciona incluso si la API está temporalmente fuera de línea.
- El cliente ve un total estimado, pero el sitio aclara que no realiza cobros.
- El mensaje de WhatsApp incluye el pedido completo y campos para nombre y modalidad de entrega.
- El contenido evita promesas médicas; cualquier condición o alergia debe consultarse con un profesional.

---

Proyecto de portafolio personal. Fotografías de marca generadas específicamente para esta versión; fotografías de producto conservadas del proyecto original.
