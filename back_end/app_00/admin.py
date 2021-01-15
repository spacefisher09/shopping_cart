from django.contrib import admin
from .models import pdct_model,shipng_fee_model,userdata_model,userorder_model
# Register your models here.

class pdct_admin(admin.ModelAdmin):
    search_fields=['pdct_name']

class userdata_admin(admin.ModelAdmin):
    list_display = ('Name','user')
    search_fields=['Name','user']
class userorder_admin(admin.ModelAdmin):
    list_display = ('order_id','userdata','order_date')
    readonly_fields = ('order_id','order_date', )
    search_fields=['order_id','userdata']

admin.site.register(pdct_model,pdct_admin)

admin.site.register(shipng_fee_model)

admin.site.register(userdata_model,userdata_admin)

admin.site.register(userorder_model,userorder_admin)