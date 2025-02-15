import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../config.js";

export const genereteToken = (user) => {

    const paylod = {
        id: user.id,
        username: user.username,
        email: user.email,
    }

    const token = jwt.sign(paylod, JWT_SECRET, { expiresIn: '2h' });

    return token;
}