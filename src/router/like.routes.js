import { Router } from "express";
import {
  getLikes,
  removeLike,
  likeByPost,
  getTwoUsers,
  getYouLike,
} from "../controller/likeController.js";
import validateToken from "../middlewares/validateToken.js";

const likeRouter = Router();

likeRouter.post("/getLikes", validateToken, getLikes);
likeRouter.post("/newLike", validateToken, likeByPost);
likeRouter.post("/removeLike", validateToken, removeLike);
likeRouter.post("/twoUsers", validateToken, getTwoUsers);
likeRouter.post("/youLike", validateToken, getYouLike);

export default likeRouter;
