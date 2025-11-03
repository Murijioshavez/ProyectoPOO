from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('lista-espacios/', views.lista_espacios, name='lista_espacios'),
    path('reservar/', views.reservar_espacio, name='reservar_espacio'),
    path('mis-reservas/', views.ver_reservas, name='ver_reservas'),
    path('eliminar-reserva/', views.eliminar_reserva, name='eliminar_reserva'),
    path('login/', views.login_register_view, name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('logout/', views.logout_view, name='logout'),
]

