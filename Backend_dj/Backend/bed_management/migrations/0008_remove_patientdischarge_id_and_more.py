# Generated by Django 5.1.3 on 2024-12-08 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bed_management', '0007_patientdischarge'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patientdischarge',
            name='id',
        ),
        migrations.AddField(
            model_name='patientdischarge',
            name='discharge_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
        migrations.AlterModelTable(
            name='patientdischarge',
            table='patient_discharge',
        ),
    ]