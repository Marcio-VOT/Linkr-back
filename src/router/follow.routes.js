import { Router } from "express";
import { followController } from "../controller/followController.js";
import validateToken from "../middlewares/validateToken.js"
const followRoutes = Router()

followRoutes.post("/follow", validateToken, followController.follow)
followRoutes.delete("/follow", validateToken, followController.unfollow)
followRoutes.get("/follow", validateToken, followController.verifyFollow)

export {followRoutes}