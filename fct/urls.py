from django.urls import path

from . import views

app_name = "fct"

urlpatterns = [
    path('', views.index, name='index'),
    path('inner_network', views.inner_network, name='inner_network'),
    path('GeoMap', views.geomap, name='geomap'),
    path('test', views.test, name='test'),
    path('base', views.base, name='base'),
    path('logical_view_2d', views.logical_view_2d, name='logical_view_2d'),
    path('logical_view_3d', views.logical_view_3d, name='logical_view_3d'),
]

