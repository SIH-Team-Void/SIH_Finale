# Generated by Django 5.1.3 on 2024-12-02 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GovernmentScheme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheme_name', models.CharField(max_length=255)),
                ('scheme_url', models.URLField()),
                ('scheme_description', models.TextField()),
                ('state', models.CharField(max_length=100)),
                ('age', models.PositiveIntegerField()),
                ('income', models.PositiveIntegerField()),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10)),
                ('family_size', models.PositiveIntegerField()),
                ('marital_status', models.CharField(choices=[('Single', 'Single'), ('Married', 'Married'), ('Divorced', 'Divorced'), ('Widowed', 'Widowed')], max_length=20)),
                ('health_problems', models.TextField(blank=True, null=True)),
                ('caste', models.CharField(max_length=50)),
            ],
        ),
    ]