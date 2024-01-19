import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Modules
import loginManager from './modules/login.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));

app.use('/login', loginManager);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
