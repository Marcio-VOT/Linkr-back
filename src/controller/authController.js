import { authRepository } from "../repositories/auth.repository.js"
import { userRepository } from "../repositories/user.repository.js"
import bcrypt from "bcrypt"

export const authController = {
    async signup(req, res) {
        const { name, email, password, profileUrl} = req.body
        try {

            const emailAlreadyExists = await userRepository.getUserByEmail(email)
            console.log(emailAlreadyExists)
            if (emailAlreadyExists) {
                return res.sendStatus(409);
            }

            const hashedPassword = bcrypt.hashSync(password, 6)
            await authRepository.create({ email, name, password: hashedPassword, profileUrl })
            return res.sendStatus(201)

        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
}