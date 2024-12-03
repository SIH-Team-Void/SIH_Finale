from rest_framework import serializers
from .models import Doctor, Slot

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


# Check views or serializers for validation errors
class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot  # Replace with your actual model name
        fields = '__all__'

    def validate(self, data):
        # Custom validation example
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("Start time must be before end time.")
        return data
