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
    class Meta:
        model = Services
        fields = ('id', 'title', 'description', 'price_per_hour', 'status', 'service_provider')


class ServiceDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id')
    

