# # from django.db import models
# # from django.contrib.auth.hashers import make_password

# # class Hospital(models.Model):
# #     """
# #     Model to represent hospital registration details
# #     """
# #     hosp_ID = models.IntegerField(unique=True, primary_key=True)
# #     hosp_name = models.CharField(max_length=255)
# #     hosp_email = models.EmailField(unique=True)
# #     hosp_contact_no = models.CharField(max_length=20)
# #     image_url = models.URLField(null=True, blank=True)
    
# #     # Location Details
# #     hosp_lat = models.DecimalField(max_digits=9, decimal_places=6)
# #     hosp_log = models.DecimalField(max_digits=9, decimal_places=6)
# #     hosp_address = models.TextField()
    
# #     # Bed Capacity
# #     hosp_no_of_beds = models.IntegerField()
    
# #     # Authentication
# #     hosp_password = models.CharField(max_length=255)
    
# #     def save(self, *args, **kwargs):
# #         # Hash the password before saving
# #         if not self.pk or Hospital.objects.filter(pk=self.pk).hosp_password != self.hosp_password:
# #             self.hosp_password = make_password(self.hosp_password)
# #         super().save(*args, **kwargs)
    
# #     def __str__(self):
# #         return f"{self.hosp_name} (ID: {self.hosp_ID})"


# from django.db import models
# from django.contrib.auth.hashers import make_password

# class Hospital(models.Model):
#     """
#     Model to represent hospital registration details
#     """
#     hosp_ID = models.IntegerField(unique=True, primary_key=True)
#     hosp_name = models.CharField(max_length=255)
#     hosp_email = models.EmailField(unique=True)
#     hosp_contact_no = models.CharField(max_length=20)
#     image_url = models.URLField(null=True, blank=True)
    
#     # Location Details
#     hosp_lat = models.DecimalField(max_digits=9, decimal_places=6)
#     hosp_log = models.DecimalField(max_digits=9, decimal_places=6)
#     hosp_address = models.TextField()
    
#     # Bed Capacity
#     hosp_no_of_beds = models.IntegerField()
    
#     # Authentication
#     hosp_password = models.CharField(max_length=255)
    
#     def save(self, *args, **kwargs):
#         # Hash the password before saving
#         if not self.pk:  # If this is a new object
#             self.hosp_password = make_password(self.hosp_password)
#         else:
#             # If updating an existing object, check if the password has changed
#             existing_hospital = Hospital.objects.filter(pk=self.pk).first()
#             if existing_hospital and existing_hospital.hosp_password != self.hosp_password:
#                 self.hosp_password = make_password(self.hosp_password)
        
#         super().save(*args, **kwargs)
    
#     def __str__(self):
#         return f"{self.hosp_name} (ID: {self.hosp_ID})"
from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import MinLengthValidator, EmailValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

class Hospital(models.Model):
    """
    Model to represent hospital registration details
    """
    # Unique Hospital Identifier
    hosp_ID = models.IntegerField(
        unique=True, 
        primary_key=True,
        verbose_name="Hospital Unique ID"
    )

    # Hospital Basic Information
    hosp_name = models.CharField(
        max_length=255, 
        validators=[MinLengthValidator(2)],
        verbose_name="Hospital Name"
    )

    hosp_email = models.EmailField(
        unique=True, 
        validators=[EmailValidator()],
        verbose_name="Hospital Email"
    )

    hosp_contact_no = models.CharField(
        max_length=20, 
        validators=[MinLengthValidator(10)],
        verbose_name="Contact Number"
    )

    image_url = models.URLField(
        null=True, 
        blank=True, 
        verbose_name="Hospital Logo URL"
    )

    # Location Details
    hosp_lat = models.DecimalField(
        max_digits=9, 
        decimal_places=6, 
        verbose_name="Latitude"
    )

    hosp_log = models.DecimalField(
        max_digits=9, 
        decimal_places=6, 
        verbose_name="Longitude"
    )

    hosp_address = models.TextField(
        verbose_name="Complete Address"
    )

    # Bed Capacity
    hosp_no_of_beds = models.PositiveIntegerField(
        verbose_name="Number of Beds"
    )

    # Authentication
    hosp_password = models.CharField(
        max_length=255, 
        verbose_name="Hashed Password"
    )

    # Timestamp Fields
    created_at = models.DateTimeField(
        default=timezone.now,  # Use default instead of auto_now_add
        verbose_name="Registration Date"
    )

    updated_at = models.DateTimeField(
        auto_now=True, 
        verbose_name="Last Updated"
    )

    def clean(self):
        """
        Custom validation method
        """
        # Additional custom validations can be added here
        if self.hosp_no_of_beds <= 0:
            raise ValidationError("Number of beds must be a positive integer")

    def save(self, *args, **kwargs):
        """
        Override save method to handle password hashing
        """
        # Validate the model before saving
        self.full_clean()

        # Hash the password if it's not already hashed
        if not self.pk or self._password_needs_hashing():
            self.hosp_password = make_password(self.hosp_password)

        super().save(*args, **kwargs)

    def _password_needs_hashing(self):
        """
        Check if the password needs to be hashed
        """
        # If the password doesn't start with 'pbkdf2_', it needs hashing
        return not self.hosp_password.startswith('pbkdf2_')

    def check_password(self, raw_password):
        """
        Check if the provided password is correct
        """
        return check_password(raw_password, self.hosp_password)

    def __str__(self):
        return f"{self.hosp_name} (ID: {self.hosp_ID})"

    class Meta:
        verbose_name = "Hospital"
        verbose_name_plural = "Hospitals"
        ordering = ['-created_at']