from django.shortcuts import render
from rest_framework import generics, status
from .models import User
from .serializer import User_Serializer, User_Login
from rest_framework.views import APIView
from rest_framework.response import Response

class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User_Serializer

class User_Login(APIView):
    serializer_class = User_Login
    def post(self, request, format = None):
        user = False
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.username
            password = serializer.data.password
            querySet = User.objects.filter(username = username, password = password)

            # if querySet.exists(): # for room updating
            #     user = querySet[0]
            #     user.email = 'omaisafza225@gmail.com'
                
        return Response(User_Serializer(user), )
