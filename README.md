# Speed Freaks

Speed Freaks is a web application designed for use within the high performance driving and racing communities. Through my own involvement it became apparent to me that those seeking to enjoy such racing events needed to scan many different sites as there was no single website to register for events at a particular track. Those organizing these events were also asked to give more time than should be necessary to plan, prepare, and answer questions. This app aims to address those issues by creating a single source on the web for multiple car clubs to create content and handle registration on the same site. Users would also only ever need a single site to check out racing events and register, saving time and possibly increasing awareness for such events.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

- Create a new database and tables within that database by executing the queries in the `database.sql` file within this project.

- If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Also in the `.env` file, add AWS key and S3 bucket information if you would like to use the image uploading feature. If you do not yet have an AWS developer account you will need to set that up first before being able to use the image uploading feature.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Deployment

In order to get the project up on a live system, first run `npm run build` in terminal. This will create a build folder that contains the code your deployment service will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update. When the final build is completed and tested push to Heroku or a similar hosting service.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`
