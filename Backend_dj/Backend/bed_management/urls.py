# urls.py
from django.urls import path
from .views import WardAddView, WardListView, BedStatusUpdateView
from . import views

urlpatterns = [
    path('ward/add/', WardAddView.as_view(), name='ward-add'),
    path('ward/list/', WardListView.as_view(), name='ward-list'),
    path('ward/update-bed-status/', views.update_bed_status, name='update-bed-status'),
]