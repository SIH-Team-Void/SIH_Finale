from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Doctor, Slot, OPDBooking
from .serializers import DoctorSerializer, SlotSerializer, OPDBookingSerializer
from datetime import datetime
from rest_framework.decorators import action
from django.http import JsonResponse

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer

class OPDBookingViewSet(viewsets.ViewSet):
    def list(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date = request.query_params.get('date')

        print(f"Received request: doctor_id={doctor_id}, date={date}")

        if doctor_id and date:
            bookings = OPDBooking.objects.filter(doctor_id=doctor_id, date=date)
            serializer = OPDBookingSerializer(bookings, many=True)
            return Response(serializer.data)
        else:
            return Response([])