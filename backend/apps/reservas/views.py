from rest_framework import generics
from .models import Reserva
from .serializers import ReservaSerializer

class ReservaListCreateView(generics.ListCreateAPIView):
    queryset = Reserva.objects.all().order_by('-hora_inicio')
    serializer_class = ReservaSerializer
