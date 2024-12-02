# Generated by Django 5.1.3 on 2024-11-30 17:13

import django.core.validators
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hospital',
            options={'ordering': ['-created_at'], 'verbose_name': 'Hospital', 'verbose_name_plural': 'Hospitals'},
        ),
        migrations.AddField(
            model_name='hospital',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Registration Date'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Last Updated'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_ID',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True, verbose_name='Hospital Unique ID'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_address',
            field=models.TextField(verbose_name='Complete Address'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_contact_no',
            field=models.CharField(max_length=20, validators=[django.core.validators.MinLengthValidator(10)], verbose_name='Contact Number'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_email',
            field=models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()], verbose_name='Hospital Email'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_lat',
            field=models.DecimalField(decimal_places=6, max_digits=9, verbose_name='Latitude'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_log',
            field=models.DecimalField(decimal_places=6, max_digits=9, verbose_name='Longitude'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_name',
            field=models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(2)], verbose_name='Hospital Name'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_no_of_beds',
            field=models.PositiveIntegerField(verbose_name='Number of Beds'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hosp_password',
            field=models.CharField(max_length=255, verbose_name='Hashed Password'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='image_url',
            field=models.URLField(blank=True, null=True, verbose_name='Hospital Logo URL'),
        ),
    ]
