from django.urls import path
from .views import (
    PhoneListView,
    PhoneDetailView,
    PhoneUpdateView,
    PhoneDeleteView,
    PhoneCreateView,
	UserCommentListView
)
from . import views

app_name = 'ishop'
urlpatterns = [
    path('', views.index, name="index"),
    path('about/', views.about, name="about"),
    path('contacts/', views.contacts, name="contacts"),
    path('jobs/', views.jobs, name="jobs"),
    path('currency/', views.currency, name="currency"),
    path('phones/', PhoneListView.as_view(), name="phones"),
    path('phone/<int:pk>/', PhoneDetailView.as_view(), name="phone-detail"),
    path('phone/<int:pk>/update/', PhoneUpdateView.as_view(), name='phone-update'),
    path('phone/<int:pk>/delete/', PhoneDeleteView.as_view(), name="phone-delete"),
    path('phone/new/', PhoneCreateView.as_view(), name="phone-create"),
    path('user/<str:username>', UserCommentListView.as_view(), name="user-comments"),
    path('phone/<int:pk>/comment/', views.add_comment_to_phone, name='add_comment_to_phone'),
]
