from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets, filters, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from task.serializers import TaskSerializer, UserSerializer
from task.models import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_complete', 'priority']
    search_fields = ['^title']
    ordering_fields = ['due_date', 'created_at']
    ordering = ['is_complete', 'due_date', 'priority']

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        task = self.get_object()
        Task.objects.filter(id=task.id).update(is_complete=not task.is_complete)
        task.refresh_from_db()
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
