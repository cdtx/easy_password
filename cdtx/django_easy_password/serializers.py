from rest_framework import serializers

from .models import PasswordEntry

class PasswordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordEntry
        fields = ('id', 'timestamp', 'name', 'version', 'size', 'numbers', 'uppers', 'lowers', 'specials')

