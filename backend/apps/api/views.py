from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def obtener_usuarios(request):
    data = [
        {"id": 1, "nombre": "Mauricio", "rol": "admin"},
        {"id": 2, "nombre": "Camila", "rol": "developer"},
    ]
    return Response(data)