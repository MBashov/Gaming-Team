import User from "../models/User.js";

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
    }
}