import { Router } from 'express';
import { getComments, quantityComments, registerComment } from '../controller/commentsController.js';
import validateComment from '../middlewares/validateComment.js';
import validateToken from '../middlewares/validateToken.js';

const commentsRouter = Router();

commentsRouter.get("/comments/:id",validateToken, getComments);
commentsRouter.post("/comments", validateToken, validateComment, registerComment);
commentsRouter.get("/comments/post/:postId", validateToken, quantityComments)

export default commentsRouter;
