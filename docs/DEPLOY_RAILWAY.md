# Deploying to Railway

Delicaté runs on Railway as a single web service (Django + the React build) with PostgreSQL and a volume for the images uploaded from the admin.

- **Site:** <https://delicate.jonasjavier.dev> (it also answers on the `*.up.railway.app` URL that Railway generates)
- **Admin:** <https://delicate.jonasjavier.dev/admin/>
- **Health:** <https://delicate.jonasjavier.dev/api/health/>

## Resources

| Resource | Name |
| --- | --- |
| Project | `delicate` |
| Environment | `production` |
| Web service | `web` |
| Database | `Postgres` |
| Image volume | `web-volume` → `/data` |
| Custom domain | `delicate.jonasjavier.dev` |

The ID of every resource is in the Railway dashboard.

The `web` service deploys from the `main` branch of `JonasJavier/Delicate-4.0`: every push to `main` releases a new version.

## How a deployment works

1. Railway builds the [`Dockerfile`](../Dockerfile): it compiles React with the `VITE_*` variables, installs Django, runs `collectstatic` and compresses the build.
2. Before the release it runs `python /app/backend/manage.py migrate --noinput` (the *pre-deploy* command, defined in [`railway.json`](../railway.json)). If it fails, the previous version stays online.
3. It starts gunicorn (configured in [`backend/gunicorn.conf.py`](../backend/gunicorn.conf.py)).
4. Railway waits for `/api/health/` to return 200 (the endpoint also checks the database) and only then switches traffic.

With a volume attached, Railway stops the old container before starting the new one, so each deployment has a few seconds of downtime.

> **Important:** Railway detected `railway.json` but did not apply its values to this service (it was created from the CLI). That is why the builder, the pre-deploy command, the health check and the restart policy are also set in the service configuration (dashboard → `web` → **Settings**). If you change any of them, change them in both places.

## `web` service variables

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (reference, private network) |
| `DJANGO_SECRET_KEY` | Randomly generated; not stored anywhere else |
| `DJANGO_ALLOWED_HOSTS` | `delicate.jonasjavier.dev,<service>.up.railway.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://delicate.jonasjavier.dev,https://<service>.up.railway.app` |
| `VITE_SITE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `VITE_ENABLE_DEMO_CATALOG` | `false` |
| `VITE_WHATSAPP_NUMBER` | `18498625049` |
| `VITE_WHATSAPP_DISPLAY` | `(849) 862-5049` |

There is no need to set `DJANGO_DEBUG` (the image uses `False`), the HTTPS proxy header or the number of proxies: the settings derive them from `RAILWAY_PROJECT_ID`. The `RAILWAY_PUBLIC_DOMAIN` host is also allowed automatically, but since the custom domain exists that variable holds `delicate.jonasjavier.dev` and Railway no longer exposes the `*.up.railway.app` URL, so both hosts are written into `DJANGO_ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`. Images are stored in `<volume>/media` using `RAILWAY_VOLUME_MOUNT_PATH`; `DJANGO_MEDIA_ROOT` is only for forcing another location, and it must be absolute.

> **Git Bash on Windows:** it rewrites any argument that starts with `/` into a Windows path (`/data` → `C:/Program Files/Git/data`), including inside `railway variable set` and `railway ssh`. Always prefix those commands with `MSYS_NO_PATHCONV=1`, or use PowerShell.

The `VITE_*` variables are embedded at build time. If you change the WhatsApp number, Railway rebuilds and redeploys automatically.

## Operations

Run the commands from the root of this repository, linked to the `delicate` project. In Git Bash, prefix them with `MSYS_NO_PATHCONV=1` so `/app/...` paths are not turned into Windows paths.

### Create the admin user

Open a shell inside the container and run the command there, because it asks for the email and password interactively:

```bash
railway ssh --service web
python manage.py createsuperuser
```

Use a long, unique password, then leave with `exit`.

### Load the initial catalog

This already ran on 25 September 2026 when the service was created. It is only needed again on an empty database. It creates the ten products and copies their photos to the volume:

```bash
railway ssh --service web -- python manage.py seed_products
```

Do not run it again after editing products in the admin: it resets the price, stock and copy of those ten products.

### Logs and status

```bash
railway deployment list --service web --limit 5 --json
railway logs --service web --deployment --lines 200
railway logs --service web --build --lines 200
```

### Roll back

From the dashboard: `web` service → **Deployments** → the version you want → **Redeploy**. Migrations are not reverted automatically; if the newer version changed the schema, check it first.

### Backups

Enable scheduled backups in the dashboard for the `Postgres` volume and for `web-volume` (service → **Backups**). The database holds the catalog and messages; the volume holds the uploaded photos.

## Custom domain

The store uses `delicate.jonasjavier.dev`. DNS for `jonasjavier.dev` is managed at **Name.com**, with these records:

| Type | Host (at Name.com) | Value |
| --- | --- | --- |
| `CNAME` | `delicate` | the target given by Railway |
| `TXT` | `_railway-verify.delicate` | the value returned by `railway domain status` |

Check the domain and certificate status with:

```bash
railway domain status delicate.jonasjavier.dev --service web --json
```

`VITE_SITE_URL` references `RAILWAY_PUBLIC_DOMAIN`, so the WhatsApp link preview and the canonical tag follow the custom domain automatically.

To change or add a domain: run `railway domain other.example.com --service web`, create the records it returns and add the host to `DJANGO_ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`. `jonasjavier.dev` is a `.dev` domain, so browsers already require HTTPS on all its subdomains; there is no need to enable `DJANGO_HSTS_INCLUDE_SUBDOMAINS`.
