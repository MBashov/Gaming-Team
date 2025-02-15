import { Router } from "express";

import authService from "../services/authService.js";


const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    authService.register(userData);
    res.redirect('/auth/register')

});

export default authController;