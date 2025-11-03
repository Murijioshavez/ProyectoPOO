from django.urls import path
from . import views

urlpatterns = [
    path('', views.UsuarioListCreateView.as_view(), name='usuario-list'),
]
