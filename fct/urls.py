from django.urls import path

from . import views

app_name = "fct"

urlpatterns = [
    path('', views.main_page, name='main'),
    path('inner_network', views.inner_network, name='inner_network'),
    path('map/<int:mno>', views.maps, name='maps'),

]