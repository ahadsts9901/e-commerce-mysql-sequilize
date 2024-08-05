import "dotenv/config"
import express, { json } from "express"
import morgan from "morgan"
import jwt from "jsonwebtoken"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth/main.mjs"
import productRoutes from "./routes/products/main.mjs"
import profileRoutes from "./routes/profile/main.mjs"

const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1', authRoutes)

app.get('/api/v1/', async (req, res, next) => {

    try {

        const { hart } = req.cookies

        const currentUser = await jwt.verify(hart, process.env.JWT_KEY)

        req.currentUser = currentUser

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

app.use('/api/v1', profileRoutes)
app.use('/api/v1', productRoutes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))