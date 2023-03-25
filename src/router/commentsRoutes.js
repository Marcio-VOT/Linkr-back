import { Router } from 'express';
import { getComments, registerComment } from '../controller/commentsController.js';
import validateComment from '../middlewares/validateComment.js';
import validateToken from '../middlewares/validateToken.js';

const router = Router();

router.get("/comments/:id",validateToken, getComments);
router.post("/comments", validateToken, validateComment, registerComment);

export default router;
