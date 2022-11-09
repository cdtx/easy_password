from django.shortcuts import render

from rest_framework import generics
from rest_framework import permissions
from rest_framework import pagination

from .serializers import *

def index(request):
    ret = render(request, 'django_easy_password/index.html', {'user':request.user})
    return ret

class myPagination(pagination.PageNumberPagination):
    page_size = 1000
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
