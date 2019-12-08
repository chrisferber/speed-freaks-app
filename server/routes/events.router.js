const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "event"`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

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
})


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
});

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
})

router.put('/edit/:id', rejectUnauthenticated, async (req, res) => {

    const connection = await pool.connect();
    let result;

    try {
        await connection.query('BEGIN;');

        result = await connection.query(`SELECT * from "event" WHERE "id" = $1`, [req.params.id]);

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
})

router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();
    let result;

    try {
        result = await connection.query(`SELECT * FROM "event" WHERE "id" = $1`, [req.params.id]);

        const admin = result.rows[0].created_id;

        if (admin === req.user.id) {
            await connection.query(`DELETE FROM "user_event" WHERE "event_id" = $1`, [req.params.id]);

            await connection.query(`DELETE FROM "event" WHERE "id" = $1`, [req.params.id]);

            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        await connection.query(`ROLLBACK;`);

        res.sendStatus(500);
    }
})

module.exports = router;