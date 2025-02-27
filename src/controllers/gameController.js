import { Router } from "express";
import gameService from "../services/gameService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getPlatformTypes from "../utils/getPlatformTypes.js";

const gameController = Router();

gameController.get('/catalog', async (req, res) => {
    try {
        const games = await gameService.getAll();

        res.render('games/catalog', { games });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

gameController.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.getOne(gameId);
        res.render('games/details', { game });

    } catch (err) {

    }
});

gameController.get('/create', isAuth, (req, res) => {
    const platformTypes = getPlatformTypes();
    res.render('games/create', { platformTypes });
});

gameController.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;

    try {
        await gameService.create(gameData, req.user.id);
        res.redirect('/games/catalog');
    } catch (err) {
        const platformTypes = getPlatformTypes(gameData.platform);
        res.render('games/create', { game: gameData, platformTypes, error: getErrorMessage(err) });
    }
});

export default gameController;