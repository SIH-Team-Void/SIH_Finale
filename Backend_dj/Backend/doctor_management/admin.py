from django.contrib import admin
from .models import Doctor, Slot, OPDBooking

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('doctor_name', 'doctor_email', 'doctor_phone', 'department', 'hospital_id', 'fees')
    search_fields = ('doctor_name', 'doctor_email', 'department')
    list_filter = ('department', 'hospital_id')

@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ('doctor_id', 'day', 'start_time', 'end_time', 'fees', 'hospital_id')
    search_fields = ('doctor_id__doctor_name', 'day')
    list_filter = ('day', 'hospital_id', 'doctor_id')

class OPDBookingAdmin(admin.ModelAdmin):
    list_display = [field.name for field in OPDBooking._meta.fields]  
    search_fields = ['patient_name', 'doctor_id', 'hospital_id']
    list_filter = ['date', 'doctor_id', 'hospital_id', 'is_booked'] 
    
admin.site.register(OPDBooking, OPDBookingAdmin)