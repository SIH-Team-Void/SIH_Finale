# Generated by Django 5.1 on 2024-12-11 18:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_management', '0002_rename_expiry_date_inventory_inv_expiry_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventory',
            old_name='Inv_expiry_date',
            new_name='expiry_date',
        ),
    ]
