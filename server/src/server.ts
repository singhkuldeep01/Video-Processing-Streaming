import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import apiRoutes from "./api/index"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // 24 hours
  })
)

app.use(express.json())
app.use(cookieParser())



app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

app.use("/api", apiRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})