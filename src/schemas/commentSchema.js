import joi from "joi";

export const commentSchema = joi.object({
    userId: joi.number().required(),
    postId: joi.number().required(),
    comment: joi.string().required()
});