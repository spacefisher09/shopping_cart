from rest_framework import serializers
from app_00.models import pdct_model, shipng_fee_model, userdata_model,userorder_model
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class pdct_Serializer(serializers.ModelSerializer):
    class Meta:
        model = pdct_model
        fields = '__all__'

class shipng_fee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = shipng_fee_model
        fields = '__all__'

class user_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password','is_staff')
        read_only_fields = ('is_active',)
        extra_kwargs = {
            'is_staff':{'write_only':True},
            'password':{'write_only': True,'required':True}
        }
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        userdata_model.objects.create(user=user)
        return user

class userdata_Serializer(serializers.ModelSerializer):
    class Meta:
        model = userdata_model
        fields = '__all__'

class userorder_Serializer(serializers.ModelSerializer):
    class Meta:
        model = userorder_model
        fields = '__all__'