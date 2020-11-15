from django.contrib import admin
from .models import Promoter, Location, Event, EventPromoter, EventPromoterRegister
from django.utils.html import format_html
from django.urls import reverse
from django.conf.urls import url
from django.http import HttpResponse
import io

class EventPromoterAdmin(admin.ModelAdmin):
    list_display = ('id', 'promoter', 'event', 'event_promoter_actions')
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            url(
                r'^(?P<ep_id>.+)/download_qr_code/$',
                self.admin_site.admin_view(self.download_qr_code),
                name='download_qr_code',
            )
        ]
        return custom_urls + urls

    def event_promoter_actions(self, obj):
        return format_html(
            '<a class="button" href="{}">Generage QR Code </a>&nbsp;',
            reverse('admin:download_qr_code', args=[obj.pk])
            )
    def download_qr_code(self, request, ep_id):
        event_promoter = EventPromoter.objects.get(pk=ep_id)
        img = event_promoter.generate_qr_code()
        """
        download code to computer
        """
        with io.BytesIO() as output:
            img.save(output)
            contents = output.getvalue()
            response = HttpResponse(contents, content_type="image/gif")
            response['Content-Disposition'] = 'attachment; filename=' + "{0}_{1}_{2}_qr_code.gif".format(
                event_promoter.promoter.first_name if event_promoter.promoter.first_name else '',
                event_promoter.promoter.last_name if event_promoter.promoter.last_name else '',
                event_promoter.event.name if event_promoter.event.name else ''
                )
            return response

class EventPromoterRegisterAdmin(admin.ModelAdmin):
    list_display = ('event_promoter', 'timestamp')

        
        

admin.site.register(Promoter)
admin.site.register(Location)
admin.site.register(Event)
admin.site.register(EventPromoter, EventPromoterAdmin)
admin.site.register(EventPromoterRegister, EventPromoterRegisterAdmin)