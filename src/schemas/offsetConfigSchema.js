import joi from "joi";

export const offsetDateSchema = joi.object({
  offset: joi.number().integer().min(0),
  date: joi.date().max("now").iso(),
});
