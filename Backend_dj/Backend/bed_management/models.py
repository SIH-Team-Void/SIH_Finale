from django.db import models

class Ward(models.Model):
    STATUS_CHOICES = [
        ('vacant', 'Vacant'),
        ('partially_occupied', 'Partially Occupied'),
        ('fully_occupied', 'Fully Occupied'),
        ('maintenance', 'Maintenance')
    ]

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
        # Check if this is a new ward creation
        is_new = self.pk is None
        super().save(*args, **kwargs)

        # Generate beds for new wards
        if is_new:
            for bed_number in range(1, self.no_of_beds + 1):
                Bed.objects.create(
                    ward=self,
                    id=f"{self.pk}-B{bed_number:03}",  # Unique ID pattern
                    status="vacant"
                )

    def update_ward_status(self):
        """
        Automatically update ward status based on bed statuses
        """
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
        return self.ward_name


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
