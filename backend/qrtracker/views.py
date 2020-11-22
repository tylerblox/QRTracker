from django.views.generic import TemplateView
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import requests
from django import http
from django.conf import settings
from django.template import engines
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required


def login(request):
    print('get here')
    return render(request, 'login.html')

@csrf_exempt
@login_required(login_url='/login')
def catchall_dev(request, path='', upstream='http://localhost:3000/'):
    upstream_url = upstream + path
    method = request.META['REQUEST_METHOD'].lower()
    response = requests.get(upstream_url, stream=True)
    content_type = response.headers.get('Content-Type')
    
    if request.META.get('HTTP_UPGRADE', '').lower() == 'websocket':
        return http.HttpResponse(
            content="WebSocket connections aren't supported",
            status=501,
            reason="Not Implemented"
        )

    elif content_type == 'text/html; charset=UTF-8':
        return http.HttpResponse(
            content=engines['django'].from_string(response.text).render(),
            status=response.status_code,
            reason=response.reason,
        )

    else:
        return http.StreamingHttpResponse(
            streaming_content=response.iter_content(2 ** 12),
            content_type=content_type,
            status=response.status_code,
            reason=response.reason,
        )

@login_required(login_url='/login')
def catchall_prod(request,  path=''):
    return render(request, 'index.html', {})

catchall = catchall_dev if settings.DEBUG else catchall_prod

@staff_member_required
def admin_statistics_dev(request, path='', upstream='http://localhost:3000/'):
    return  catchall(request, path, upstream)
@staff_member_required
def admin_statistics_prod(request, path=''):
    return  catchall(request, path)
admin_statistics = admin_statistics_dev if settings.DEBUG else admin_statistics_prod