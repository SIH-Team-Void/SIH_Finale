from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Doctor, Slot, OPDBooking
from .serializers import DoctorSerializer, SlotSerializer, OPDBookingSerializer
from datetime import datetime, timedelta
import calendar

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer

class OPDBookingViewSet(viewsets.ModelViewSet):
    queryset = OPDBooking.objects.all()
    serializer_class = OPDBookingSerializer