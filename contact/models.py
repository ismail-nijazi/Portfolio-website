from django.db import models

class RecievedEmail(models.Model):
	senderName = models.CharField(max_length=100)
	senderEmail = models.EmailField(max_length=100)
	subject = models.TextField()
	message = models.TextField()
