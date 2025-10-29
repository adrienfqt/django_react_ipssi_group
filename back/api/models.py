from django.db import models

class PlaceMinimal(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=50)
    city = models.FloatField()
    postal_code = models.CharField(max_length=100, unique=True)
    address_string = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PlaceCarousel(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=50)
    city = models.FloatField()
    postal_code = models.CharField(max_length=100, unique=True)
    address_string = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
