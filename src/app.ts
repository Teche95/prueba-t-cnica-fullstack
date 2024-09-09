import express from "express"
import morgan from "morgan"
import cors from "cors"
import criptoRoutes from "./routes/cripto.routes"
import cookieParser from "cookie-parser"


const app = express()
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json())

app.use(criptoRoutes)


export default app