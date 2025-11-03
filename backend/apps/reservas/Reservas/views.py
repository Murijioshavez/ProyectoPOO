from django.shortcuts import render, redirect
from .models import Espacio, Reserva
from .forms import ReservaForm
from django.contrib import messages
from datetime import datetime, timedelta, date
import os
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from calendar import monthrange

@login_required
def inicio(request):
    return render(request, 'Reservas/inicio.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def login_register_view(request):
    if request.method == 'POST':
        if 'logemail' in request.POST:
            # LOGIN
            email = request.POST.get('logemail').lower().strip()
            password = request.POST.get('logpass')
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('inicio')
            else:
                return render(request, 'Reservas/login.html', {'error': 'Credenciales inválidas'})

        elif 'regemail' in request.POST:
            # REGISTRO
            name = request.POST.get('regname')
            email = request.POST.get('regemail').lower().strip()
            password = request.POST.get('regpass')

            if User.objects.filter(username=email).exists():
                return render(request, 'Reservas/login.html', {'error': 'Correo ya registrado'})

            user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
            login(request, user)
            return redirect('inicio')

    return render(request, 'Reservas/login.html')

def lista_espacios(request):
    espacios = Espacio.objects.all()
    return render(request, 'Reservas/lista_espacios.html', {'espacios': espacios})

def reservar_espacio(request):
    if request.method == 'POST':
        form = ReservaForm(request.POST)
        if form.is_valid():
            reserva = form.save(commit=False)
            conflictos = Reserva.objects.filter(
                espacio=reserva.espacio,
                fecha=reserva.fecha,
                hora_inicio__lt=reserva.hora_fin,
                hora_fin__gt=reserva.hora_inicio
            )
            if conflictos.exists():
                messages.error(request, 'Ya hay una reserva en ese horario.')
            else:
                # Opcional: si el usuario está logueado, usa su correo
                if request.user.is_authenticated:
                    reserva.nombre_usuario = request.user.email
                reserva.save()
                guardar_reserva_en_archivo(reserva)
                messages.success(request, 'Reserva realizada con éxito.')
                return redirect('inicio')
    else:
        form = ReservaForm()
    return render(request, 'Reservas/reservar.html', {'form': form})

def guardar_reserva_en_archivo(reserva):
    ruta = os.path.join('reservas.txt')
    with open(ruta, 'a') as archivo:
        archivo.write(
            f"{reserva.espacio.nombre}, {reserva.fecha}, {reserva.hora_inicio}-{reserva.hora_fin}, "
            f"{reserva.nombre_completo} ({reserva.nombre_usuario}) - {reserva.motivo}\n"
        )

def eliminar_reserva(request):
    correo = request.GET.get('correo', '').strip().lower()
    reservas = Reserva.objects.filter(nombre_usuario__iexact=correo).order_by('-fecha', '-hora_inicio')

    if request.method == 'POST':
        reserva_id = request.POST.get('reserva_id')
        Reserva.objects.filter(id=reserva_id, nombre_usuario__iexact=correo).delete()
        messages.success(request, 'Reserva eliminada exitosamente.')
        return redirect(f'/eliminar-reserva/?correo={correo}')

    return render(request, 'Reservas/eliminar_reserva.html', {
        'reservas': reservas,
        'correo': correo
     })

def ver_reservas(request):
    correo_usuario = request.GET.get('correo', '')
    year = int(request.GET.get('year', date.today().year))
    month = int(request.GET.get('month', date.today().month))

    if not (1 <= month <= 12 and 1900 <= year <= 2100):
        year = date.today().year
        month = date.today().month

    current_month_date = date(year, month, 1)
    prev_month_date = current_month_date - timedelta(days=1)
    next_month_date = current_month_date + timedelta(days=32)

    prev_month = prev_month_date.month
    prev_year = prev_month_date.year
    next_month = next_month_date.month
    next_year = next_month_date.year

    meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
    mes_nombre = meses[month - 1]

    primer_dia_semana, dias_en_mes = monthrange(year, month)
    reservas_mes = Reserva.objects.filter(fecha__year=year, fecha__month=month).order_by('hora_inicio')

    semanas = []
    semana = []
    offset = (primer_dia_semana + 1) % 7

    for _ in range(offset):
        semana.append({'numero': '', 'reservas': []})

    for dia_num in range(1, dias_en_mes + 1):
        fecha_actual = date(year, month, dia_num)
        reservas_dia = reservas_mes.filter(fecha=fecha_actual)
        reservas_list = []
        for reserva in reservas_dia:
            reservas_list.append({
                'espacio': reserva.espacio.nombre,
                'usuario': reserva.nombre_completo,
                'motivo': reserva.motivo,
                'hora_inicio': reserva.hora_inicio,
                'hora_fin': reserva.hora_fin,
                'tuyo': (request.user.is_authenticated and reserva.nombre_usuario == request.user.email) or (not request.user.is_authenticated and reserva.nombre_usuario == correo_usuario)
            })
        semana.append({
            'numero': dia_num,
            'fecha': fecha_actual,
            'hoy': fecha_actual == date.today(),
            'reservas': reservas_list
        })
        if len(semana) == 7:
            semanas.append(semana)
            semana = []

    if semana:
        while len(semana) < 7:
            semana.append({'numero': '', 'reservas': []})
        semanas.append(semana)

    return render(request, 'Reservas/ver_reservas.html', {
        'mes_nombre': mes_nombre,
        'year': year,
        'semanas': semanas,
        'correo_usuario': correo_usuario,
        'prev_month': prev_month,
        'prev_year': prev_year,
        'next_month': next_month,
        'next_year': next_year,
    })
