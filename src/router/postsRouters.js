import { Router } from 'express';
import { alterPost, deletePost, getPosts, registerPost } from '../controller/postControllers.js';
import { postSchema } from '../schemas/postSchema.js';

const postRouters = Router();

postRouters.get("/posts", getPosts);
postRouters.post("/posts"), postSchema ,registerPost;
postRouters.put("/posts", alterPost);
postRouters.delete("/posts", deletePost);

export default postRouters;
