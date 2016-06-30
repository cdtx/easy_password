from django.db import models

class PasswordEntry(models.Model):
    site_name = models.CharField(max_length=50)
    password_size = models.PositiveIntegerField(default=8)
    has_uppercase = models.BooleanField(default=False)
    has_number = models.BooleanField(default=False)
    has_specialchar = models.BooleanField(default=False)
