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
        if request.user != None:
            user = request.user
            try:
                crte_user = userdata_model.objects.get(user=user.id)
                # 判斷是否為儲存資料動作
                if 'Name' in request.data:
                    crte_user.Name = request.data['Name']
                    crte_user.Phone = request.data['Phone']
                    crte_user.Email = request.data['Email']
                    crte_user.Address = request.data['Address']
                    crte_user.save()
                    serializer = userdata_Serializer(crte_user,many=False)
                    return Response(
                        '會員資料儲存成功！',status=status.HTTP_200_OK
                    ) 
                # 使頁面帶入使用者資料
                else:
                    serializer = userdata_Serializer(crte_user,many=False)
                    return Response(
                        serializer.data,status=status.HTTP_200_OK
                    )

            except:
                crte_user = userdata_model.objects.create(
                    user=user,Name=request.data['Name'],Phone=request.data['Phone'],
                    Email=request.data['Email'],Address=request.data['Address']
                )
                serializer = userdata_Serializer(crte_user,many=False)
                return Response(
                    '會員資料創建成功！',status=status.HTTP_200_OK
                )
        else:
            return Response({'msg':'Errrrrror'},status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False,methods=['POST'])
    def get_user(self,request,pk=None):
        user = request.user
        try:
            get_user = userdata_model.objects.get(user=user.id)
            serializer = userdata_Serializer(get_user,many=False)
            return Response(
                serializer.data,status=status.HTTP_200_OK
            )
        except:
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
                serializer.data,status=status.HTTP_200_OK
            )
        else:
            return Response({'msg':'Errrrrror'},status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False,methods=['POST'])
    def get_userorder(self,request,pk=None):
        user = request.user
        userdata = userdata_model.objects.get(user=user.id)
        try:
            get_order = userorder_model.objects.filter(userdata=userdata)
            serializer = userorder_Serializer(get_order,many=True)
            return Response(
                serializer.data,status=status.HTTP_200_OK
            )
        except:
            return Response({'msg':'Errrrrror'},status=status.HTTP_400_BAD_REQUEST)
       
    
