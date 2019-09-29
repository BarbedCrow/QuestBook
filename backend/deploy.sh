#!/bin/bash
set -e

MAIN_DIR=/var/www/questbook
ROOT_DIR=/var/www/questbook/QuestBook
BACKEND_DIR=/var/www/questbook/backend
FRONTEND_DIR=/var/www/questbook/frontend
STATIC_DIR=/var/www/questbook/static
rm -r $BACKEND_DIR 2> /dev/null || true
rm -r $FRONTEND_DIR 2> /dev/null || true
rm -r $STATIC_DIR 2> /dev/null || true
mkdir -p $BACKEND_DIR
mkdir -p $FRONTEND_DIR
mkdir -p $STATIC_DIR

echo copying files to $BACKEND_DIR and $FRONTEND_DIR...
cp -r $ROOT_DIR/backend/* $BACKEND_DIR
cp -r $ROOT_DIR/admin-frontend/* $FRONTEND_DIR
echo done

cd $FRONTEND_DIR
echo installing frontend dependencies...
npm install --save
echo building frontend...
npm run build

echo copying index.html to $BACKEND_DIR/templates
mkdir $BACKEND_DIR/templates
cp $FRONTEND_DIR/build/index.html $BACKEND_DIR/templates
echo copying static files to $STATIC_DIR...
cp -r $FRONTEND_DIR/build/* $STATIC_DIR
rm $STATIC_DIR/index.html

echo updating pip packages...
$MAIN_DIR/.env/bin/pip install -r $ROOT_DIR/backend/requirements.txt

echo copying local settings...
cp $MAIN_DIR/local_settings.py $BACKEND_DIR/questbook

echo applying database migrations...
$MAIN_DIR/.env/bin/python $BACKEND_DIR/manage.py migrate

echo restarting questbook...
supervisorctl restart questbook
