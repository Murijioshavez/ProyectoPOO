from django import forms
from .models import Reserva
from datetime import time
from django.core.exceptions import ValidationError
from django.forms import DateInput

class ReservaForm(forms.ModelForm):
    nombre_usuario = forms.EmailField(
        help_text="Ingrese su correo institucional (@keyinstitute.edu.sv)"
    )

    fecha = forms.DateField(
        widget=DateInput(
            attrs={
                'type': 'text',
                'id': 'datepicker',
                'class': 'form-style',
                'autocomplete': 'off'
            }
        )
    )

    hora_inicio = forms.TimeField(
        widget=forms.TimeInput(format='%H:%M', attrs={'type': 'time'})
    )

    hora_fin = forms.TimeField(
        widget=forms.TimeInput(format='%H:%M', attrs={'type': 'time'})
    )

    class Meta:
        model = Reserva
        fields = [
            'nombre_completo',
            'nombre_usuario',
            'espacio',
            'fecha',
            'hora_inicio',
            'hora_fin',
            'motivo',
            'necesidades'
        ]

    def clean_nombre_usuario(self):
        correo = self.cleaned_data.get('nombre_usuario', '')
        if not correo.endswith('@keyinstitute.edu.sv'):
            raise ValidationError("Debe usar su correo institucional.")
        return correo

    def clean(self):
        cleaned_data = super().clean()
        hora_inicio = cleaned_data.get('hora_inicio')
        hora_fin = cleaned_data.get('hora_fin')

        if hora_inicio and hora_fin:
            if hora_inicio >= hora_fin:
                raise ValidationError("La hora de inicio debe ser antes que la hora de fin.")

            if not (time(8, 0) <= hora_inicio <= time(17, 45)):
                raise ValidationError("La hora de inicio debe estar entre 08:00 y 17:45.")

            if not (time(8, 15) <= hora_fin <= time(18, 0)):
                raise ValidationError("La hora de fin debe estar entre 08:15 y 18:00.")
