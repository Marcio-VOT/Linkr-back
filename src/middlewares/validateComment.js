import { commentSchema } from "../schemas/commentSchema.js";

export default function validateComment(req, res, next){
    const validation = commentSchema.validate(req.body);

    if(validation.error){
        return res.send("There was an error publishing your comment").status(422);
    }

    next();
}