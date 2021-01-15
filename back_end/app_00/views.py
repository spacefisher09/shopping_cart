from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from app_00.models import pdct_model, shipng_fee_model, userdata_model,userorder_model
from app_00.serializers import pdct_Serializer, shipng_fee_Serializer, user_Serializer, userdata_Serializer, userorder_Serializer
from rest_framework.authentication import TokenAuthentication #import 認證模式
from rest_framework.permissions import IsAuthenticated, AllowAny #import 授權模式

class pdct_viewset(viewsets.ModelViewSet):
    queryset = pdct_model.objects.all()
    serializer_class = pdct_Serializer
    

class shipng_fee_viewset(viewsets.ModelViewSet):
    queryset = shipng_fee_model.objects.all()
    serializer_class = shipng_fee_Serializer

class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = user_Serializer
    permission_classes = [AllowAny,]

class userdata_viewset(viewsets.ModelViewSet):
    queryset = userdata_model.objects.all()
    serializer_class = userdata_Serializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    @action(detail=False,methods=['POST'])
    def create_userdata(self,request,pk=None):
        if 'Name' in request.data:
            crteName = request.data['Name']
            crtePhone = request.data['Phone']
            crteEmail = request.data['Email']
            crteAddr = request.data['Address']
            user = request.user

            try:
                crte_user = userdata_model.objects.get(user=user.id)
                crte_user.Name = crteName
                crte_user.Phone = crtePhone
                crte_user.Email = crteEmail
                crte_user.Address = crteAddr
                crte_user.save()
                serializer = userdata_Serializer(crte_user,many=False)
                return Response(
                    {'result':serializer.data},status=status.HTTP_200_OK
                )
            except:
                crte_user = userdata_model.objects.create(
                    user=user,Name=crteName,Phone=crtePhone,Email=crteEmail,Address=crteAddr)
                serializer = userdata_Serializer(crte_user,many=False)
                return Response(
                    {'result':serializer.data},status=status.HTTP_200_OK
                )
        else:
            return Response({'msg':'Errrrrror'},status=status.HTTP_400_BAD_REQUEST)


class userorder_viewset(viewsets.ModelViewSet):
    queryset = userorder_model.objects.all()
    serializer_class = userorder_Serializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    @action(detail=False,methods=['POST'])
    def create_userorder(self,request,pk=None):
        if 'id_Amount' in request.data:
            crteorder = request.data['id_Amount']
            user = request.user
            userdata = userdata_model.objects.get(user=user.id)
            
            crte_userorder = userorder_model.objects.create(userdata=userdata,id_Amount=crteorder)
            serializer = userorder_Serializer(crte_userorder,many=False)
            return Response(
                {'result':serializer.data},status=status.HTTP_200_OK
            )
        else:
            return Response({'msg':'Errrrrror'},status=status.HTTP_400_BAD_REQUEST)
            

