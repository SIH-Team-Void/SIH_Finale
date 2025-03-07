# Generated by Django 5.1 on 2024-12-03 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_management', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OPDBooking',
            fields=[
                ('booking_id', models.AutoField(primary_key=True, serialize=False)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('date', models.DateField()),
                ('patient_id', models.IntegerField(blank=True, null=True)),
                ('slot_id', models.IntegerField()),
                ('doctor_id', models.IntegerField()),
                ('patient_name', models.CharField(blank=True, max_length=255, null=True)),
                ('hospital_id', models.IntegerField()),
                ('is_booked', models.BooleanField(default=False)),
            ],
            options={
                'unique_together': {('date', 'start_time', 'end_time', 'doctor_id')},
            },
        ),
    ]
