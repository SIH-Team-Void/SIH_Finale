# Generated by Django 5.1 on 2024-12-07 18:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_management', '0005_slot_online_hours'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='slot',
            name='fees',
        ),
    ]
