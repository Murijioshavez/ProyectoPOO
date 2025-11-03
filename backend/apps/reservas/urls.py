from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReservaListCreateView.as_view(), name='reserva-list'),
]
