# todos/urls.py
from django.urls import path

from . import views




urlpatterns = [
    path('', views.ListTodo.as_view()),
    path('<int:pk>/', views.DetailTodo.as_view()),
    path('price/',views.stock_price),
     path('price1/',views.PriceALL.as_view()),
    path('auth/register/',views.RegistrationAPI.as_view()),
    path('auth/login/',views.LoginAPI.as_view()),
    path('auth/user/',views.UserAPI.as_view()),
    path('auth/check',views.check),


]