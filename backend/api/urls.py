from django.urls import path
from .views import ReservaListCreateView

urlpatterns = [
    path('reservas/', ReservaListCreateView.as_view(), name='reserva-list-create'),
]
