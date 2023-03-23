import { Router } from 'express';
import { getComments, registerComment } from '../controller/commentsController';
import validateComment from '../middlewares/validateComment';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.get("/comments",validateToken, getComments);
router.post("/comments", validateToken, validateComment, registerComment);

export default router;
