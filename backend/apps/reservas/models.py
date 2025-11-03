from django.db import models
from django.utils import timezone

class Reserva(models.Model):
    SALAS = [
        ('SALA_1', 'Sala 1'),
        ('SALA_2', 'Sala 2'),
        ('SALA_3', 'Sala 3'),
        ('SALA_4', 'Sala 4'),
        ('SALA_5', 'Sala 5'),
        ('SALA_6', 'Sala 6'),
        ('SALA_7', 'Sala 7'),
    ]

    nombre_estudiante = models.CharField(
        max_length=100,
        default='Estudiante Demo'
    )
    sala = models.CharField(
        max_length=10,
        choices=SALAS,
        default='SALA_1'
    )
    hora_inicio = models.DateTimeField(
        default=timezone.now
    )

    def __str__(self):
        return f"{self.nombre_estudiante} - {self.sala} - {self.hora_inicio.strftime('%Y-%m-%d %H:%M')}"
