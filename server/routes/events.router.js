const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // Sends user 403 status if they are not logged in

// Database query to fetch all data from 'event' table
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "event"`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // end fetch events query

// Database query to fetch all events from 'user_event' and 'event' tables that a user has registered for 
router.get('/my-registered', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "event_name", "event_date_start", "event_date_end", "user_id", "event_id", "registration_complete" FROM "event"
    JOIN "user_event" ON "user_event"."event_id" = "event"."id"
    WHERE "user_id" = $1`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // End fetch my registered events query

// Database query to add new row to 'user_event' junction table on event registration
router.post('/register', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "user_event" ("user_id", "event_id")
    VALUES ($1, $2)`;

    const queryValues = [
        req.user.id,
        req.body.id,
    ];

    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendStatus(500);
        });
}); // End register for event query

// Database query for an admin to post a new track event to 'event' table
router.post('/create', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "event" ("event_name", "event_date_start", "event_date_end", "upcoming_description", "details_description", "admin_contact", "created_id", "image_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    const queryValues = [
        req.body.eventTitle,
        req.body.eventStartDate,
        req.body.eventEndDate,
        req.body.upcomingDescription,
        req.body.detailsDescription,
        req.body.organizerContact,
        req.user.id,
        req.body.imageUrl,
    ];

    // Verifies that user has authorization to use this route
    if (req.user.is_admin === true) {
        pool.query(queryText, queryValues)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(() => {
                res.sendStatus(500);
            })
    } else {
        res.send(403);
    }
}) // End create event query

// Database query for the creator of an event to edit that event
router.put('/edit/:id', rejectUnauthenticated, async (req, res) => {

    const connection = await pool.connect();
    let result;

    try {
        await connection.query('BEGIN;');

        result = await connection.query(`SELECT * from "event" WHERE "id" = $1`, [req.params.id]);
        // Verifies the user is the creator of the event
        if (result.rows[0].created_id === req.user.id) {
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

            result = await connection.query(queryText, queryValues);

            await connection.query(`COMMIT;`);

            res.send(result.rows);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        await connection.query(`ROLLBACK;`);

        res.sendStatus(500);
    } finally {
        connection.release();
    }
}) // End edit event

// Database query for the creator of an event to delete that event
router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();
    let result;

    try {
        await connection.query('BEGIN;');
        
        result = await connection.query(`SELECT * FROM "event" WHERE "id" = $1`, [req.params.id]);
        // Verifies the user is the creator of the event
        if (result.rows[0].created_id === req.user.id) {
            await connection.query(`DELETE FROM "user_event" WHERE "event_id" = $1`, [req.params.id]);

            await connection.query(`DELETE FROM "event" WHERE "id" = $1`, [req.params.id]);

            await connection.query(`COMMIT;`);

            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        await connection.query(`ROLLBACK;`);

        res.sendStatus(500);
    } finally {
        connection.release();
    }
}) // End delete event query

module.exports = router;