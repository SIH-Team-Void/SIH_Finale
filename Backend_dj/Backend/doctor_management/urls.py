from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, SlotViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'slots', SlotViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

