import { createHash } from 'crypto';

const encrypt = async (password) => {
    const salt = process.env.SALT;
    const hash = Buffer.from(createHash('sha256').update(password + salt).digest('hex')).toString('base64');
    return hash;
}

export default encrypt;