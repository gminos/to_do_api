from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterCreateAPIView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = router.urls
