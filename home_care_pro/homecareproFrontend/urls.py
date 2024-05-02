from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
<<<<<<< HEAD
    path('del_service', index),
    path("home", index),
    path('login', index)
=======
    path('home', index),
    path('join', index)
>>>>>>> 6be967b2e9ec7fbce4a27b830eb950a71f8411f1
]
