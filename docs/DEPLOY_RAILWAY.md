# Despliegue en Railway

Delicaté corre en Railway como un solo servicio web (Django + build de React) con PostgreSQL y un volumen para las imágenes subidas desde el admin.

- **Sitio:** <https://web-production-3706c.up.railway.app>
- **Admin:** <https://web-production-3706c.up.railway.app/admin/>
- **Salud:** <https://web-production-3706c.up.railway.app/api/health/>

## Recursos

| Recurso | Nombre | ID |
| --- | --- | --- |
| Proyecto | `delicate` | `985995d0-e7e4-4d2b-b268-1a639f2e5045` |
| Ambiente | `production` | `d729d7b2-094e-46ab-8a5c-528e2a118277` |
| Servicio web | `web` | `f97e72be-a19b-46e2-a299-ba30f5f6e06b` |
| Base de datos | `Postgres` | `ea71415b-e2b2-45d8-a5d3-553443c9a3c7` |
| Volumen de imágenes | `web-volume` → `/data` | `2531d094-0f28-4f7a-8d1d-9d1796d4544b` |

El servicio `web` despliega desde la rama `main` de `JonasJavier/Delicate-4.0`: cada push a `main` publica una versión nueva.

## Cómo se despliega

1. Railway construye el [`Dockerfile`](../Dockerfile): compila React con las variables `VITE_*`, instala Django, ejecuta `collectstatic` y comprime el build.
2. Antes de publicar corre `python /app/backend/manage.py migrate --noinput` (*pre-deploy*, definido en [`railway.json`](../railway.json)). Si falla, la versión anterior sigue en línea.
3. Arranca gunicorn (configuración en [`backend/gunicorn.conf.py`](../backend/gunicorn.conf.py)).
4. Railway espera a que `/api/health/` responda 200 (la ruta comprueba también la base de datos) y solo entonces cambia el tráfico.

Con un volumen montado, Railway detiene el contenedor anterior antes de iniciar el nuevo, así que cada despliegue tiene unos segundos de corte.

## Variables del servicio `web`

| Variable | Valor |
| --- | --- |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (referencia, red privada) |
| `DJANGO_SECRET_KEY` | Generada aleatoriamente; no se guarda en ningún otro lugar |
| `DJANGO_MEDIA_ROOT` | `/data/media` |
| `VITE_SITE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `VITE_ENABLE_DEMO_CATALOG` | `false` |
| `VITE_WHATSAPP_NUMBER` | `18498625049` |
| `VITE_WHATSAPP_DISPLAY` | `(849) 862-5049` |

No hace falta definir `DJANGO_DEBUG` (la imagen usa `False`), ni hosts, orígenes CSRF, cabecera de proxy HTTPS o número de proxies: la configuración los deriva de `RAILWAY_PUBLIC_DOMAIN` y `RAILWAY_PROJECT_ID`.

Las variables `VITE_*` se incrustan al construir. Si cambias el número de WhatsApp, Railway vuelve a construir y desplegar automáticamente.

## Operación

Los comandos se ejecutan desde la raíz de este repositorio, que está enlazado al proyecto `delicate`. En Git Bash antepón `MSYS_NO_PATHCONV=1` para que no convierta las rutas `/app/...` en rutas de Windows.

### Crear el usuario administrador

Abre una terminal dentro del contenedor y ejecuta el comando ahí, porque pide correo y contraseña de forma interactiva:

```bash
railway ssh --service web
python manage.py createsuperuser
```

Usa una contraseña única y larga, y sal con `exit`.

### Cargar el catálogo inicial

Solo una vez, con la base vacía. Crea los diez productos y copia sus fotos al volumen:

```bash
railway ssh --service web -- python manage.py seed_products
```

No lo vuelvas a ejecutar después de editar productos en el admin: restablece precio, existencias y textos de esos diez productos.

### Logs y estado

```bash
railway deployment list --service web --limit 5 --json
railway logs --service web --deployment --lines 200
railway logs --service web --build --lines 200
```

### Volver a una versión anterior

Desde el dashboard: servicio `web` → **Deployments** → versión deseada → **Redeploy**. Las migraciones no se revierten solas; si la versión nueva cambió el esquema, revisa antes.

### Copias de seguridad

Activa backups programados en el dashboard para el volumen de `Postgres` y para `web-volume` (servicio → **Backups**). La base guarda el catálogo y los mensajes; el volumen, las fotos subidas.

## Dominio propio

1. `railway domain www.tudominio.com --service web` y crea en tu proveedor DNS los registros que devuelve.
2. Añade el dominio a Django: `DJANGO_ALLOWED_HOSTS=www.tudominio.com` y `CSRF_TRUSTED_ORIGINS=https://www.tudominio.com`.
3. Cambia `VITE_SITE_URL=https://www.tudominio.com` para que la vista previa en WhatsApp y la etiqueta canónica usen el dominio nuevo.
4. Cuando todos los subdominios sirvan HTTPS, puedes activar `DJANGO_HSTS_INCLUDE_SUBDOMAINS=True` (y `DJANGO_HSTS_PRELOAD=True` si vas a inscribir el dominio en la lista de precarga).
