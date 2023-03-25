import { Router } from 'express';
import { getComments, registerComment } from '../controller/commentsController.js';
import validateComment from '../middlewares/validateComment.js';
import validateToken from '../middlewares/validateToken.js';

const commentsRouter = Router();

commentsRouter.get("/comments/:id",validateToken, getComments);
commentsRouter.post("/comments", validateToken, validateComment, registerComment);

export default commentsRouter;
