from rest_framework import serializers
from .models import User, Services, Job, Feedback, Payment


class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'user_type', 'full_name', 'contact_no', 'location')
  
  
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
          

class ServicesSerializer(serializers.ModelSerializer):
    service_provider = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Services
        fields = ('id', 'title', 'description', 'price_per_hour', 'status', 'service_provider')


class ServiceDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id')
    

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'job', 'rating', 'comment', 'timestamp')
        

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'homeowner', 'service_provider', 'date', 'start_time', 'end_time', 'job_details', 'status')
        

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'user', 'payment_method', 'card_number', 'expiry_date', 'cvv')
        