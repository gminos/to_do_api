from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        task = self.get_object()
        Task.objects.filter(id=task.id).update(is_completed=not task.is_completed)
        task.refresh_from_db()
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
