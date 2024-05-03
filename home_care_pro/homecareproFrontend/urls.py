from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('del_service', index),
    path("home", index),
    path('login', index),
    path('add_service', index)

]
