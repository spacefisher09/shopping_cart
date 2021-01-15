from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator,MinValueValidator,ValidationError,RegexValidator
from django.utils import timezone
import random

import importlib,sys
importlib.reload(sys)

# 商品列表
class pdct_model(models.Model):
    TEA_TYPE = [
        ('', '------'),
        ('RT','紅 茶'),
        ('GT','綠 茶'),
        ('OLT','烏 龍 茶'),
    ]
    pdct_type = models.CharField(verbose_name="茶葉種類",max_length=10,choices=TEA_TYPE,default=TEA_TYPE[0][0])
    pdct_name = models.CharField(verbose_name="產品名稱",max_length=100,blank=True)
    pdct_price = models.IntegerField(verbose_name="產品價格",validators=[MinValueValidator(0),MaxValueValidator(10000)],null=True)
    pdct_amount = models.CharField(verbose_name="產品份量",max_length=100,blank=True)
    # ImageField 屬性 upload_to 空值會自動抓setting的 MEDIA_URL 所以不寫入指定資料夾位置 'src/images/'
    pdct_img = models.ImageField(verbose_name="產品照片",upload_to='',blank=True)

    class Meta:
        unique_together = (('pdct_name','pdct_img'),)
        index_together = (('pdct_name','pdct_img'),)
        verbose_name = "產品"
        verbose_name_plural = "產品列表"
        ordering = ['-id']

    #在admin展示 object name 為 pdct_name 商品名稱
    def __str__(self):    # 定義物件的字串描述
        return self.pdct_name


class shipng_fee_model(models.Model):
    set_shipng_fee = models.IntegerField(verbose_name="設定運費",validators=[MinValueValidator(0),MaxValueValidator(10000)],null=True)
    class Meta:
        verbose_name = "運費"
        verbose_name_plural = "設定運費"

    def __str__(self):    
        return str(self.set_shipng_fee)

    # 執行object儲存 先確認primary key    
    def save(self, *args, **kwargs):
        if not self.pk and shipng_fee_model.objects.exists():  # .pk為primary key,也等於object id
        # if you'll not check for self.pk 
        # then error will also raised in update of exists model
            raise ValidationError('shipng_fee_model 只能有一個object')
        return super(shipng_fee_model, self).save(*args, **kwargs)


class userdata_model(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,verbose_name="帳密管理會員")
    Name = models.CharField(verbose_name="會員姓名",max_length=100,blank=True)
    phone_regex = RegexValidator(regex=r'^\d{10}$', message="電話號碼為10碼,請輸入10個數字")
    Phone = models.CharField(verbose_name="會員電話",validators=[phone_regex], max_length=10,blank=True)
    Email = models.CharField(verbose_name="會員信箱",max_length=100,blank=True)
    Address = models.CharField(verbose_name="會員地址",max_length=100,blank=True)

    class Meta:
        verbose_name = "會員資料"
        verbose_name_plural = "會員列表"
        ordering = ['-id']

    #在admin展示 object name 為 pdct_name 商品名稱
    def __str__(self):    # 定義物件的字串描述
        return self.Name

    
class userorder_model(models.Model):
    #結帳方式
    PAMNT_TYPE = [
        ('', '------'),
        ('COD','貨到付款'), # cash on delivery
        ('RM','匯款'), # remit the money
    ]
    #運送狀態
    SHIPG_STATUS = [
        ('', '------'),
        ('UNSHIPPED','未出貨'),
        ('SHIPPING','已出貨-運送中'),
        ('ARRIVE','已出貨'),
    ]
    #訂單狀態
    ORDER_CHECK = [
        ('', '------'),
        ('PRCS_ODR','付款確認-訂單處理中'),
        ('CMPLTE_ODR','已到貨-訂單完成'),
    ]
    #指定收貨時間
    PICKTIME_TYPE = [
        ('', '------'),
        ('PICK_TZ1','中午12：00前'), 
        ('PICK_TZ2','下午12：00～18：00'),
    ]
    #訂單編號隨機
    def order_num():
        return 'DT{}'.format(random.randint(100000,999999))

    userdata = models.ForeignKey(userdata_model, on_delete=models.CASCADE,verbose_name="訂購會員")
    order_id = models.CharField(verbose_name="訂單編號",max_length=100,unique=True,default=order_num)
    order_date = models.CharField(verbose_name="訂單日期",max_length=100,default=timezone.now().strftime('%Y/%m/%d')) # 備註分秒format %H:%M
    id_Amount = models.JSONField(verbose_name="訂單明細",blank=True,default=list)
    shipping_fee = models.IntegerField(
        verbose_name="運費",validators=[MinValueValidator(0),MaxValueValidator(1000)],null=True,blank=True)
    total_bill = models.IntegerField(
        verbose_name="總金額",validators=[MinValueValidator(0),MaxValueValidator(50000)],null=True,blank=True)
    pamnt_type = models.CharField(verbose_name="結帳方式",max_length=10,choices=PAMNT_TYPE,blank=True,default=PAMNT_TYPE[0][0])
    recv_time = models.CharField(verbose_name="指定收貨時間",max_length=100,choices=PICKTIME_TYPE,blank=True,default=PICKTIME_TYPE[0][0])
    recv_info = models.JSONField(verbose_name="收件人資訊",blank=True,default=list)
    pamnt_info = models.CharField(verbose_name="付款狀態",max_length=1000,blank=True)
    shipg_status = models.CharField(verbose_name="運送狀態",max_length=10,choices=SHIPG_STATUS,blank=True,default=SHIPG_STATUS[0][0])
    order_check = models.CharField(verbose_name="訂單狀態",max_length=10,choices=ORDER_CHECK,blank=True,default=ORDER_CHECK[0][0])

    class Meta:
        verbose_name = "訂單資料"
        verbose_name_plural = "訂單列表"
        ordering = ['-id']

    #在admin展示 object name 為 pdct_name 商品名稱
    def __str__(self):    # 定義物件的字串描述
        return self.order_id

       