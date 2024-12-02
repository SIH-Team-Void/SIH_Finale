# Generated by Django 5.1 on 2024-12-02 10:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('doctor_id', models.AutoField(primary_key=True, serialize=False)),
                ('doctor_name', models.CharField(max_length=100)),
                ('doctor_email', models.EmailField(max_length=254)),
                ('doctor_phone', models.IntegerField()),
                ('education', models.TextField()),
                ('department', models.CharField(max_length=100)),
                ('hospital_id', models.IntegerField()),
                ('fees', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('slot_id', models.AutoField(primary_key=True, serialize=False)),
                ('day', models.CharField(max_length=50)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('interval', models.DurationField()),
                ('fees', models.IntegerField()),
                ('hospital_id', models.IntegerField()),
                ('doctor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_management.doctor')),
            ],
        ),
    ]
