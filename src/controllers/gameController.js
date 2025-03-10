import { Router } from "express";
import gameService from "../services/gameService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getPlatformTypes from "../utils/getPlatformTypes.js";

const gameController = Router();

gameController.get('/catalog', async (req, res) => {
    try {
        const games = await gameService.getAll();

        res.render('game/catalog', { games });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

gameController.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.getOne(gameId);

        const isOwner = game.owner.equals(req.user?.id);

        const isBought = game.boughtBy.includes(req.user?.id);

        res.render('game/details', { game, isOwner, isBought });

    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('404');
    }
});

gameController.get('/create', isAuth, (req, res) => {
    const platformTypes = getPlatformTypes();
    res.render('game/create', { platformTypes });
});

gameController.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;

    try {
        await gameService.create(gameData, req.user.id);
        res.redirect('/games/catalog');
    } catch (err) {
        const platformTypes = getPlatformTypes(gameData.platform);
        res.render('game/create', { game: gameData, platformTypes, error: getErrorMessage(err) });
    }
});

gameController.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameService.buy(gameId, req.user.id);
    } catch (err) {
        res.setError(getErrorMessage(err));
    }
    res.redirect(`/games/${gameId}/details`);
});

gameController.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameService.delete(gameId, req.user.id);
        res.redirect('/games/catalog');
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect(`/games/${gameId}/details`);
    }

});

gameController.get('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.getOne(gameId);

        if (!game.owner.equals(req.user.id)) {
            throw new Error('You are not authorized for this action');
        }

        const platformTypes = getPlatformTypes(game.platform);
        res.render('game/edit', { game, platformTypes });

    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect(`/games/${gameId}/details`);
    }

});

gameController.post('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        const game = await gameService.getOne(gameId);

        if (!game.owner.equals(req.user.id)) {
            throw new Error('You are not authorized for this action');
        }

        await gameService.update(gameId, gameData);
        res.redirect(`/games/${gameId}/details`);
    } catch (err) {
        const platformTypes = getPlatformTypes(gameData.platform);
        res.render('game/edit', { game: gameData, platformTypes, error: getErrorMessage(err) });
    }
});

gameController.get('/search', async (req, res) => {
    const { name, platformType } = req.query;
    const platformTypes = getPlatformTypes(platformType);

    try {
        const games = await gameService.getAll({ name, platformType });
        res.render('game/search', { games, platformTypes });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

export default gameController;