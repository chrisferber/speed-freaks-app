-- Please copy and paste these sql queries to run is your postgresql database to get up and running.
-- Database name is 'prime_app', if you would like to name your database something else you will need to change 'prime_app' to your new datbase name in server/modules/pool.js.

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (200) UNIQUE NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "vehicle" (
"id" SERIAL PRIMARY KEY,
"make" VARCHAR (100) NOT NULL,
"model" VARCHAR (100) NOT NULL,
"year" INT NOT NULL,
"user_id" INT NOT NULL REFERENCES "user"
);

CREATE TABLE "event"
(
    "id" SERIAL PRIMARY KEY,
    "event_name" VARCHAR (300) UNIQUE NOT NULL,
    "event_date_start" DATE,
    "event_date_end" DATE,
    "upcoming_description" TEXT NOT NULL,
    "details_description" TEXT NOT NULL,
    "admin_contact" VARCHAR (500) NOT NULL,
    "created_id" INT,
    "image_url" VARCHAR (300)
);

CREATE TABLE "user_event"
(
    "user_id" INT NOT NULL REFERENCES "user",
    "event_id" INT NOT NULL REFERENCES "event",
    "registration_complete" boolean NOT NULL DEFAULT false,
        PRIMARY KEY ("user_id", "event_id")
);