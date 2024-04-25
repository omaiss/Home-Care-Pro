from django.db import models

# Create your models here.
class HomeCarePro(models.Model):
    ID = models.CharField(max_length=5, unique=True, default='')
    