# Generated by Django 5.1.3 on 2024-12-03 17:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_hospital_hosp_password'),
        ('bed_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ward',
            name='hospital',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.hospital'),
            preserve_default=False,
        ),
    ]
