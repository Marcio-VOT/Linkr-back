import { Router } from "express";
import { getLikes, removeLike, likeByPost, getTwoUsers, getYouLike} from "../controller/likeController.js";

const likeRouter = Router()

likeRouter.post('/getLikes', getLikes)
likeRouter.post('/newLike',likeByPost)
likeRouter.post('/removeLike',removeLike)
likeRouter.post('/twoUsers',getTwoUsers)
likeRouter.post('/youLike',getYouLike)

export default likeRouter