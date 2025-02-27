import Game from "../models/Game.js";

export default {
    create(gameData, userId) {
        return Game.create({...gameData, owner: userId});
    },
    getAll() {
        return Game.find();
    },
    getOne(id) {
        return Game.findById(id);
    }
}