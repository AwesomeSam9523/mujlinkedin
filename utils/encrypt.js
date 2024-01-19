// encrypt a password
import { genSalt, hash as _hash } from 'bcrypt';
const saltRounds = 10;

const encrypt = async (password) => {
    const salt = await genSalt(saltRounds);
    const hash = await _hash(password, salt);
    return hash;
}

export default encrypt;