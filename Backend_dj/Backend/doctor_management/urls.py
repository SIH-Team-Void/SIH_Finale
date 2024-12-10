from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, SlotViewSet, OPDBookingViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'slots', SlotViewSet)
router.register(r'bookings', OPDBookingViewSet, basename='booking')

urlpatterns = [
    path('<int:pk>/',  OPDBookingViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
    path('', include(router.urls)),
]
