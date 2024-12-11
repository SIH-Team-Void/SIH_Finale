from django.db import models
from datetime import datetime, timedelta, date
from django.db.models.signals import post_save
from django.dispatch import receiver
from user_management.models import User


class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    doctor_name = models.CharField(max_length=100)
    doctor_email = models.EmailField()
    doctor_phone = models.IntegerField()
    education = models.TextField()
    department = models.CharField(max_length=100)
    hospital_id = models.IntegerField()
    fees = models.IntegerField()

    def __str__(self):
        return self.doctor_name


class Slot(models.Model):
    slot_id = models.AutoField(primary_key=True)
    day = models.CharField(max_length=50)
    start_time = models.TimeField()
    end_time = models.TimeField()
    interval = models.DurationField()
    hospital_id = models.IntegerField()
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    online_hours = models.DurationField(null=True)  # Specifies the duration for online slots only

    def generate_slots_for_week(self):
        """Generate slots for the full week based on the online hours and interval."""
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
                self.generate_online_slots(current_day)

            # Move to the next day
            current_day += timedelta(days=1)

    def generate_online_slots(self, current_day):
        """Generate online slots for the specified online duration within the available time range."""
        if not self.online_hours:
            return  # Skip if no online duration is specified

        # Define the online time range
        start_time = datetime.combine(current_day, self.start_time)
        online_end_time = start_time + self.online_hours

        # Ensure the online end time does not exceed the slot's overall end time
        overall_end_time = datetime.combine(current_day, self.end_time)
        online_end_time = min(online_end_time, overall_end_time)

        interval = self.interval

        # Generate online slots
        current_time = start_time
        while current_time < online_end_time:
            OPDBooking.objects.create(
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


class WalkInSlot(models.Model):
    walkin_id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=255)
    patient_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    token_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField(auto_now_add=True)
    # completed = models.BooleanField(default = false)

    class Meta:
        ordering = ['token_number']

    def save(self, *args, **kwargs):
        if not self.token_number:
            # Get the latest token number for this doctor on the current date
            latest_token = WalkInSlot.objects.filter(
                doctor=self.doctor,
                date=timezone.now().date()
            ).aggregate(Max('token_number'))['token_number__max']
            
            self.token_number = (latest_token or 0) + 1
        super().save(*args, **kwargs)

class DoctorTokenTracker(models.Model):
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE, related_name='token_tracker')
    current_token = models.IntegerField(default=1)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dr. {self.doctor.doctor_name} - Current Token: {self.current_token}"

