from django.conf import settings # import the settings file

def app_constants(request):
    # return the value you want as a dictionary. you may add multiple values in there.
    return {'APP_DISPLAY_NAME': settings.APP_DISPLAY_NAME}