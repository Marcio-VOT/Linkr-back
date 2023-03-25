import joi from "joi";

export const postSchema = joi.object({
  description: joi.string().allow(""),
  externalLink: joi.string().required().uri(),
  hashtags: joi.array().items(joi.string()),
});
