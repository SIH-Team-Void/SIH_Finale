from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import UserUpdateSerializer
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if User.objects.filter(phone_no=serializer.validated_data['phone_no']).exists():
                return Response({'message': 'Phone number already registered'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(password=make_password(serializer.validated_data['password']))
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        phone_no = request.data.get('phone_no')
        password = request.data.get('password')

        if not phone_no or not password:
            return Response(
                {'error': 'Phone number and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=phone_no, password=password)

        if user:
            return Response({
                'user_id': user.id,
                'username': user.username,
                'role': user.role,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)

        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
class UserUpdateViewSet(viewsets.ModelViewSet):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
