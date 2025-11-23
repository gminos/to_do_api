from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter ,filters.OrderingFilter]
    filterset_fields = ['is_complete', 'priority']
    search_fields = ['^title']
    ordering_fields = ['due_date', 'created_at']
    ordering = ['is_complete', 'due_date', 'priority']

    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        task = self.get_object()
        Task.objects.filter(id=task.id).update(is_complete=not task.is_complete)
        task.refresh_from_db()
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
