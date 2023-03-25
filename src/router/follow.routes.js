import { Router } from "express";
import { followController } from "../controller/followController.js";
import validateToken from "../middlewares/validateToken.js"
const followRoutes = Router()

followRoutes.post("/follow", validateToken, followController.follow)
followRoutes.delete("/follow/:userId", validateToken, followController.unfollow)
followRoutes.get("/follow/:userId", validateToken, followController.verifyFollow)

export {followRoutes}