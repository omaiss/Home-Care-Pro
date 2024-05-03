from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('del_service', index),
    path('payment', index)
]
