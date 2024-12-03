from django.db import models
from datetime import datetime, timedelta,date
from django.db.models.signals import post_save
from django.dispatch import receiver

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

    def generate_slots_for_week(self):
        """Generate slots for the full week based on the time interval."""
        start_date = date.today() 
        end_date = start_date + timedelta(days=7)  # For one week ahead

        # Iterate through the next 7 days
        current_day = start_date
        while current_day < end_date:
            # Get the day name from the current_day
            current_day_name = current_day.strftime('%A')  # e.g. 'Monday', 'Tuesday', etc.
            
            # Check if the current_day matches the day for the slot
            if current_day_name == self.day:
                # Create slots for this day if it matches
                self.generate_slots_for_day(current_day)
            
            # Move to the next day
            current_day += timedelta(days=1)

    def generate_slots_for_day(self, current_day):
        """Generate individual time slots for a given day based on the interval."""
        start_time = datetime.combine(current_day, self.start_time)
        end_time = datetime.combine(current_day, self.end_time)
        interval = self.interval

        # Generate slots for the day based on the interval
        current_time = start_time
        while current_time < end_time:
            # Create an OPDBooking entry for each slot
            opd_booking = OPDBooking.objects.create(
                start_time=current_time.time(),
                end_time=(current_time + interval).time(),
                date=current_time.date(),
                slot_id=self.slot_id,
                doctor_id=self.doctor_id,
                hospital_id=self.hospital_id,
                is_booked=False  # Initially not booked
            )
            current_time += interval  # Increment time by the interval

    def __str__(self):
        return f"{self.day} - {self.start_time} to {self.end_time}"
    
# Signal to automatically generate slots when a new Slot is created
@receiver(post_save, sender=Slot)
def create_slots_for_week(sender, instance, created, **kwargs):
    """Automatically generate slots when a new Slot is created."""
    if created:
        instance.generate_slots_for_week()


class OPDBooking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    start_time = models.TimeField()
    end_time = models.TimeField()
    date = models.DateField()
    patient_id = models.IntegerField(null=True, blank=True)
    slot_id = models.IntegerField()
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=255, null=True, blank=True)
    hospital_id = models.IntegerField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ['date', 'start_time', 'end_time', 'doctor_id']
        
    def __str__(self):
        return f"Booking {self.booking_id} - {self.start_time} to {self.end_time}"