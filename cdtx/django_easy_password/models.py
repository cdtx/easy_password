from django.db import models

class PasswordEntry(models.Model):
    name = models.CharField(max_length=50)
    size = models.PositiveIntegerField(default=8)
    numbers = models.BooleanField(default=True)
    uppers = models.BooleanField(default=True)
    lowers = models.BooleanField(default=True)
    specials = models.BooleanField(default=True)
