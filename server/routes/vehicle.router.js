const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "vehicle"
    WHERE "user_id" = $1`;

    const queryValues = [ req.user.id ];

    pool.query(queryText, queryValues)
        .then((result) => { 
            res.send(result.rows) 
        })
        .catch((error) => {
            console.log('error in vehicle.router.js in making GET request', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/add', (req, res) => {
    const queryText = `INSERT INTO "vehicle" ("make", "model", "year", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

    const queryValues = [
        req.body.make,
        req.body.model,
        req.body.year,
        req.user.id,
    ]

    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('error in vehicle.router.js with new vehicle post, error:', error);
        res.sendStatus(500);
    })
});

module.exports = router;