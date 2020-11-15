from rest_framework import serializers
from qrtracker.models import EventPromoter, EventPromoterRegister, Location, Event

class LocationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Location
        fields = ('name', 'address1', 'address2', 'city')

class EventSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    class Meta: 
        model = Event
        fields = ('id', 'name', 'date', 'location')

class EventPromoterSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = EventPromoter
        fields = ['id', 'promoter_id', 'event']

class EventPromoterRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=EventPromoterRegister
        fields = ['id', 'event_promoter']
    
    def create(self, validated_data):
        e = EventPromoterRegister.objects.create(**validated_data)
        return e