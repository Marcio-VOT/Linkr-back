import { Router } from "express";
import {
  alterPost,
  deletePost,
  getCountRepost,
  getPosts,
  registerPost,
} from "../controller/postControllers.js";
import validatePost from "../middlewares/validatePost.js";
import { validateQuerySchema } from "../middlewares/validateQuerySchema.js";
import validateToken from "../middlewares/validateToken.js";
import { offsetDateSchema } from "../schemas/offsetConfigSchema.js";

const postsRouter = Router();

postsRouter.get(
  "/posts",
  validateToken,
  validateQuerySchema(offsetDateSchema),
  getPosts
);

postsRouter.get(
  "/re-posts/:id",
  validateToken,
  getCountRepost
);

postsRouter.post(
  "/re-posts/:id",
  validateToken,

);

postsRouter.post("/posts", validateToken, validatePost, registerPost);
postsRouter.put("/posts/:id", validateToken, alterPost);
postsRouter.delete("/posts/:id", validateToken, deletePost);

export default postsRouter;
