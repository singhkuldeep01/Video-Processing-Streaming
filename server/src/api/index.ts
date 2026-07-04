import express from "express"
const router = express.Router()
import v1Routes from "./V1/index"


router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Video Processing API" })
})

router.use("/v1", v1Routes)


export default router