# Generated by Django 5.1 on 2024-12-03 07:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_management', '0003_alter_slot_doctor_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='opdbooking',
            name='doctor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.doctor'),
        ),
        migrations.AlterField(
            model_name='slot',
            name='doctor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.doctor'),
        ),
    ]