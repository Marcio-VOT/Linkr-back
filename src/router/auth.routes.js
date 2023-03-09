import { Router } from "express";
import { authController } from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createUserSchema } from "../schemas/createuserSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(createUserSchema), authController.signup)
authRouter.post("/signin", validateSchema(loginSchema), authController.signin)
authRouter.get("/validtoken/:token", authController.validToken)

export {authRouter}