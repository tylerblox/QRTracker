from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import authentication, permissions

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import HttpResponseRedirect

from django.conf import settings

from . import serializers
from qrtracker.models import *

from django.db.models import Prefetch, F, Count

class EventPromoterViewSet(viewsets.ModelViewSet):
    queryset = EventPromoter.objects.all()
    serializer_class = serializers.EventPromoterSerializer

    def retrieve(self, request, pk):
        if not (request.user and request.user.is_authenticated):
            return HttpResponseRedirect(redirect_to=settings.LANDING_URL)
        
        event_promoter = get_object_or_404(self.queryset, id=int(pk))

        serializer = serializers.EventPromoterSerializer(event_promoter)

        return Response(serializer.data)

class EventPromoterRegisterViewSet(viewsets.ModelViewSet, APIView):

    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    queryset = EventPromoterRegister.objects.all()

    serializer_class = serializers.EventPromoterRegisterSerializer

class EventStatisticsViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    queryset = Event.objects.all().prefetch_related(
        Prefetch(
            'eventpromoter_set',
            queryset=EventPromoter.objects.all().annotate(
                registration_count=Count(F('eventpromoterregister'))
            ),
            to_attr="event_promoters"
        )
     
     )

    serializer_class = serializers.EventStatisticsSerializer
    
        