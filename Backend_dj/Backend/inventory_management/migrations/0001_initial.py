# Generated by Django 5.1.4 on 2024-12-12 10:45

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('Inv_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('Inv_name', models.CharField(max_length=150)),
                ('Inv_quantity', models.PositiveIntegerField()),
                ('Inv_price_per_item', models.DecimalField(decimal_places=2, max_digits=10)),
                ('Inv_total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('Inv_category', models.CharField(choices=[('surgical', 'Surgical'), ('medicines', 'Medicines')], max_length=50)),
                ('Inv_subcategory', models.CharField(blank=True, max_length=50, null=True)),
                ('batch_number', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('expiry_date', models.DateField(blank=True, null=True)),
                ('Inv_vendor', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=150)),
                ('customer_contact', models.CharField(max_length=15)),
                ('sale_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('doctor_suggest', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Vendors',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('contact_number', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('gstin', models.CharField(max_length=15, unique=True)),
                ('surgical', models.IntegerField(blank=True, null=True)),
                ('medicinal', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SalesItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('price_per_item', models.DecimalField(decimal_places=2, max_digits=10)),
                ('inventory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory_management.inventory')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory_management.sales')),
            ],
        ),
    ]