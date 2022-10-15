from django.forms import ModelForm
from .models import RecievedEmail


class RecievedEmailForm(ModelForm):
    class Meta:
        model = RecievedEmail
        fields = ['senderName', 'senderEmail', 'subject', 'message']
