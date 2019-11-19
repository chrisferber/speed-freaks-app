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

module.exports = router;