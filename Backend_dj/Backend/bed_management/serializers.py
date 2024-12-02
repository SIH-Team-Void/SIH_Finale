# from rest_framework import serializers
# from .models import Ward

# class WardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ward
#         fields = [ 'ward_name', 'no_of_beds', 'cost', 'ward_img', 'ward_details'
#             ] 
        
#     def get_beds(self, obj):
#         # Assuming you have a Bed model related to Ward
#         # If not, you'll need to create one
#         return [
#             {
#                 'bed_id': bed.id,
#                 'status': bed.status
#             } for bed in obj.beds.all()
#         ]
        
        
        
from rest_framework import serializers
from .models import Ward, Bed

class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bed
        fields = ['id', 'status']

class WardSerializer(serializers.ModelSerializer):
    beds = BedSerializer(many=True)  # Serialize related beds

    class Meta:
        model = Ward
        fields = ['id', 'ward_name','no_of_beds', 'beds']