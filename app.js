import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './utils/db.js';

import { verifyToken } from './utils/tokenValidator.js';

// Modules
import loginManager from './modules/login.js';
import userManager from './modules/user.js';
import postManager from './modules/post.js';

dotenv.config();

const app = express();
// app.use(express.static('public'));
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://localhost:8082',
        'http://192.168.8.146:3000',
        'http://192.168.8.146:8080',
        'https://mujlinkedin.vercel.app',
    ],
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(bodyParser.json());

app.use('/login', loginManager);
app.use('/user', userManager);
app.use('/post', postManager);

app.get('/avatar.png', (req, res) => {
    res.sendFile('public/avatar.png', { root: '.' });
});

app.get('/verify', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    console.log(decoded);
    res.json({ success: true });
});

app.get('/search', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const query = `SELECT * FROM "Users" WHERE LOWER("displayName") LIKE $1`;
        const username = req.query.query;
        console.log(username);
        const data = await db.query(query, [username + '%']);
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: 'Unknown error occured' });
        next(error);
    }
});

if (!process.env.VERCEL) {
    app.listen(port, "0.0.0.0", () => {
        console.log("Running at port " + port);
    })
}

export default app;
