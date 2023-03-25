import { Router } from "express";
import {
  search,
  searchUserData,
  searchUserPosts,
} from "../controller/searchController.js";
import { validateQuerySchema } from "../middlewares/validateQuerySchema.js";
import { offsetDateSchema } from "../schemas/offsetConfigSchema.js";
import validateToken from "../middlewares/validateToken.js";

const searchRouter = Router();

searchRouter.get("/search/:user", validateToken, search);
searchRouter.get(
  "/posts/:id",
  validateToken,
  validateQuerySchema(offsetDateSchema),
  searchUserPosts
);
searchRouter.get("/data/:id", searchUserData);

export default searchRouter;
