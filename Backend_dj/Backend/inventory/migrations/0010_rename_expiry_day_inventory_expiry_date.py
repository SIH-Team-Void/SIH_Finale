# Generated by Django 5.1.4 on 2024-12-10 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_inventory_expiry_day'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventory',
            old_name='expiry_day',
            new_name='expiry_date',
        ),
    ]
