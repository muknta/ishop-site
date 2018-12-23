from rest_framework import serializers
from ishop.models import Phone


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ['pk','phone_image','phone_brand','phone_model',
			'phone_price','phone_resolution','phone_camera','phone_diagonal']

