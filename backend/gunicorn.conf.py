"""Gunicorn settings, loaded automatically when gunicorn starts in this folder."""

import os


bind = f"0.0.0.0:{os.getenv('PORT', '8000')}"
workers = int(os.getenv("WEB_CONCURRENCY", "2"))
threads = int(os.getenv("GUNICORN_THREADS", "4"))
timeout = int(os.getenv("GUNICORN_TIMEOUT", "60"))
graceful_timeout = 20
accesslog = "-"
errorlog = "-"
# TLS terminates at the platform proxy; trust its X-Forwarded-* headers.
forwarded_allow_ips = "*"
