const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "event"
    WHERE "created_id" = $1`;

    const queryValues = [ req.user.id ];

    pool.query(queryText, queryValues)
        .then((result) => { 
            res.send(result.rows) 
        })
        .catch((error) => {
            console.log('error in organizer.router.js in making GET request', error);
            res.sendStatus(500);
        })
});

router.get('/attending/:id', (req, res) => {
    const queryText = `SELECT "user"."username", "user"."email", "user"."events", "user_event"."user_id", "make", "model", "year" FROM "user"
    INNER JOIN "user_event" ON "user_event"."user_id" = "user"."id"
    INNER JOIN "vehicle" ON "vehicle"."user_id" = "user"."id"
    WHERE "user_event"."event_id" = $1
    ORDER BY "user"."id"`
    ;
    console.log('req.params.id for /attending get in organizer.router.js:', req.params.id);

    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('result.rows for /attending get in organizer.router.js:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in organizer.router.js in /attending GET request', error);
        })
});


module.exports = router;