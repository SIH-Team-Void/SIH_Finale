# Generated by Django 5.1.4 on 2024-12-07 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_remove_sales_inventory_sales_items'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='Inv_id',
            field=models.PositiveIntegerField(editable=False, primary_key=True, serialize=False),
        ),
    ]