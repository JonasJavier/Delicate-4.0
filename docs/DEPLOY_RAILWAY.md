# Despliegue en Railway

Delicaté corre en Railway como un solo servicio web (Django + build de React) con PostgreSQL y un volumen para las imágenes subidas desde el admin.

- **Sitio:** <https://delicate.jonasjavier.dev> (también responde en la URL `*.up.railway.app` que genera Railway)
- **Admin:** <https://delicate.jonasjavier.dev/admin/>
- **Salud:** <https://delicate.jonasjavier.dev/api/health/>

## Recursos

| Recurso | Nombre |
| --- | --- |
| Proyecto | `delicate` |
| Ambiente | `production` |
| Servicio web | `web` |
| Base de datos | `Postgres` |
| Volumen de imágenes | `web-volume` → `/data` |
| Dominio propio | `delicate.jonasjavier.dev` |

Los IDs de cada recurso están en el panel de Railway.

El servicio `web` despliega desde la rama `main` de `JonasJavier/Delicate-4.0`: cada push a `main` publica una versión nueva.

## Cómo se despliega

1. Railway construye el [`Dockerfile`](../Dockerfile): compila React con las variables `VITE_*`, instala Django, ejecuta `collectstatic` y comprime el build.
2. Antes de publicar corre `python /app/backend/manage.py migrate --noinput` (*pre-deploy*, definido en [`railway.json`](../railway.json)). Si falla, la versión anterior sigue en línea.
3. Arranca gunicorn (configuración en [`backend/gunicorn.conf.py`](../backend/gunicorn.conf.py)).
4. Railway espera a que `/api/health/` responda 200 (la ruta comprueba también la base de datos) y solo entonces cambia el tráfico.

Con un volumen montado, Railway detiene el contenedor anterior antes de iniciar el nuevo, así que cada despliegue tiene unos segundos de corte.

> **Importante:** Railway detectó `railway.json` pero no aplicó sus valores a este servicio (creado por CLI). Por eso el builder, el *pre-deploy*, el healthcheck y los reintentos están fijados también en la configuración del servicio (dashboard → `web` → **Settings**). Si cambias alguno, hazlo en los dos sitios.

## Variables del servicio `web`

| Variable | Valor |
| --- | --- |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (referencia, red privada) |
| `DJANGO_SECRET_KEY` | Generada aleatoriamente; no se guarda en ningún otro lugar |
| `DJANGO_ALLOWED_HOSTS` | `delicate.jonasjavier.dev,<servicio>.up.railway.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://delicate.jonasjavier.dev,https://<servicio>.up.railway.app` |
| `VITE_SITE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `VITE_ENABLE_DEMO_CATALOG` | `false` |
| `VITE_WHATSAPP_NUMBER` | `18498625049` |
| `VITE_WHATSAPP_DISPLAY` | `(849) 862-5049` |

No hace falta definir `DJANGO_DEBUG` (la imagen usa `False`), la cabecera de proxy HTTPS ni el número de proxies: la configuración los deriva de `RAILWAY_PROJECT_ID`. El dominio de `RAILWAY_PUBLIC_DOMAIN` también se autoriza solo, pero desde que existe el dominio propio esa variable vale `delicate.jonasjavier.dev`, y Railway ya no expone la URL `*.up.railway.app`; por eso ambas están escritas en `DJANGO_ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS`. Las imágenes van a `<volumen>/media` usando `RAILWAY_VOLUME_MOUNT_PATH`; `DJANGO_MEDIA_ROOT` solo se usa para forzar otra ruta, y debe ser absoluta.

> **Git Bash en Windows:** convierte cualquier argumento que empiece por `/` en una ruta de Windows (`/data` → `C:/Program Files/Git/data`), también dentro de `railway variable set` y `railway ssh`. Antepón siempre `MSYS_NO_PATHCONV=1` a esos comandos, o usa PowerShell.

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

Ya se ejecutó el 25 de septiembre de 2026 al crear el servicio. Solo hace falta de nuevo con una base vacía. Crea los diez productos y copia sus fotos al volumen:

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

La tienda usa `delicate.jonasjavier.dev`. El DNS de `jonasjavier.dev` está en **Name.com**, con estos registros:

| Tipo | Host (en Name.com) | Valor |
| --- | --- | --- |
| `CNAME` | `delicate` | el destino que indica Railway |
| `TXT` | `_railway-verify.delicate` | el valor que devuelve `railway domain status` |

Comprueba el estado del dominio y del certificado con:

```bash
railway domain status delicate.jonasjavier.dev --service web --json
```

`VITE_SITE_URL` referencia a `RAILWAY_PUBLIC_DOMAIN`, así que la vista previa de WhatsApp y la etiqueta canónica siguen solas al dominio propio.

Para cambiar o añadir otro dominio: `railway domain otro.dominio.com --service web`, crea los registros que devuelve y añádelo a `DJANGO_ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS`. `jonasjavier.dev` es `.dev`, así que los navegadores ya exigen HTTPS en todos sus subdominios; no hace falta activar `DJANGO_HSTS_INCLUDE_SUBDOMAINS`.
