from django.shortcuts import render

from rest_framework import generics

from .serializers import *

class PasswordEntryList(generics.ListCreateAPIView):
    queryset = PasswordEntry.objects.all()
    serializer_class = PasswordEntrySerializer

class PasswordEntryDetails(generics.RetrieveUpdateAPIView):
    queryset = PasswordEntry.objects.all()
    lookup_field = 'id'
    serializer_class = PasswordEntrySerializer
