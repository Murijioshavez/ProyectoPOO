# Create your models here.
from django.db import models

class Reserva(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    fecha = models.DateField()
    hora = models.TimeField()
    personas = models.PositiveIntegerField()

    def __str__(self):
        return f"Reserva de {self.nombre_cliente} el {self.fecha} a las {self.hora}"
