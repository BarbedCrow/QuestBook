# Generated by Django 2.2.5 on 2019-09-29 06:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_quest_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quest',
            name='images',
        ),
    ]