from django.shortcuts import render
from rest_framework import generics, status
from .models import User, Services
from .serializer import User_Serializer, User_Login, User_Signup, ServicesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view


class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User_Serializer


class UserLogin(APIView):
    serializer_class = User_Login

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            user = User.objects.get(username=user_data['username'])
            return Response({
                'username': user.username,
                'email': user.email,
                'user_type': user.user_type,
                'full_name': user.full_name,
                'contact_no': user.contact_no,
                'location': user.location
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
    
class UserSignup(APIView):
    serializer_class = User_Signup

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
def get_all_services(request):
    services = Services.objects.all()
    serializer = ServicesSerializer(services, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_service(request):
    serializer = ServicesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_service(request, pk):
    try:
        service = Services.objects.get(pk=pk)
    except Services.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ServicesSerializer(service, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_service(request, pk):
    try:
        service = Services.objects.get(pk=pk)
    except Services.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    service.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)