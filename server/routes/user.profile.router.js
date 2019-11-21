const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT "username", "email", "events" FROM "user";`;

    pool.query(queryText)
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('error in user.profile.router.js in making GET request', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;