from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Doctor, Slot, OPDBooking
from .serializers import DoctorSerializer, SlotSerializer, OPDBookingSerializer
from datetime import datetime
from rest_framework.decorators import action
from django.http import JsonResponse
from rest_framework.decorators import api_view
from api.views import HospitalRegistrationView

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
        else:
            bookings = OPDBooking.objects.all()

        serializer = OPDBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            booking = OPDBooking.objects.get(pk=pk)
            serializer = OPDBookingSerializer(booking)
            return Response(serializer.data)
        except OPDBooking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)

    # Use this method to handle PATCH requests
    def partial_update(self, request, pk=None):
        try:
            booking = OPDBooking.objects.get(pk=pk)
            serializer = OPDBookingSerializer(booking, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        
        except OPDBooking.DoesNotExist:
            return Response({'detail': 'Booking not found.'}, status=404)
        except Exception as e:
            return Response({'detail': str(e)}, status=400)
