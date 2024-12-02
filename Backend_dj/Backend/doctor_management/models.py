from django.db import models

class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    doctor_name = models.CharField(max_length=100)
    doctor_email = models.EmailField()
    doctor_phone = models.IntegerField()
    education = models.TextField()
    department = models.CharField(max_length=100)
    hospital_id = models.IntegerField()
    fees = models.IntegerField()


class Slot(models.Model):
    slot_id = models.AutoField(primary_key=True)
    day = models.CharField(max_length=50)
    start_time = models.TimeField()
    end_time = models.TimeField()
    interval = models.DurationField()
    fees = models.IntegerField()
    hospital_id = models.IntegerField()
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)