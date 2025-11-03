from django.db import models

SALONES = [
    ('Salón 201', 'Salón 201'),
    ('Salón 202', 'Salón 202'),
    ('Salón 203', 'Salón 203'),
    ('Salón 204', 'Salón 204'),
    ('Salón 205', 'Salón 205'),
    ('Salón 206', 'Salón 206'),
]

class Espacio(models.Model):
    nombre = models.CharField(max_length=20, choices=SALONES, unique=True)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

class Reserva(models.Model):
    nombre_completo = models.CharField(max_length=100)
    nombre_usuario = models.EmailField()  
    espacio = models.ForeignKey(Espacio, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    motivo = models.TextField(blank=True)
    necesidades = models.TextField(blank=True)

    def __str__(self):
        return f"{self.espacio.nombre} - {self.fecha} ({self.hora_inicio}-{self.hora_fin})"

    class Meta:
        unique_together = ('espacio', 'fecha', 'hora_inicio', 'hora_fin')
