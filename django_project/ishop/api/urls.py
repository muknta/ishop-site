from django.urls import path
from .views import PhoneListAPIView

urlpatterns = [
	path('api/phones/', PhoneListAPIView.as_view(), name='phones-api')
]
