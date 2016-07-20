from django.db import models
from django.contrib.auth.models import User
from crum import get_current_user

class PasswordEntry(models.Model):
    user = models.ForeignKey(User)
    version = models.PositiveIntegerField()
    name = models.CharField(max_length=50)
    size = models.PositiveIntegerField(default=8)
    numbers = models.BooleanField(default=True)
    uppers = models.BooleanField(default=True)
    lowers = models.BooleanField(default=True)
    specials = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.user = get_current_user()
        models.Model.save(self, *args, **kwargs)
