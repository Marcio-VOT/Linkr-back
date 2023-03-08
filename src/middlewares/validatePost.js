import { postSchema } from "../schemas/postSchema.js";

export default function validatePost(req, res, next){
    const validation = postSchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(422);
    }

    next();
}