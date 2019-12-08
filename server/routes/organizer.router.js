const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "event"
    WHERE "created_id" = $1`;

    const queryValues = [req.user.id];

    pool.query(queryText, queryValues)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
});

router.get('/attending/:id', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();
    let result;

    try {
        await connection.query('BEGIN;');

        result = await connection.query(`SELECT * from "event" WHERE "id" = $1`, [req.params.id]);
        const queryText = `SELECT "user"."username", "user"."email", "user_event"."user_id", "user_event"."event_id", "user_event"."registration_complete", "make", "model", "year" FROM "user"
        INNER JOIN "user_event" ON "user_event"."user_id" = "user"."id"
        INNER JOIN "vehicle" ON "vehicle"."user_id" = "user"."id"
        WHERE "user_event"."event_id" = $1
        ORDER BY "user"."id"`;

        if (result.rows[0].created_id === req.user.id) {
            result = await connection.query(queryText, [req.params.id]);

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
});

router.put('/complete-registration', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();
    let result;

    try {
        await connection.query('BEGIN;');

        result = await connection.query(`SELECT * from "event" WHERE "id" = $1`, [req.body.event_id]);

        const admin = result.rows[0].created_id;
        if (admin === req.user.id) {
            const queryText = `UPDATE "user_event"
            SET "registration_complete" = $1
            WHERE "user_id" = $2
            AND "event_id" = $3`;
            const queryValues = [
                !req.body.registration_complete,
                req.body.user_id,
                req.body.event_id
            ];

            result = await connection.query(queryText, queryValues);

            await connection.query(`COMMIT;`);

            res.send([req.body.event_id]);
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

module.exports = router;