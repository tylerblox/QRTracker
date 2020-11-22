from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
import qrcode
import qrcode.image.svg

class Promoter(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list

    def __str__(self):
        return "Promoter: {0} {1}".format(self.first_name, self.last_name)
    
    def full_name(self):
        return "{0} {1}".format(self.first_name, self.last_name)

class Location(models.Model):
    name = models.CharField(max_length=255)
    address1 = models.CharField(
        "Address line 1",
        max_length=1024,
    )
    address2 = models.CharField(
        "Address line 2",
        max_length=1024,
        blank=True,
        default=''
    )
    zip_code = models.CharField(
        "ZIP / Postal code",
        max_length=12,
    )
    city = models.CharField(
        "City",
        max_length=1024,
    )
    country = models.CharField(
        "Country",
        max_length=3,
        default='USA',
    )
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list

    def __str__(self):
        return "Location record for {0}".format(self.name)

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        verbose_name="the location of the event",
    )

    def __str__(self):
        return "{0} on {1}".format(self.name, self.date)

class EventPromoter(models.Model):

    actions = ['generate_qr_code']

    event = models.ForeignKey(
        Event,
        on_delete=models.PROTECT,
        verbose_name="the event",
    )
    promoter = models.ForeignKey(
        Promoter,
        on_delete=models.PROTECT,
        verbose_name="the promoter",
    )

    def generate_qr_code(self):
        location = '{BASE_URL}/api/event_promoter/{promoter_id}/'.format(
            BASE_URL = settings.APP_LOCATION,
            promoter_id = self.pk
        )
        img = qrcode.make(location)
        return img 
    
    def __str__(self):
        print(self.__dict__)
        return "{0} {1} promotion for event: {2}".format(self.promoter.first_name, self.promoter.last_name, self.event.name)

class EventPromoterRegister(models.Model):
    event_promoter = models.ForeignKey(
        EventPromoter,
        on_delete=models.DO_NOTHING,
        verbose_name="the event promoter",
    )
    timestamp = models.DateTimeField(auto_now_add=True)
