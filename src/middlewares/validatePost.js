import { postSchema } from "../schemas/postSchema.js";

export default function validatePost(req, res, next){
    const validation = postSchema.validate(req.body);

    if(validation.error){
        return res.send("There was an error publishing your link").status(422);
    }

    next();
}