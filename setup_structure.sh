#!/bin/bash

echo "🏗️  INICIANDO CREACIÓN DE ESTRUCTURA PROFESIONAL DJANGO + REACT..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para crear directorios
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}✅ Creado:${NC} $1"
    else
        echo -e "${YELLOW}⚠️  Ya existe:${NC} $1"
    fi
}

# Función para crear archivos
create_file() {
    if [ ! -f "$1" ]; then
        touch "$1"
        echo -e "${GREEN}✅ Creado:${NC} $1"
    else
        echo -e "${YELLOW}⚠️  Ya existe:${NC} $1"
    fi
}

# Crear estructura principal
echo -e "\n📁 CREANDO ESTRUCTURA DE CARPETAS..."

# Backend Structure
create_dir "backend"
create_dir "backend/GestionReservas"
create_dir "backend/GestionReservas/settings"
create_dir "backend/apps"
create_dir "backend/apps/core"
create_dir "backend/apps/core/migrations"
create_dir "backend/apps/usuarios"
create_dir "backend/apps/usuarios/migrations"
create_dir "backend/apps/reservas"
create_dir "backend/apps/reservas/migrations"
create_dir "backend/apps/reservas/api"
create_dir "backend/apps/api"
create_dir "backend/utils"
create_dir "backend/requirements"

# Frontend Structure
create_dir "frontend"
create_dir "frontend/public"
create_dir "frontend/src"
create_dir "frontend/src/components"
create_dir "frontend/src/components/common"
create_dir "frontend/src/components/common/Layout"
create_dir "frontend/src/components/common/Navbar"
create_dir "frontend/src/components/common/Footer"
create_dir "frontend/src/components/common/Loading"
create_dir "frontend/src/components/forms"
create_dir "frontend/src/components/forms/FormField"
create_dir "frontend/src/components/forms/DatePicker"
create_dir "frontend/src/components/forms/ValidatedInput"
create_dir "frontend/src/components/ui"
create_dir "frontend/src/components/ui/Button"
create_dir "frontend/src/components/ui/Modal"
create_dir "frontend/src/components/ui/Table"
create_dir "frontend/src/pages"
create_dir "frontend/src/pages/Login"
create_dir "frontend/src/pages/Dashboard"
create_dir "frontend/src/pages/Reservas"
create_dir "frontend/src/pages/Reservas/CrearReserva"
create_dir "frontend/src/pages/Reservas/ListaReservas"
create_dir "frontend/src/pages/Reservas/EditarReserva"
create_dir "frontend/src/pages/Profile"
create_dir "frontend/src/services"
create_dir "frontend/src/hooks"
create_dir "frontend/src/context"
create_dir "frontend/src/utils"
create_dir "frontend/src/styles"

# Otros directorios
create_dir "docs"
create_dir "scripts"
create_dir "config"
create_dir "config/nginx"
create_dir "config/docker"

echo -e "\n📄 CREANDO ARCHIVOS DE CONFIGURACIÓN..."

# Backend - Archivos Python
create_file "backend/__init__.py"
create_file "backend/GestionReservas/__init__.py"
create_file "backend/GestionReservas/wsgi.py"
create_file "backend/GestionReservas/urls.py"
create_file "backend/GestionReservas/settings/__init__.py"
create_file "backend/GestionReservas/settings/base.py"
create_file "backend/GestionReservas/settings/development.py"
create_file "backend/GestionReservas/settings/production.py"

# Apps Core
create_file "backend/apps/__init__.py"
create_file "backend/apps/core/__init__.py"
create_file "backend/apps/core/models.py"
create_file "backend/apps/core/serializers.py"
create_file "backend/apps/core/admin.py"
create_file "backend/apps/core/apps.py"
create_file "backend/apps/core/migrations/__init__.py"

# Apps Usuarios
create_file "backend/apps/usuarios/__init__.py"
create_file "backend/apps/usuarios/models.py"
create_file "backend/apps/usuarios/serializers.py"
create_file "backend/apps/usuarios/views.py"
create_file "backend/apps/usuarios/urls.py"
create_file "backend/apps/usuarios/admin.py"
create_file "backend/apps/usuarios/apps.py"
create_file "backend/apps/usuarios/migrations/__init__.py"

# Apps Reservas
create_file "backend/apps/reservas/__init__.py"
create_file "backend/apps/reservas/models.py"
create_file "backend/apps/reservas/serializers.py"
create_file "backend/apps/reservas/views.py"
create_file "backend/apps/reservas/urls.py"
create_file "backend/apps/reservas/admin.py"
create_file "backend/apps/reservas/apps.py"
create_file "backend/apps/reservas/services.py"
create_file "backend/apps/reservas/permissions.py"
create_file "backend/apps/reservas/api/__init__.py"
create_file "backend/apps/reservas/api/viewsets.py"
create_file "backend/apps/reservas/api/urls.py"
create_file "backend/apps/reservas/migrations/__init__.py"

# API Global
create_file "backend/apps/api/__init__.py"
create_file "backend/apps/api/urls.py"
create_file "backend/apps/api/versioning.py"

# Utils
create_file "backend/utils/__init__.py"
create_file "backend/utils/constants.py"
create_file "backend/utils/helpers.py"
create_file "backend/utils/validators.py"

# Requirements
create_file "backend/requirements/base.txt"
create_file "backend/requirements/development.txt"
create_file "backend/requirements/production.txt"

# Frontend - Archivos JavaScript/React
create_file "frontend/public/index.html"
create_file "frontend/public/manifest.json"
create_file "frontend/public/robots.txt"

create_file "frontend/src/App.js"
create_file "frontend/src/App.css"
create_file "frontend/src/index.js"
create_file "frontend/src/index.css"

# Services
create_file "frontend/src/services/api.js"
create_file "frontend/src/services/authService.js"
create_file "frontend/src/services/reservasService.js"
create_file "frontend/src/services/interceptors.js"

# Hooks
create_file "frontend/src/hooks/useAuth.js"
create_file "frontend/src/hooks/useApi.js"
create_file "frontend/src/hooks/useReservas.js"

# Context
create_file "frontend/src/context/AuthContext.js"
create_file "frontend/src/context/AppContext.js"

# Utils
create_file "frontend/src/utils/constants.js"
create_file "frontend/src/utils/formatters.js"
create_file "frontend/src/utils/validators.js"

# Styles
create_file "frontend/src/styles/globals.css"
create_file "frontend/src/styles/components.css"
create_file "frontend/src/styles/variables.css"

# Configuración del proyecto
create_file "backend/manage.py"
create_file "backend/requirements.txt"
create_file "frontend/package.json"
create_file "frontend/.env.example"
create_file "docker-compose.yml"
create_file ".gitignore"
create_file "README.md"
create_file ".env.example"

# Scripts
create_file "scripts/deploy.sh"
create_file "scripts/backup_db.sh"
create_file "scripts/setup_env.sh"

# Documentación
create_file "docs/api.md"
create_file "docs/setup.md"
create_file "docs/deployment.md"

# Configuraciones
create_file "config/nginx/nginx.conf"
create_file "config/docker/Dockerfile.backend"
create_file "config/docker/Dockerfile.frontend"
create_file "config/docker/docker-compose.yml"

echo -e "\n📝 GENERANDO CONTENIDO DE ARCHIVOS CLAVE..."

# Crear manage.py
cat > backend/manage.py << 'EOF'
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "GestionReservas.settings.development")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable?"
        ) from exc
    execute_from_command_line(sys.argv)
EOF

# Crear requirements base
cat > backend/requirements/base.txt << 'EOF'
Django==5.2.2
djangorestframework==3.14.0
django-cors-headers==4.3.1
python-dotenv==1.0.0
EOF

# Crear package.json básico
cat > frontend/package.json << 'EOF'
{
  "name": "gestion-reservas-frontend",
  "version": "1.0.0",
  "description": "Frontend React para GestionReservas",
  "main": "src/index.js",
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.5.0",
    "react-router-dom": "^6.15.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# Crear .gitignore
cat > .gitignore << 'EOF'
# Django
*.pyc
__pycache__/
*.sqlite3
*.log
media/
staticfiles/

# React
node_modules/
build/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment variables
.env
EOF

echo -e "\n🎉 ESTRUCTURA COMPLETADA!"
echo -e "📋 PRÓXIMOS PASOS:"
echo -e "1. ${YELLOW}cd backend${NC}"
echo -e "2. ${YELLOW}pip install -r requirements/base.txt${NC}"
echo -e "3. ${YELLOW}cd ../frontend && npm install${NC}"
echo -e "4. ${YELLOW}Mueve tu código actual a la nueva estructura${NC}"
echo -e "5. ${YELLOW}Configura las variables de entorno${NC}"

echo -e "\n${GREEN}✅ ¡Estructura profesional creada exitosamente!${NC}"