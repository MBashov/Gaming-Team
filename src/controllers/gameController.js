import { Router } from "express";

const gameController = Router();

gameController.get('/create', (req, res) => {
    res.render('games/create');
});

export default gameController;