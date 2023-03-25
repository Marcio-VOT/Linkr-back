import express from "express";
import { PostHashTags, trendding } from "../controller/hashtagController.js";
import { validateQuerySchema } from "../middlewares/validateQuerySchema.js";
import validateToken from "../middlewares/validateToken.js";
import { offsetDateSchema } from "../schemas/offsetConfigSchema.js";

const hashTagsRoutes = express.Router();

hashTagsRoutes.get(
  "/hashtag/:hashtag",
  validateToken,
  validateQuerySchema(offsetDateSchema),
  PostHashTags
);
hashTagsRoutes.get("/trendding", validateToken, trendding);

export default hashTagsRoutes;
