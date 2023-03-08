import joi from "joi";

export const postSchema = joi.object({
    description: joi.string(),
    externalLink: joi.string().required().uri()
  });