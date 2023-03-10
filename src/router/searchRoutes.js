import { Router } from "express";
import { search, searchUserPosts } from "../controller/searchController.js";

const searchRouter = Router();

searchRouter.get("/search/:user", search);
searchRouter.get("/posts/:id", searchUserPosts);

export default searchRouter;
