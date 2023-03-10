import { Router } from "express";
import {
  search,
  searchUserData,
  searchUserPosts,
} from "../controller/searchController.js";

const searchRouter = Router();

searchRouter.get("/search/:user", search);
searchRouter.get("/posts/:id", searchUserPosts);
searchRouter.get("/data/:id", searchUserData);

export default searchRouter;
