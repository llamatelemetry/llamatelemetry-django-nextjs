import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent

SECRET_KEY = "django-insecure-llamatelemetry-docs"
DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    "django_nextjs",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
]

ROOT_URLCONF = "llamatelemetry_site.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
            ],
        },
    },
]

ASGI_APPLICATION = "llamatelemetry_site.asgi.application"

STATIC_URL = "/static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

APPEND_SLASH = False

NEXTJS_SETTINGS = {
    "nextjs_server_url": "http://127.0.0.1:3000",
    "ensure_csrf_token": True,
    "public_subdirectory": "/next",
}

SITE_INFO = {
    "name": "llamatelemetry Documentation",
    "version": "v0.1.0",
    "description": "Extensive documentation for llamatelemetry v0.1.0: inference, observability, Kaggle, GGUF, APIs, and notebooks.",
    "titleTemplate": "%s - llamatelemetry Documentation",
}

_site_path = PROJECT_ROOT / "site.json"
if _site_path.exists():
    try:
        SITE_INFO.update(json.loads(_site_path.read_text(encoding="utf-8")))
    except (json.JSONDecodeError, OSError):
        pass
