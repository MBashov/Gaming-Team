import { Router } from "express";
import gameService from "../services/gameService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getPlatformTypes from "../utils/getPlatformTypes.js";

const gameController = Router();

gameController.get('/create', (req, res) => {
    const platformTypes = getPlatformTypes();
    res.render('games/create', { platformTypes });
});

gameController.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;

    try {
        await gameService.create(gameData, req.user.id);
        res.redirect('/catalg');
    } catch (err) {
        const platformTypes = getPlatformTypes(gameData.platform);
        res.render('games/create', { game: gameData, platformTypes, error: getErrorMessage(err) });
    }
});

export default gameController;