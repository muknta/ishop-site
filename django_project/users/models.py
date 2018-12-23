from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from PIL import Image


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	image = models.ImageField(default=settings.DEFAULT_PIC, upload_to='profile_pics')

	def __str__(self):
		return f'{self.user.username} Profile'

	def save(self, *args, **kwargs):
		super(Profile, self).save(*args, **kwargs)

		img = Image.open(self.image.path)
		if img.height > 500 or img.width > 500:
			output_size = (500, 500)
			img.thumbnail(output_size)
			img.save(self.image.path)
