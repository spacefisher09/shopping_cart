from rest_framework import serializers
from app_00.models import app_00_modal

class app_00_Serializer(serializers.ModelSerializer):
    class Meta:
        model = app_00_modal
        fields = '__all__'