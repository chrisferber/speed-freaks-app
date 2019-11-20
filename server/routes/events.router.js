const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "event"`;

    pool.query(queryText)
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('error in events.router.js in making GET request', error);
            res.sendStatus(500);
        })
});

router.post('/register', (req, res) => {
    const queryText = `INSERT INTO "user_event" ("user_id", "event_id")
    VALUES ($1, $2)`;
    console.log('router.post for register for event, user id is:', req.user);
    console.log('router.post for register for event, req.body is:', req.body);
    const queryValues = [
        req.user.id,
        req.body.id,
    ];
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in router.post in events.router.js, ', error);
            res.sendStatus(500);
        });


});

module.exports = router;