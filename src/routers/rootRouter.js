import express from "express";
import { getHome, postHome } from "../controllers/homeController";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome).post(postHome);

export default rootRouter;
