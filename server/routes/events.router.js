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
            console.log('error in router.post in events.router.js to register for an event, ', error);
            res.sendStatus(500);
        });


});

router.post('/create', (req, res) => {
    const queryText = `INSERT INTO "event" ("event_name", "event_date_start", "event_date_end", "upcoming_description", "details_description", "admin_contact", "created_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    console.log('router.post for create event, user id is:', req.user);
    console.log('router.post for create event, req.body is:', req.body);
    const queryValues = [
        req.body.eventTitle,
        req.body.eventStartDate,
        req.body.eventEndDate,
        req.body.upcomingDescription,
        req.body.detailsDescription,
        req.body.organizerContact,
        req.user.id,
    ];
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in router.post in events.router.js to create an event,', error);
            res.sendStatus(500);
        })
})

router.put('/edit/:id', (req, res) => {
    pool.query(`SELECT * from "event"
    WHERE "id" = $1`, [req.params.id])
        .then((result) => {

            const admin = result.rows[0].created_id;
            if (admin === req.user.id) {
                const queryText = `UPDATE "event"
                SET "event_name" = $1,
                "event_date_start" = $2,
                "event_date_end" = $3,
                "upcoming_description" = $4,
                "details_description" = $5,
                "admin_contact" = $6
                WHERE "id" = $7
                RETURNING *`;

                const queryValues = [
                    req.body.eventTitle,
                    req.body.eventStartDate,
                    req.body.eventEndDate,
                    req.body.upcomingDescription,
                    req.body.detailsDescription,
                    req.body.organizerContact,
                    req.params.id,
                ];
                pool.query(queryText, queryValues)
                .then((result) => {
                    res.send(result.rows);
                })
                .catch((error) => {
                    console.log('error making put request to edit event in events.router.js with:', error);
                    res.sendStatus(500);
                })
            } else {
                console.log('user is not authorized to edit this event. /edit/:id in events.router.js');
                res.sendStatus(500);
            }
        })
})

router.delete('/delete/:id', (req, res) => {
    pool.query(`SELECT * FROM "event" WHERE "id" = $1`, [req.params.id])
    .then((result) => {
        const admin = result.rows[0].created_id;
        if (admin === req.user.id) {
            pool.query(`DELETE FROM "user_event" WHERE "event_id" = $1`, [req.params.id])
            .then(() => {
                pool.query(`DELETE FROM "event" WHERE "id" = $1`, [req.params.id])
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('delete event in events.router.js failed with:', error);
                res.sendStatus(500);
            })
        } else {
            console.log('user is not authorized to delete this event. /delete/:id in events.router.js');
            res.sendStatus(500);
        }
    })
})


module.exports = router;