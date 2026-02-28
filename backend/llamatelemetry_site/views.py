from django.conf import settings
from django.http import JsonResponse
from django_nextjs.render import render_nextjs_page


def site_info(request):
    return JsonResponse(settings.SITE_INFO)

HOP_BY_HOP_HEADERS = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
}


async def docs_view(request, *args, **kwargs):
    response = await render_nextjs_page(request=request)

    # WSGI forbids hop-by-hop headers in responses.
    for header in list(response.headers.keys()):
        if header.lower() in HOP_BY_HOP_HEADERS:
            del response.headers[header]

    return response
