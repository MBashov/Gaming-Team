import { application, Router } from "express";

import authService from "../services/authService.js";
import { AUTH_TOKEN_NAME } from "../../config.js";


const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie(AUTH_TOKEN_NAME, token, { httpOnly: true });

    res.redirect('/');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    const token = await authService.register(userData);

    res.cookie(AUTH_TOKEN_NAME, token, { httpOnly: true });
    res.redirect('/');

});

authController.get('/logout', (req, res) => {
    res.clearCookie(AUTH_TOKEN_NAME);
    res.redirect('/');
});

export default authController;