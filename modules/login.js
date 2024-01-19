import { Router } from 'express';
import db from '../utils/db.js';
import encrypt from '../utils/encrypt.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        let { email, password } = req.body;
        query = "SELECT * FROM users WHERE email = ? AND password = ?"
        password = await encrypt(password);
        const res = await db.query(query, [email, password]);
        if (res.length) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    } catch (error) {
        next(error);
    }
});

export default router;