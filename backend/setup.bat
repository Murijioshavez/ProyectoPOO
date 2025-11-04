@echo off
setlocal enabledelayedexpansion
echo 🚀 Iniciando configuración del entorno Django en Windows...

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no está instalado o no está en el PATH.
    pause
    exit /b
)

REM Crear entorno virtual
echo 📦 Creando entorno virtual...
python -m venv venv

REM Activar entorno virtual
echo 🔑 Activando entorno virtual...
call venv\Scripts\activate

REM Actualizar pip
echo ⬆️  Actualizando pip...
python -m pip install --upgrade pip

REM Instalar dependencias
echo 📚 Instalando dependencias...
pip install -r requirements.txt

REM Crear archivo .env si no existe
if not exist ".env" (
    echo 🧩 Creando archivo .env base...
    set "RANDOM_KEY="
    for /f "delims=" %%a in ('python -c "import secrets; print(secrets.token_urlsafe(32))"') do set "RANDOM_KEY=%%a"
    (
        echo DEBUG=True
        echo SECRET_KEY=!RANDOM_KEY!
        echo ALLOWED_HOSTS=*
    ) > .env
    echo ✅ Archivo .env generado.
)

echo ✅ Entorno Django configurado correctamente.
echo.
pause
