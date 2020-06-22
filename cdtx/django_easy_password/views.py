from django.shortcuts import render_to_response

from rest_framework import generics
from rest_framework import permissions
from rest_framework import pagination

from .serializers import *

def index(self):
    return render_to_response('django_easy_password/index.html', {'user':self.user})

class myPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 10000

class PasswordEntryList(generics.ListCreateAPIView):
    queryset = PasswordEntry.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = PasswordEntrySerializer
    pagination_class = myPagination

class PasswordEntryDetails(generics.RetrieveDestroyAPIView):
    queryset = PasswordEntry.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = 'id'
    serializer_class = PasswordEntrySerializer
