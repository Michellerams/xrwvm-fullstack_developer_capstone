from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib import admin

# Create your models here.

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Other fields as needed
    founded_year = models.IntegerField(null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.name  # Return the name as the string representation
        
    
    class Meta:
        verbose_name = "Car Make"
        verbose_name_plural = "Car Makes"

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)  # Many-to-One relationship
    dealer_id = models.IntegerField()  # refers to a dealer created in Cloudant database
    name = models.CharField(max_length=100)
    
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('TRUCK', 'Truck'),
        ('VAN', 'Van'),
        ('COUPE', 'Coupe'),
        ('CONVERTIBLE', 'Convertible'),
        ('HATCHBACK', 'Hatchback'),
        ('MINIVAN', 'Minivan'),
        ('SPORTS', 'Sports Car'),
    ]
    
    type = models.CharField(max_length=20, choices=CAR_TYPES, default='SUV')
    
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015)
        ]
    )
    
    # Other fields as needed
    color = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    mileage = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"  # Return car make, model name, and year

    
    class Meta:
        verbose_name = "Car Model"
        verbose_name_plural = "Car Models"
        
