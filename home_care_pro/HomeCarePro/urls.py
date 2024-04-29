from django.urls import path, include
from . import views


urlpatterns = [
    path('home', views.UserView.as_view()),
    path('login', views.UserLogin.as_view()),
    path('signup', views.UserSignup.as_view()),
    path('services/', views.get_all_services),
    path('services/add/', views.add_service),
    path('services/<int:pk>/', views.update_service),
    path('services/<int:pk>/delete/', views.delete_service)
]
