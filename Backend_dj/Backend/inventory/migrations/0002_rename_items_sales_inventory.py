# Generated by Django 5.1.4 on 2024-12-05 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sales',
            old_name='items',
            new_name='inventory',
        ),
    ]
