#!/bin/bash

. ./local_vars.sh
environment="development"

while getopts e: flag
do
    case "${flag}" in
        e) environment=${OPTARG};;
    esac
done

if [ $environment == "production" ]
    then
        heroku config:set DATABASE_URL=$DATABASE_URL;
        heroku config:set DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY;
        heroku config:set QR_APP_LOCATION=$QR_APP_LOCATION;
        heroku config:set DJANGO_ENV=production;
        heroku config:set DISABLE_COLLECTSTATIC=1;
        heroku config:set WEB_CONCURRENCY=3;
fi
if [ $environment = "development" ]
    then
        echo dev env
fi