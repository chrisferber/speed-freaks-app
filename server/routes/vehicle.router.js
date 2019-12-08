const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
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
});

/**
 * POST route template
 */
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
});

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
        })
});

module.exports = router;