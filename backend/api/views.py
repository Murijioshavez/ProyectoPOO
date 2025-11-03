from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Reserva
from .serializers import ReservaSerializer
from django.urls import include, path

urlpatterns = [
    path('reservas/', include('apps.reservas.urls')),
    path('usuarios/', include('apps.usuarios.urls')),
]

class ReservaListCreateView(generics.ListCreateAPIView):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
