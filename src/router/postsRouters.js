import { Router } from 'express';
import { alterPost, deletePost, getPosts, registerPost } from '../controller/postControllers.js';
import validatePost from '../middlewares/validatePost.js';

const router = Router();

router.get("/posts", getPosts);
router.post("/posts", validatePost, registerPost);
router.put("/posts/:id", alterPost);
router.delete("/posts/:id", deletePost);

export default router;
