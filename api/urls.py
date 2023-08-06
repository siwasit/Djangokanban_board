from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisterAPIView.as_view(), name='register'),
    path('login/', views.UserLoginAPIView.as_view(), name='login'),
    path('logout/', views.UserLogoutAPIView.as_view(), name='logout'),
    path('projects/', views.ProjectListCreateAPIView.as_view(), name='project-list-create'),
    path('<int:pk>/', views.ProjectDetailAPIView.as_view(), name='project-detail'),
    path('projects/<int:project_id>/', views.CardListCreateAPIView.as_view(), name='card-list-create'),
    path('projects/<int:project_id>/<int:pk>/', views.CardDetailAPIView.as_view(), name='card-detail'),

    path('user/<int:user_id>/card/', views.get_cards_for_user, name='user-cards'),
]

