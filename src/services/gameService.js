import Game from "../models/Game.js";

export default {
    create(gameData, userId) {
        return Game.create({ ...gameData, owner: userId });
    },
    getAll() {
        return Game.find();
    },
    getOne(gameId) {
        return Game.findById(gameId);
    },
    async buy(gameId, userId) {
        const game = await this.getOne(gameId);

        if (game.boughtBy.includes(userId)) {
            throw new Error('You have already bought this offer');
        }

        if (game.owner.equals(userId)) {
            throw new Error('You are not authorized for this action!');
        }

        game.boughtBy.push(userId);

        return await game.save();

    },
    async delete(gameId, userId) {
        const game = await this.getOne(gameId);

        if (!game.owner.equals(userId)) {
            throw new Error('You are not authorized for this action!');
        }

        await Game.findByIdAndDelete(gameId);
    },

    update(gameId, gameData) {
        return Game.findByIdAndUpdate(gameId, gameData, { runValidators: true });
    }
}