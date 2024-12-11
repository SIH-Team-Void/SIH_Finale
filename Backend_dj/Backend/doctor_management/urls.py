from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, SlotViewSet, OPDBookingViewSet, manage_walkin, WalkInSlotAPIView 

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'slots', SlotViewSet)
router.register(r'bookings', OPDBookingViewSet, basename='booking')
# router.register(r'token-trackers', DoctorTokenTrackerViewSet)

# router.register(r'WalkInSlot', mana)

urlpatterns = [
    # path('update-token/', update_token, name='update-token'),
    path('<int:pk>/',  OPDBookingViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
    path('walkin/', manage_walkin, name='manage_walkin'),
    path('', include(router.urls)),
]

