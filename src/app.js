import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./router/routes.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());


app.use(routes);


app.listen(
  port,
  console.log(`Servidor iniciado com sucesso! Na porta: ${port}`)
);
