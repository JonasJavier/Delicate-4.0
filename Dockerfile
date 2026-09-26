# syntax=docker/dockerfile:1

# ---- Storefront build -------------------------------------------------------
FROM node:24-alpine AS frontend
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ ./
# Vite embeds VITE_* values at build time. Railway passes service variables
# with these names as build arguments.
ARG VITE_API_URL=/api
ARG VITE_WHATSAPP_NUMBER
ARG VITE_WHATSAPP_DISPLAY
ARG VITE_ENABLE_DEMO_CATALOG=false
ARG VITE_SITE_URL
ARG RAILWAY_PUBLIC_DOMAIN
RUN npm run build

# ---- Django runtime ---------------------------------------------------------
FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    DJANGO_DEBUG=False \
    PORT=8000

WORKDIR /app/backend

COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY backend/ ./
COPY --from=frontend /app/frontend/dist /app/frontend/dist

# Collect the admin assets and pre-compress the storefront so WhiteNoise can
# serve gzip without doing it per request. The key only satisfies the settings
# guard during the build; the real one comes from the environment at runtime.
RUN DJANGO_SECRET_KEY=build-only-not-secret python manage.py collectstatic --noinput \
    && python -m whitenoise.compress /app/frontend/dist

EXPOSE 8000
CMD ["gunicorn", "backend.wsgi:application"]
