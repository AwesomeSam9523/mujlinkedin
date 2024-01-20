import { Router } from 'express';
import db from '../utils/db.js';
import encrypt from '../utils/encrypt.js';
import { generateToken, verifyToken } from '../utils/tokenValidator.js';

const router = Router();

router.get('/', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const query = `SELECT * FROM "Users" WHERE "userId" = $1`;
        const data = await db.query(query, [sub.userId]);
        res.status(200).json(data.rows[0]);
    } catch (error) {
        next(error);
    }
});


export default router;