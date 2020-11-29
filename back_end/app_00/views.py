from django.shortcuts import render

# Create your views here.
from app_00.models import app_00_modal
from app_00.serializers import app_00_Serializer
from rest_framework import generics
class app_00_ListCreate(generics.ListCreateAPIView):
    queryset = app_00_modal.objects.all()
    serializer_class = app_00_Serializer