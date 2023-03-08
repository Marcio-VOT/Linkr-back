import { Router } from "express";
import { getLikes, removeLike, likeByPost} from "../controller/likeController.js";

const likeRouter = Router()

likeRouter.post('/getLikes', getLikes)
likeRouter.post('/newLike',likeByPost)
likeRouter.post('/removeLike',removeLike)

export default likeRouter