import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.send('It works');
});

export default homeController;