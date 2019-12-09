const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // Sends user a 403 if they are not logged in

// HTTP request to fetch the vehicle of the user from 'vehicle' table
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "vehicle"
    WHERE "user_id" = $1`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // End fetch my vehicle HTTP request

// HTTP request for a user to add a vehicle to the 'vehicle' table
router.post('/add', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "vehicle" ("make", "model", "year", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

    const queryValues = [
        req.body.make,
        req.body.model,
        req.body.year,
        req.user.id,
    ];

    pool.query(queryText, queryValues)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // End add my vehicle HTTP request

// HTTP request for a user to update their vehicle in 'vehicle' table
router.put('/edit', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "vehicle"
    SET "make" = $1,
    "model" = $2,
    "year" = $3
    WHERE "user_id" = $4
    RETURNING *`;

    const queryValues = [
        req.body.make,
        req.body.model,
        req.body.year,
        req.user.id,
    ];

    pool.query(queryText, queryValues)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // End edit my vehicle HTTP request

module.exports = router;