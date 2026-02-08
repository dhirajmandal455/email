import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./lib/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())

app.use("/api", authRouter)

dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("PORT : ", process.env.PORT)
    })
})

