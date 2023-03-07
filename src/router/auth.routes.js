import { Router } from "express";
import { authController } from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createUserSchema } from "../schemas/createuserSchema.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(createUserSchema), authController.signup)
authRouter.post("/signin", (req, res) => {

})

export {authRouter}