from django.urls import path,include
from . import views
# from rest_framework.routers import DefaultRouter
# from .views import TodoViewSet


urlpatterns = [
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('create/', views.RegisterView.as_view(),name="register"),
]