from django.urls import path, include
from . import views


# complete url for these pages: 127.0.0.1:8000/homecarepro/<string>
# choose string from below:
urlpatterns = [
    path('users', views.UserView.as_view()),
    path('login', views.UserLoginView.as_view()),
    path('signup', views.UserSignupView.as_view()),
    path('services/add_service', views.AddServices.as_view()),
    path('services/view_service', views.ServicesView.as_view()),
    path('services/delete_service', views.ServicesDeleteView.as_view())
]
