import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function validateToken(req, res, next) {
  let { authorization: token } = req.headers;
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: "invalid token 1" });
  }
  token = token?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    res.locals.userId = decoded.userId;
  });
  next();
}
