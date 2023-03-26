import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import commentsRouter from "./commentsRoutes.js";
import { followRoutes } from "./follow.routes.js";
import hashTagsRoutes from "./HashTagsRoutes.js";
import likeRouter from "./like.routes.js";
import { metadataRouter } from "./metadata.routes.js";
import postsRouter from "./postsRoutes.js";
import searchRouter from "./searchRoutes.js"


const routes = Router()

routes.use([authRouter, commentsRouter, followRoutes, hashTagsRoutes, likeRouter, metadataRouter, postsRouter, searchRouter])

export {routes}