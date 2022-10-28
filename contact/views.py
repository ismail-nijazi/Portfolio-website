from django.shortcuts import redirect
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.contrib import messages
from .forms import RecievedEmailForm


# Create your views here.
TEXT_TO_BLOCK = ["larnehell", "cryptaxbot"]


def validate(form):
    formFields = [form['subject'].lower(), form['senderEmail'].lower(),
                  form['senderName'].lower(), form['message'].lower()]
    if form["hidden-input"]:
        return False
    for text in formFields:
        if text in TEXT_TO_BLOCK:
            return False


def sendEmail(request):
    if request.method == 'POST':
        form = RecievedEmailForm(request.POST)
        if form.is_valid and validate(request.POST):
            myEmail = 'ismail.nijazi1@gmail.com'
            subject = request.POST['subject']
            senderEmail = request.POST['senderEmail']
            senderName = request.POST['senderName']
            message = f"""<h4>Name:<span style='font-weight:300;'>{senderName}</span></h4>\n<h4>Email:
			<span style='font-weight:300;'>{senderEmail}</span></h4>\n\n<p> {request.POST['message']} </p>"""
            mail = EmailMultiAlternatives(subject, '', myEmail, [myEmail])
            mail.attach_alternative(message, 'text/html')
            mail.send()
            form.save()
            messages.success(request, "Your email was sended successfully!")
            return redirect(reverse('HomePage') + '#contact-page')
    return redirect(reverse('HomePage') + '#contact-page')
