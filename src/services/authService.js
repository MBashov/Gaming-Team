import bcrypr from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";
import { JWT_SECRET } from "../../config.js";

export default {
    async register(userData) {

        if (userData.password !== userData.rePassword) {
            throw new Error("Password don\'t match");
        }

        const user = await User.findOne({ email: userData.email }).select({ id: true });
        if (user) {
            throw new Error("User with this email already exist");
        }

        return User.create(userData);
    },

    async login(email, password) {

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Wrong email or possword");
        }

        const isValid = await bcrypr.compare(password, user.password);
        if (!isValid) {
            throw new Error("Wrong email or possword");
        }

        const paylod = {
            id: user.id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(paylod, JWT_SECRET, { expiresIn: '2h' });

        return token;
    }
}