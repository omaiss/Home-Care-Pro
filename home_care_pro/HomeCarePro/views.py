from django.shortcuts import render
from rest_framework import generics, status
from .models import User, Services, Feedback, Job, Payment
from .serializer import User_Serializer, UserLoginSerializer, ServicesSerializer, ServiceDeleteSerializer, FeedbackSerializer, JobSerializer, PaymentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view


class UserView(APIView):
    serializer_class = User_Serializer
    
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)


class UserUpdateView(APIView):
    serializer_class = User_Serializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        user_id = request.data.get('id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            user = User.objects.get(username=username,password=password)
            if user is not None:
                return JsonResponse(User_Serializer(user).data, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
class UserSignupView(APIView):
    serializer_class = User_Serializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailView(APIView):
    serializer_class = User_Serializer
            
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = self.serializer_class(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServicesView(APIView):
    serializer_class = ServicesSerializer
     
    def get(self, request, format=None):
        services = Services.objects.all()
        serializer = self.serializer_class(services, many=True)
        return Response(serializer.data)


class AddServices(APIView):
    serializer_class = ServicesSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():            
            serializer.service_provider = request.user
            service = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class ServicesDeleteView(APIView):
    serializer_class = ServiceDeleteSerializer
    
    def delete(self, request, service_id, format=None):
        try:
            service = Services.objects.get(id=service_id)
            service.delete()
            return Response({'success': True, 'message': 'Service deleted successfully'})
        except Services.DoesNotExist:
            return Response({'success': False, 'error': 'Service does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FeedbackView(APIView):
    serializer_class = FeedbackSerializer
    def get(self, request, format=None):
        feedback = Feedback.objects.all()
        serializer = self.serializer_class(feedback, many=True)
        return Response(serializer.data)


class AddFeedbackView(APIView):
    serializer_class = FeedbackSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class JobView(APIView):
    serializer_class = JobSerializer
    
    def get(self, request, format=None):
        jobs = Job.objects.all()
        serializer = self.serializer_class(jobs, many=True)
        return Response(serializer.data)


class AddJobView(APIView):
    serializer_class = JobSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class PaymentView(APIView):
    serializer_class = PaymentSerializer
    
    def get(self, request, format=None):
        payments = Payment.objects.all()
        serializer = self.serializer_class(payments, many=True)
        return Response(serializer.data)


class AddPaymentView(APIView):
    serializer_class = PaymentSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
