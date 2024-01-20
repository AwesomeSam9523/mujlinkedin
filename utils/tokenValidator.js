// use jwt to validate token
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

function verifyToken(token) {
    // verify token
    try {
        const decoded = verify(token, jwtSecret);
        decoded.userId = parseInt(decoded.userId);
        return decoded;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function generateToken(userId) {
    // generate token
    const token = jwt.sign({userId}, jwtSecret, { expiresIn: '1d' });
    return token;
}

export { verifyToken, generateToken };