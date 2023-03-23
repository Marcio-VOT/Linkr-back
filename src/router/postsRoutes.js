import { Router } from 'express';
import { alterPost, deletePost, getPosts, registerPost } from '../controller/postControllers.js';
import validatePost from '../middlewares/validatePost.js';
import validateToken from '../middlewares/validateToken.js'

const router = Router();

router.get("/posts",validateToken, getPosts);
router.post("/posts", validateToken, validatePost, registerPost);
router.put("/posts/:id",validateToken, alterPost);
router.delete("/posts/:id",validateToken, deletePost);

export default router;
