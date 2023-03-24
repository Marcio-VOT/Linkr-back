import { Router } from "express";
import {
  search,
  searchUserData,
  searchUserPosts,
} from "../controller/searchController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { offsetDateSchema } from "../schemas/offsetConfigSchema.js";

const searchRouter = Router();

searchRouter.get("/search/:user", search);
searchRouter.get(
  "/posts/:id",
  validateSchema(offsetDateSchema),
  searchUserPosts
);
searchRouter.get("/data/:id", searchUserData);

export default searchRouter;
