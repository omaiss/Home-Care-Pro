from rest_framework import serializers
from .models import User

class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'user_type', 'full_name', 'contact_no', 'location')
        

class User_Login(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not User.check_username_exists(username):
            raise serializers.ValidationError({'username': 'User does not exist. Please sign up.'})

        user = User.objects.get(username=username)

        if not user.check_password(password):
            raise serializers.ValidationError({'password': 'Incorrect password.'})

        return attrs
        

class User_Signup(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'user_type', 'full_name', 'contact_no', 'location']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'validators': []},  # Ensure email is unique
            'username': {'validators': []},  # Ensure username is unique
            'contact_no': {'validators': []},  # Ensure contact_no is unique
        }

    def validate(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists'})
        if User.objects.filter(contact_no=attrs['contact_no']).exists():
            raise serializers.ValidationError({'contact_no': 'Contact number already exists'})
        return attrs
