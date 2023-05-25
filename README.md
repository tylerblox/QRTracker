Format of application inspired by: https://fractalideas.com/blog/making-react-and-django-play-well-together-hybrid-app-model/

QR Code scanning app for use in event ticketing.

Admins can generate QR codes for promoters, when a permissioned user scans tickets from their phone, the promoter will be credited for bringing in business.

## To run application in development:

* start frontend server `npm start`
* start backend server for development `DJANGO_ENV=development ./manage.py runserver`'
* use localhost:8000 for app.
