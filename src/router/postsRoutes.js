import { Router } from "express";
import {
  alterPost,
  countNewPosts,
  deletePost,
  getCountRepost,
  getPosts,
  registerPost,
  postRepost
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
  "/re-posts/:postId",
  validateToken,
  getCountRepost
);

postsRouter.post(
  "/re-posts/:id",
  validateToken,
  postRepost
);

postsRouter.post("/posts", validateToken, validatePost, registerPost);
postsRouter.put("/posts/:id", validateToken, alterPost);
postsRouter.delete("/posts/:id", validateToken, deletePost);
postsRouter.get(
  "/posts/count",
  validateToken,
  validateQuerySchema(offsetDateSchema),
  countNewPosts
);

export default postsRouter;
