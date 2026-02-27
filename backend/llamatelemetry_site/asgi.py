import os

from django.core.asgi import get_asgi_application
from django_nextjs.asgi import NextJsMiddleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "llamatelemetry_site.settings")

django_asgi_app = get_asgi_application()
application = NextJsMiddleware(django_asgi_app)
