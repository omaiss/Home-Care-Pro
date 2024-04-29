from django.db import models
import string, random

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=[('home owner', 'Home Owner'), ('service provider', 'Service Provider')])
    full_name = models.CharField(max_length=50)
    contact_no = models.CharField(max_length=20)    
    location = models.CharField(max_length=100)

    def check_password(self, password):
        return self.password == password

    @classmethod
    def check_username_exists(cls, username):
        return cls.objects.filter(username=username).exists()
