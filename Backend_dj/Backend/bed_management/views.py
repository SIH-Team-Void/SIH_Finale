from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Ward, Bed
from .serializers import WardSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from api.models import Hospital
class WardAddView(APIView):
    def post(self, request, hosp_id):  # Changed from hosp_ID 
        try:
            ward_data = {
                **request.data,
                'hospital': hosp_id
            }
            serializer = WardSerializer(data=ward_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=404)

    def get(self, request, hosp_id):  # Changed from hosp_ID
        wards = Ward.objects.filter(hospital=hosp_id)
        serializer = WardSerializer(wards, many=True)
        return Response(serializer.data)

class WardListView(APIView):
   def get(self, request, hosp_id):
       wards = Ward.objects.filter(hospital=hosp_id).prefetch_related('beds')
       serializer = WardSerializer(wards, many=True)
       return Response(serializer.data, status=status.HTTP_200_OK)

class BedStatusUpdateView(APIView):
   def put(self, request, hosp_id):
       bed_id = request.data.get('bed_id')
       new_status = request.data.get('status')

       if new_status not in ['vacant', 'occupied', 'maintenance']:
           return Response({'error': 'Invalid status'}, status=400)

       try:
           bed = Bed.objects.select_related('ward').get(
               id=bed_id,
               ward__hospital=hosp_id
           )
           bed.status = new_status
           bed.save()
           return Response({'message': 'Status updated'}, status=200)
       except Bed.DoesNotExist:
           return Response({'error': 'Bed not found'}, status=404)        
        
@csrf_exempt          
def update_bed_status(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            bed_id = data.get('bed_id')
            new_status = data.get('status')

            if not bed_id or not new_status:
                return JsonResponse({'error': 'Invalid data'}, status=400)

            if new_status not in ['vacant', 'occupied', 'maintenance']:
                return JsonResponse({'error': 'Invalid status'}, status=400)

            try:
                bed = Bed.objects.get(id=bed_id)
                bed.status = new_status
                bed.save()
                return JsonResponse({'message': 'Bed status updated successfully'}, status=200)
            except Bed.DoesNotExist:
                return JsonResponse({'error': 'Bed not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
