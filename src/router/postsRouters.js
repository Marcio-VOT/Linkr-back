import { Router } from 'express';
import { alterPost, deletePost, getPosts, registerPost } from '../controller/postControllers.js';
import { postSchema } from '../schemas/postSchema.js';

const router = Router();

router.get("/posts", getPosts);
router.post("/posts"), postSchema ,registerPost;
router.put("/posts", alterPost);
router.delete("/posts", deletePost);

export default router;
