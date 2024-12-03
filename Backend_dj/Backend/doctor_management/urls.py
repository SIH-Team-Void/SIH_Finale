from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, SlotViewSet, OPDBookingViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'slots', SlotViewSet)
router.register(r'bookings', OPDBookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]



