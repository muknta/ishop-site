from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from PIL import Image
from django.core.validators import MinValueValidator
from decimal import Decimal


class Phone(models.Model):
	phone_image = models.ImageField(default=settings.DEFAULT_PIC, upload_to='phones_pics')
	phone_brand = models.CharField(max_length=100)
	phone_model = models.CharField(max_length=100)
	phone_price = models.DecimalField(decimal_places=3,max_digits=15,validators=[MinValueValidator(Decimal('0'))])
	phone_resolution = models.CharField(max_length=30)
	phone_camera = models.CharField(max_length=30)
	phone_diagonal = models.CharField(max_length=30)

	def __str__(self):
		return f'{self.phone_brand} {self.phone_model}'

	def save(self, *args, **kwargs):
		super(Phone, self).save(*args, **kwargs)

		img = Image.open(self.phone_image.path)
		if img.height > 500 or img.width > 500:
			output_size = (500, 500)
			img.thumbnail(output_size)
			img.save(self.phone_image.path)

	def get_absolute_url(self):
		return reverse('ishop:phone-detail', kwargs={'pk': self.pk})


class Comment(models.Model):
	phone = models.ForeignKey(Phone, on_delete=models.CASCADE, related_name='comments')
	content = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')

	def __str__(self):
		return self.content

	def get_absolute_url(self):
		return reverse('ishop:phone-detail', kwargs={'pk': self.phone.pk})



