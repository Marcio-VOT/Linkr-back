import joi from "joi";

export const postSchema = joi.object({
    description: joi.string(),
    external_link: joi.string().required().uri()
  });