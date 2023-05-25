Format of application inspired by: https://fractalideas.com/blog/making-react-and-django-play-well-together-hybrid-app-model/

QR Code scanning app for use in event ticketing.

Admins can generate QR codes for promoters, when a permissioned user scans tickets from their phone, the promoter will be credited for bringing in business.

## To run application in development:

* start frontend server `npm start`
* start backend server for development `DJANGO_ENV=development ./manage.py runserver`'
* use localhost:8000 for app.

### Some thoughts about this project.

* I built this quickly to deploy on heroku, therefore the build files are stored in github which in general is a poor decision.
* I prefer these days to separate front and back end into separate repos using S3/cloudfront for frontend files, and heroku as an api.
