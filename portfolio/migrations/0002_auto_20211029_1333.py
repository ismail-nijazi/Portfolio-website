# Generated by Django 3.2.8 on 2021-10-29 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image_1',
            field=models.ImageField(default='defualt_image.jpg', upload_to='Projects_Images'),
        ),
        migrations.AlterField(
            model_name='project',
            name='image_2',
            field=models.ImageField(default='defualt_image.jpg', upload_to='Projects_Images'),
        ),
    ]
