import { Router } from "express";
import {
  search,
  searchUserData,
  searchUserPosts,
} from "../controller/searchController.js";
import { validateQuerySchema } from "../middlewares/validateQuerySchema.js";
import { offsetDateSchema } from "../schemas/offsetConfigSchema.js";

const searchRouter = Router();

searchRouter.get("/search/:user", search);
searchRouter.get(
  "/posts/:id",
  validateQuerySchema(offsetDateSchema),
  searchUserPosts
);
searchRouter.get("/data/:id", searchUserData);

export default searchRouter;
