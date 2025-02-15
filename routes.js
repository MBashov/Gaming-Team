import { Router } from "express";
import homeController from "./src/controllers/homeController.js";

const routes = Router();

routes.use(homeController);

export default routes;