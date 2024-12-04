from django.db import models
from django.core.exceptions import ValidationError
from api.models import Hospital 

class Ward(models.Model):
   STATUS_CHOICES = [
       ('vacant', 'Vacant'),
       ('partially_occupied', 'Partially Occupied'),
       ('fully_occupied', 'Fully Occupied'), 
       ('maintenance', 'Maintenance')
   ]
   
   hospital = models.ForeignKey('api.Hospital', on_delete=models.CASCADE, to_field='hosp_ID')
   ward_name = models.CharField(max_length=100)
   no_of_beds = models.IntegerField()
   cost = models.DecimalField(max_digits=10, decimal_places=2)
   ward_img = models.CharField(max_length=255)
   ward_details = models.TextField()
   status = models.CharField(
       max_length=20,
       choices=STATUS_CHOICES, 
       default='vacant'
   )

   def save(self, *args, **kwargs):
       if self.pk is None:
           current_beds = Ward.objects.filter(hospital_id=self.hospital_id)\
               .aggregate(total=models.Sum('no_of_beds'))['total'] or 0
           if current_beds + self.no_of_beds > self.hospital.hosp_no_of_beds:
               raise ValidationError("Exceeds hospital's total bed capacity")
           is_new = True
       else:
           is_new = False
           
       super().save(*args, **kwargs)

       if is_new:
           for bed_number in range(1, self.no_of_beds + 1):
               Bed.objects.create(
                   ward=self,
                   id=f"{self.pk}-B{bed_number:03}",
                   status="vacant"
               )

   def update_ward_status(self):
       beds = self.beds.all()
       if not beds:
           self.status = 'vacant'
       else:
           occupied_count = beds.filter(status='occupied').count()
           total_beds = beds.count()

           if occupied_count == 0:
               self.status = 'vacant'
           elif occupied_count == total_beds:
               self.status = 'fully_occupied'
           else:
               self.status = 'partially_occupied'

       self.save()

   def __str__(self):
       return f"{self.hospital.hosp_name} - {self.ward_name}"


class Bed(models.Model):
    STATUS_CHOICES = [
        ('vacant', 'Vacant'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance')
    ]

    id = models.CharField(max_length=40, primary_key=True)  # Unique ID
    ward = models.ForeignKey(Ward, related_name='beds', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='vacant'
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Automatically update ward status after saving a bed
        self.ward.update_ward_status()

    def __str__(self):
        return f"{self.id} ({self.status}) in {self.ward.ward_name}"
