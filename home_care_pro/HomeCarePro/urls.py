from django.urls import path, include
from .views import UserView
from .views import UserLogin
from .views import UserSignup

urlpatterns = [
    path('home', UserView.as_view()),
    path('login', UserLogin.as_view()),
    path('signup', UserSignup.as_view())
]
