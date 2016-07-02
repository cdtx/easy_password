from django.shortcuts import render_to_response

from rest_framework import generics

from .serializers import *

def index(self):
    return render_to_response('index.html')

class PasswordEntryList(generics.ListAPIView):
    queryset = PasswordEntry.objects.all()
    serializer_class = PasswordNameSerializer

class PasswordEntryDetails(generics.RetrieveUpdateAPIView):
    queryset = PasswordEntry.objects.all()
    lookup_field = 'id'
    serializer_class = PasswordEntrySerializer
