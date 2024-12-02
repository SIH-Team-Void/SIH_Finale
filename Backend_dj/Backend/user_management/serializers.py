from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'phone_no', 'password', 'gender', 'blood_group', 'date_of_birth', 'role']
        extra_kwargs = {
            'email': {'required': False},
            'gender': {'required': False},
            'blood_group': {'required': False},
            'date_of_birth': {'required': False},
            'role': {'required': False}
        }

    def validate(self, data):
        # You can add other validation logic here if necessary, but there's no need for confirm_password now
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
