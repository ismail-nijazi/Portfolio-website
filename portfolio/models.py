from django.db import models
from django.utils import timezone

# Create your models here.

class Project(models.Model):
	name = models.CharField(max_length=100, blank=False)
	type = models.CharField(max_length=100, blank=False)
	image_1 = models.ImageField(default="defualt_image.jpg", upload_to='Projects_Images')
	image_2 = models.ImageField(default='defualt_image.jpg', upload_to='Projects_Images')
	date_created = models.DateTimeField(default=timezone.now)
	description = models.TextField(blank=False)
	url = models.URLField(blank=False)
	frontEnd_techniques = models.CharField(max_length=300, blank=True)
	backEnd_techniques = models.CharField(max_length=300, blank=True)
	other_techniques = models.CharField(max_length=300, blank=True)
	def delete(self, using=None, keep_parents=False):
		self.image_1.delete()
		self.image_2.delete()
		super().delete()
