from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)  # Standard user CRUD actions

urlpatterns = [
    path('', include(router.urls)),  # Include the rest of the viewset actions
]
