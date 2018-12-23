from django.contrib.auth.models import User
from .serializers import PhoneSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from ishop.models import Phone


class PhoneListAPIView(generics.ListCreateAPIView):
	lookup_field = 'pk'
	queryset = Phone.objects.all()
	serializer_class = PhoneSerializer
	permission_classes = (IsAdminUser,)
