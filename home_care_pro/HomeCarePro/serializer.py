from rest_framework import serializers
from .models import User

class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'user_type', 'full_name', 'contact_no', 'location')

class User_Login(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
