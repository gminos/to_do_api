from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from task.models import Task

class TaskTests(APITestCase):
    def setUp(self):
        # Crear dos usuarios para probar la privacidad
        self.user1 = User.objects.create_user(username='user1', password='password123')
        self.user2 = User.objects.create_user(username='user2', password='password123')
        
        # URLs
        self.tasks_url = reverse('task-list')

    def test_create_task_authenticated(self):
        """
        Verificar que un usuario autenticado puede crear una tarea
        y que se le asigna automáticamente como owner.
        """
        self.client.force_authenticate(user=self.user1)
        data = {'title': 'Comprar leche', 'priority': 1}
        response = self.client.post(self.tasks_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Comprar leche')
        self.assertEqual(Task.objects.get().owner, self.user1)

    def test_user_can_only_see_own_tasks(self):
        """
        Verificar que el usuario 1 no puede ver las tareas del usuario 2.
        """
        # Crear una tarea para cada usuario
        Task.objects.create(owner=self.user1, title="Tarea de User 1")
        Task.objects.create(owner=self.user2, title="Tarea de User 2")

        # Autenticarse como User 1
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.tasks_url)

        # Debería ver solo 1 tarea (la suya)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Como hay paginación, las tareas están en 'results'
        self.assertEqual(len(response.data['results']), 1) 
        self.assertEqual(response.data['results'][0]['title'], "Tarea de User 1")

    def test_unauthenticated_user_cannot_access(self):
        """
        Verificar que un usuario anónimo no puede ver ni crear tareas.
        """
        response = self.client.get(self.tasks_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.post(self.tasks_url, {'title': 'Intento hacker'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
