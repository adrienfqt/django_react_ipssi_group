"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('carousel/', views.get_carousel, name='get_carousel'),
    path('photo/', views.get_location_photo, name='get_photo'),
    path('details/', views.get_location_details, name='get_details'),
    path('nearby_capitale/', views.get_location_nearby_country, name='get_location_nearby_country'),
    path('search/filter/', views.get_places_search_filter, name='get_places_search_filter'),
]
