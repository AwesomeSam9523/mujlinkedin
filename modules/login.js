import { Router } from 'express';
import db from '../utils/db.js';
import encrypt from '../utils/encrypt.js';
import { generateToken, verifyToken } from '../utils/tokenValidator.js';

const router = Router();

function generateUserId() {
    return Math.floor(Math.random() * 1000000).toString();
}

router.post('/', async (req, res, next) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        // check if email exists
        const query1 = `SELECT * FROM "UserLogins" WHERE "email" = $1 LIMIT 1`;
        const data = await db.query(query1, [email]);
        if (data.rowCount === 0) {
            res.status(404).json({ message: 'Account does not exist' });
            return;
        }

        const query2 = `SELECT * FROM "UserLogins" WHERE "email" = $1 AND "password" = $2 LIMIT 1`;
        password = await encrypt(password);
        const data2 = await db.query(query2, [email, password]);
        if (data2.rowCount > 0) {
            const token = generateToken(data.rows[0].userId);
            res.json({ message: 'Login successful', token: token });
        } else {
            res.status(401).json({ message: 'Invalid username/password' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/new', async (req, res, next) => {
    try {
        let { email, password, name } = req.body;
        email = email.toLowerCase();
        // start a transaction
        await db.query('BEGIN');

        // check if email exists
        const query1 = `SELECT * FROM "UserLogins" WHERE "email" = $1 LIMIT 1`;
        const data = await db.query(query1, [email]);
        if (data.rowCount > 0) {
            await db.query('ROLLBACK');
            res.status(409).json({ message: 'Email already exists' });
            return;
        }

        const userId = generateUserId();
        const query = `INSERT INTO "UserLogins" ("userId", "email", "password") VALUES ($1, $2, $3)`;
        password = await encrypt(password);
        await db.query(query, [userId, email, password]);

        const query2 = `INSERT INTO "Users" ("userId", "email", "displayName") VALUES ($1, $2, $3)`;
        await db.query(query2, [userId, email, name]);

        const token = generateToken(userId);
        await db.query('COMMIT');
        res.status(200).json({ message: 'User created', token: token });

    } catch (error) {
        await db.query('ROLLBACK');
        console.log(error);
        next(error);
    }
});

export default router;