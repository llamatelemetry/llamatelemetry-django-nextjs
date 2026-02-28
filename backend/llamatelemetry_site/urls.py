from django.urls import path, re_path

from .views import docs_view, site_info

urlpatterns = [
    path("site.json", site_info),
    re_path(r"^.*$", docs_view),
]
