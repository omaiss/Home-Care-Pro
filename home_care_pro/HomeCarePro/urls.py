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
    path('services/delete_service', views.ServicesDeleteView.as_view()), 
    path('feedback/add_feedback', views.AddFeedbackView.as_view()),
    path('feedback/view_feedback', views.FeedbackView.as_view()),
    path('jobs/add_jobs', views.AddJobView.as_view()),
    path('jobs/view_jobs', views.JobView.as_view()),
    path('payments/view_payments', views.PaymentView.as_view()),
    path('payments/add_payments', views.AddPaymentView.as_view())
]
