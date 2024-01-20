import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { verifyToken } from './utils/tokenValidator.js';

// Modules
import loginManager from './modules/login.js';
import userManager from './modules/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
    ],
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(bodyParser.json());

app.use('/login', loginManager);
app.use('/user', userManager);

app.get('/', (req, res) => {
    res.send('Hello World!');
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
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
