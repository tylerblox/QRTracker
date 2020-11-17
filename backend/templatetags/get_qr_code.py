from django import template
from django.urls import reverse

register = template.Library()

@register.inclusion_tag('../templates/qr_code_img.html', takes_context=True)
def get_qrcode_image(context, id, size):
    url = reverse('make-ticket')
    return {'url': url, 'id':id, 'size': size}