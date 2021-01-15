from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import pdct_viewset,shipng_fee_viewset,user_viewset,userdata_viewset,userorder_viewset

router = routers.DefaultRouter()
router.register('pdctlist',pdct_viewset)
router.register('shipngfee',shipng_fee_viewset)
router.register('users',user_viewset)
router.register('userdata',userdata_viewset)
router.register('userorder',userorder_viewset)

urlpatterns = [
    path('', include(router.urls) )
]