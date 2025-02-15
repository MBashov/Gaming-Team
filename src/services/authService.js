import bcrypr from 'bcrypt';

import User from "../models/User.js";
import { genereteToken } from '../utils/authUtil.js';

export default {
    async register(userData) {

        if (userData.password !== userData.rePassword) {
            throw new Error("Password don\'t match");
        }

        const user = await User.findOne({ email: userData.email }).select({ id: true });
        if (user) {
            throw new Error("User with this email already exist");
        }

        const createdUser = await User.create(userData);
        
        const token = genereteToken(createdUser);
        return token;
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

        const token = genereteToken(user);
        return token;
    }
}