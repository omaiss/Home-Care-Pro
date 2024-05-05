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


class Services(models.Model):
    service_provider = models.ForeignKey(User, related_name='service_provider', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    price_per_hour = models.FloatField()
    status = models.CharField(default='Active', max_length=20, choices=[('active', 'Active'), ('inactive', 'InActive')])
    

class Job(models.Model):
    homeowner = models.ForeignKey(User, related_name='homeowner_jobs', on_delete=models.CASCADE)
    service_provider = models.ForeignKey(User, related_name='service_provider_jobs', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    job_details = models.TextField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed')])


class Feedback(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Services, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=[('cash', 'Cash'), ('credit_card', 'Credit Card')])
    card_number = models.CharField(max_length=16, null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    cvv = models.CharField(max_length=3, null=True, blank=True)
    