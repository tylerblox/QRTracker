"""qrtracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/todolist/urls.py

from django.contrib import admin
from django.conf.urls import url
from django.urls import include, path
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, re_path
from rest_framework import routers
from qrtracker.api import views as apiViews
from . import views
from qrtracker.forms import CustomAuthForm




router = routers.DefaultRouter()
router.register('event_promoter', apiViews.EventPromoterViewSet)
router.register('event_register', apiViews.EventPromoterRegisterViewSet)
router.register('events', apiViews.EventStatisticsViewSet)  

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('admin/statistics/', views.admin_statistics),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('login/', LoginView.as_view(template_name='login.html', authentication_form=CustomAuthForm), name="login"),
    path('maketicket/', views.makeTicket, name="make-ticket"),
    path('ticket/', views.ticketView, name="ticket"),
    re_path(r'^(?P<path>.*)/$', views.catchall),
    path('',  views.catchall)
]
