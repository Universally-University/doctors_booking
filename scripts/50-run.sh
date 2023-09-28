#!/bin/bash

set -e

if [ $UID -eq 0 ]
then
    service gunicorn start
else
    sudo service gunicorn start
fi
