from django.shortcuts import render_to_response

from rest_framework import generics

from .serializers import *

def index(self):
    return render_to_response('django_easy_password/index.html')

class PasswordEntryList(generics.ListCreateAPIView):
    queryset = PasswordEntry.objects.all()
    serializer_class = PasswordEntrySerializer

class PasswordEntryDetails(generics.RetrieveAPIView):
    queryset = PasswordEntry.objects.all()
    lookup_field = 'id'
    serializer_class = PasswordEntrySerializer
