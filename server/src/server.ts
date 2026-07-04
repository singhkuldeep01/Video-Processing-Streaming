import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./api/index";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
}));
app.use(express.json());

app.get("/", (req : Request, res : Response) => {
  res.send("Hello, World!");
} );

app.get("/api" , apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});