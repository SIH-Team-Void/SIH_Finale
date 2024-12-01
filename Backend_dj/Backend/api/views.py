# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Hospital
# from .serializers import HospitalRegistrationSerializer

# class HospitalRegistrationView(APIView):
#     def get(self, request):
#         # Get all hospitals
#         hospitals = Hospital.objects.all()  # Fetch all hospitals from the database
#         serializer = HospitalRegistrationSerializer(hospitals, many=True)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     def post(self, request):
#         # Handle the hospital registration logic
#         serializer = HospitalRegistrationSerializer(data=request.data)
        
#         if serializer.is_valid():
#             # Save the hospital registration
#             serializer.save()
#             return Response({
#                 'message': 'Hospital registered successfully',
#                 'hospital_id': serializer.data['hosp_ID']
#             }, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password, check_password

from .models import Hospital
from .serializers import HospitalRegistrationSerializer

class HospitalRegistrationView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Get all hospitals
        hospitals = Hospital.objects.all()  # Fetch all hospitals from the database
        serializer = HospitalRegistrationSerializer(hospitals, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Handle the hospital registration logic
        # Create a copy of the request data to modify password
        registration_data = request.data.copy()
        
        # Hash the password before saving
        if 'hosp_password' in registration_data:
            registration_data['hosp_password'] = make_password(registration_data['hosp_password'])
        
        serializer = HospitalRegistrationSerializer(data=registration_data)
        
        if serializer.is_valid():
            # Save the hospital registration
            serializer.save()
            return Response({
                'message': 'Hospital registered successfully',
                'hospital_id': serializer.data['hosp_ID']
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HospitalLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Hospital login logic
        hosp_id = request.data.get('hosp_id')
        hosp_email = request.data.get('hosp_email')
        hosp_password = request.data.get('hosp_password')
        
        # Validate input
        if not all([hosp_id, hosp_email, hosp_password]):
            return Response({
                'error': 'Hospital ID, Email, and Password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Find hospital by ID and email
            hospital = Hospital.objects.get(hosp_ID=hosp_id, hosp_email=hosp_email)
        except Hospital.DoesNotExist:
            return Response({
                'error': 'Invalid Hospital ID or Email'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Check password
        if check_password(hosp_password, hospital.hosp_password):
            return Response({
                'message': 'Login successful',
                'hospital_name': hospital.hosp_name,
                'hospital_id': hospital.hosp_ID
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid password'
            }, status=status.HTTP_401_UNAUTHORIZED)