# Generated by Django 5.1 on 2024-12-11 21:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_management', '0011_payment'),
    ]

    operations = [
        migrations.CreateModel(
            name='PatientSymptom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('severity', models.CharField(choices=[('Mild', 'Mild'), ('Moderate', 'Moderate'), ('Severe', 'Severe')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='ConsultationRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=255)),
                ('age', models.IntegerField()),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('previous_visits', models.IntegerField(default=0)),
                ('is_emergency', models.BooleanField(default=False)),
                ('consultation_time', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.doctor')),
                ('primary_symptom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.patientsymptom')),
            ],
        ),
        migrations.CreateModel(
            name='QueuePrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=255)),
                ('predicted_time', models.IntegerField()),
                ('token_number', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('actual_time', models.IntegerField(blank=True, null=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.doctor')),
                ('symptoms', models.ManyToManyField(to='doctor_management.patientsymptom')),
            ],
        ),
    ]
