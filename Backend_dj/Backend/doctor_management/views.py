from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Doctor, Slot, OPDBooking, WalkInSlot
from .serializers import (
    DoctorSerializer,
    SlotSerializer,
    OPDBookingSerializer,
    WalkInSlotSerializer
)
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import action
import json


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
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

    def partial_update(self, request, pk=None):
        try:
            booking = OPDBooking.objects.get(pk=pk)
            serializer = OPDBookingSerializer(booking, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except OPDBooking.DoesNotExist:
            return Response({'detail': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        try:
            booking = OPDBooking.objects.get(pk=pk)
            booking.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except OPDBooking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, booking_id):
        try:
            booking = OPDBooking.objects.get(booking_id=booking_id)
            booking.patient_name = request.data.get('patient_name')
            booking.is_booked = request.data.get('is_booked', False)
            booking.save()
            return Response({"message": "Booking updated successfully"}, status=status.HTTP_200_OK)
        except OPDBooking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

class WalkInSlotAPIView(viewsets.ModelViewSet):
    queryset = WalkInSlot.objects.all()
    serializer_class = WalkInSlotSerializer


@api_view(['POST', 'GET'])
def manage_walkin(request):
    if request.method == "POST":
        try:
            data = request.data
            doctor_id = data.get("doctor_id")
            patient_name = data.get("patient_name")

            if not doctor_id or not patient_name:
                return Response(
                    {"error": "Doctor and patient name are required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if patient is already in the queue for the same day
            today = timezone.now().date()
            existing_patient = WalkInSlot.objects.filter(
                doctor_id=doctor_id, patient_name__iexact=patient_name, date=today
            ).first()

            if existing_patient:
                return Response(
                    {
                        "error": "Patient already in queue",
                        "token_number": existing_patient.token_number,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Retrieve the doctor instance
            doctor = Doctor.objects.get(pk=doctor_id)

            # Create the new WalkInSlot instance
            walkin = WalkInSlot.objects.create(
                doctor=doctor, 
                patient_name=patient_name,
                token_number=WalkInSlot.objects.filter(doctor=doctor, date=today).count() + 1,  # Generate token number
                date=today
            )

            return Response(
                {
                    "message": "Walk-in added successfully",
                    "walkin_id": walkin.walkin_id,
                    "token_number": walkin.token_number,
                },
                status=status.HTTP_201_CREATED,
            )
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        try:
            doctor_id = request.query_params.get("doctor_id")
            department = request.query_params.get("department")
            today = timezone.now().date()

            queryset = WalkInSlot.objects.filter(date=today)

            if doctor_id and doctor_id != 'all':
                queryset = queryset.filter(doctor_id=doctor_id)
            if department and department != 'All':
                queryset = queryset.filter(doctor__department=department)

            walkin_data = [
                {
                    "walkin_id": walkin.walkin_id,
                    "doctor_name": f"Dr. {walkin.doctor.doctor_name}",
                    "patient_name": walkin.patient_name,
                    "token_number": walkin.token_number,
                    "date": walkin.date.strftime("%Y-%m-%d"),
                    "department": walkin.doctor.department,
                }
                for walkin in queryset
            ]
            return Response({"walkins": walkin_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def walkin_list(request):
    fetch_all = request.query_params.get('fetch_all', False)
    doctor_id = request.query_params.get('doctor_id')

    if fetch_all:
        walkins = WalkInSlot.objects.all().order_by('-date')
    elif doctor_id:
        walkins = WalkInSlot.objects.filter(doctor_id=doctor_id).order_by('-date')
    else:
        walkins = WalkInSlot.objects.none()

    serializer = WalkInSlotSerializer(walkins, many=True)
    return Response({'walkins': serializer.data}, status=status.HTTP_200_OK)

