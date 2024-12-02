from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Ward, Bed
from .serializers import WardSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

class WardAddView(APIView):
    def post(self, request):
        # Create ward and automatically create beds
        ward_data = request.data
        no_of_beds = int(ward_data.get('no_of_beds'))
        
        # Create Ward
        ward = Ward.objects.create(
            ward_name=ward_data['ward_name'],
            no_of_beds=no_of_beds,
            cost=ward_data['cost'],
            ward_details=ward_data['ward_details']
        )
        
        # Create Beds for the Ward
        for i in range(1, no_of_beds + 1):
            Bed.objects.create(
                id=f"{ward.ward_name}-{i}",
                ward=ward
            )
        
        serializer = WardSerializer(ward)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



# class WardListView(APIView):
#     permission_classes = [AllowAny]
    
#     def get(self, request):
#         # Retrieve all Ward objects from the database
#         wards = Ward.objects.all()
        
#         # Serialize the queryset (many=True for multiple objects)
#         serializer = WardSerializer(wards, many=True)

class WardListView(APIView):
    def get(self, request):
        wards = Ward.objects.prefetch_related('beds')  # Optimize query
        serializer = WardSerializer(wards, many=True)
        return Response(serializer.data)
        
        # Return the serialized data
        return Response({
            'message': 'Wards retrieved successfully',
            'wards': serializer.data
        }, status=status.HTTP_200_OK)
        
class BedStatusUpdateView(APIView):
    def put(self, request):
        ward_id = request.data.get('ward_id')
        bed_id = request.data.get('bed_id')
        new_status = request.data.get('status')
        
        try:
            bed = Bed.objects.get(id=bed_id, ward_id=ward_id)
            bed.status = new_status
            bed.save()
            
            return Response({'message': 'Bed status updated successfully'}, 
                            status=status.HTTP_200_OK)
        except Bed.DoesNotExist:
            return Response({'error': 'Bed not found'}, 
                            status=status.HTTP_404_NOT_FOUND)

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
