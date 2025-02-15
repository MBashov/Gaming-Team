import { AUTH_TOKEN_NAME, JWT_SECRET } from "../../config.js"
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {

    const token = req.cookies[AUTH_TOKEN_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        req.locals.user = decodedToken;

        next();
    } catch (err) {
        res.clearCookie(AUTH_TOKEN_NAME);
        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {

    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};

export const isGuest = (req, res, next) => {

    if (req.user) {
        res.setError('You are already logged in');
        return res.redirect('/');
    }

    next();
}
