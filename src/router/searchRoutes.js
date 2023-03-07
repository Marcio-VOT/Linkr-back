import { Router } from "express";
import { search } from "../controller/searchController.js";

const searchRouter = Router();

searchRouter.get("/search/:user", search);

export default searchRouter;
