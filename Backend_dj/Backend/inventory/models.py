from django.db import models
from django.utils.timezone import now
# Create your models here.
class Vendors(models.Model):
    CATEGORY_CHOICES = [
        ('surgical', 'Surgical'),
        ('medicines', 'Medicines'),
    ]

    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=150, null=False, blank=False)
    contact_number = models.CharField(max_length=15, null=False, blank=False)
    address = models.TextField(null=False, blank=False)
    gstin = models.CharField(max_length=15, unique=True, null=False, blank=False)
    surgical = models.IntegerField(null=True, blank=True)  # Corrected field name and type
    medicinal = models.IntegerField(null=True, blank=True)  # Corrected field name and type

    def _str_(self):
        return f"{self.name} - {self.category} - GSTIN: {self.gstin}"
    

class Inventory(models.Model):
    CATEGORY_CHOICES = [
        ('surgical', 'Surgical'),
        ('medicines', 'Medicines'),
    ]
    Inv_id = models.AutoField(primary_key=True, editable=False)
    Inv_name = models.CharField(max_length=150, null=False, blank=False)
    Inv_quantity = models.PositiveIntegerField(null=False, blank=False)
    Inv_price_per_item = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Inv_total_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    Inv_category =models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=False, blank=False) # Optional, e.g., "surgical" or "medicines"
    Inv_expiry_date= models.DateField(null=True,blank=True)
    Inv_vendor = models.CharField(max_length=50, null=True, blank=True)
    def _str_(self):
        return f"{self.Inv_name} - {self.Inv_quantity} - {self.Inv_price_per_item} items"

    def save(self, *args, **kwargs):
        # Automatically calculate total price based on quantity and price per item
        self.Inv_total_price = self.Inv_quantity * self.Inv_price_per_item
        super().save(*args, **kwargs)
    
class Sales(models.Model):
    customer_name = models.CharField(max_length=150)
    customer_contact = models.CharField(max_length=15)
    sale_date = models.DateTimeField(default=now)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    doctor_suggest = models.CharField(max_length=20)

class SalesItem(models.Model):
    sale = models.ForeignKey(Sales, on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_per_item = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if self.quantity > self.inventory.Inv_quantity:
            raise ValueError("Insufficient stock")
        self.inventory.Inv_quantity -= self.quantity
        self.inventory.save()
        super().save(*args, **kwargs)
