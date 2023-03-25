import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { authRepository } from "../repositories/auth.repository.js";
import { userRepository } from "../repositories/user.repository.js";

dotenv.config();

export const authController = {
  async signup(req, res) {
    const { name, email, password, profileUrl } = req.body;
    try {
      const emailAlreadyExists = await userRepository.getUserByEmail(email);
      if (emailAlreadyExists) {
        return res.sendStatus(409);
      }

      const hashedPassword = bcrypt.hashSync(password, 6);
      await authRepository.create({
        email,
        name,
        password: hashedPassword,
        profileUrl,
      });
      return res.sendStatus(201);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  },
  async signin(req, res) {
    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return res.sendStatus(404);
    }

    const confirmPassword = bcrypt.compareSync(password, user.password);
    if (!confirmPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    return res.send({ token, avatar: user.profile_picture, userId: user.id });
  },
  validToken(req, res) {
    const { token } = req.params;

    if (!token) {
      res.status(401).send({ message: "invalid token" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      }
      return res.sendStatus(200);
    });
  },
};
