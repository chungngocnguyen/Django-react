from rest_framework.permissions import IsAuthenticated
from .serializers import TodoSerializer
from .models import Todo
from rest_framework import viewsets

  
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

