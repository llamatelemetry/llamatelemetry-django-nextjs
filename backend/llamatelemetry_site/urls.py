from django.urls import re_path

from .views import docs_view

urlpatterns = [
    re_path(r"^.*$", docs_view),
]
