from rest_framework import serializers

from .models import PasswordEntry

class PasswordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordEntry
        fields = ('site_name', 'password_size', 'has_uppercase', 'has_number', 'has_specialchar')

