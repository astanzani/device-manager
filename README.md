# device-manager

App can be accessed on: https://device-manager-app.herokuapp.com/. May take a little while to load as it's hosted on a free heroku dyno.

# Project structure

Project is structured as a monorepo. `backend` contains the `node.js` app, and `frontend` contains the code for the `angular` app.

## backend

Node.js + express app. Serves the frontend app and it's static resources. Saves data on a MySQL database, which is hosted on aws rds.

## frontend

Angular app exposing a UI for managing generic devices. Exposes Create / Read / Delete (No update) for devices & categories.
