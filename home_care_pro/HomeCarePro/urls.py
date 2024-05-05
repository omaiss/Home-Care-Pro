from django.urls import path, include
from . import views


# complete url for these pages: 127.0.0.1:8000/homecarepro/<string>
# choose string from below:
urlpatterns = [
    path('users', views.UserView.as_view()),
    path('login', views.UserLoginView.as_view()),
    path('update_account', views.UserUpdateView.as_view()),
    path('signup', views.UserSignupView.as_view()),
    path('services/add_service', views.AddServices.as_view()),
    path('services/view_service', views.ServicesView.as_view()),
    path('services/delete_service/<int:service_id>/', views.ServicesDeleteView.as_view(), name = 'delete_service'), 
    path('feedback/add_feedback', views.AddFeedbackView.as_view()),
    path('feedback/view_feedback', views.FeedbackView.as_view()),
    path('jobs/add_jobs', views.AddJobView.as_view()),
    path('jobs/view_jobs/<int:homeowner_id>/', views.JobView.as_view(), name='view_jobs'),
    path('payments/view_payments', views.PaymentView.as_view()),
    path('payments/add_payments', views.AddPaymentView.as_view()),
    path('services/search_service', views.SearchServices.as_view()),
    path('jobs/all_jobs', views.AllJobsView.as_view(), name='all_jobs'),
    path('jobs/complete_job/<int:job_id>', views.CompleteJobView.as_view(), name='complete_job'),

]
