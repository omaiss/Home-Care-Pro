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

    # def query(self, ):
        # if User.objects.filter(name=name).count() == 0?1:0


