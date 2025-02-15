import { Router } from "express";

import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";


const authController = Router();

authController.get('/login', isGuest, (req, res) => {
    console.log(req.user);
    
    res.render('auth/login');
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.redirect('/');
});

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    const token = await authService.register(userData);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.redirect('/');

});

authController.get('/logout',  (req, res) => {
    
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

export default authController;
