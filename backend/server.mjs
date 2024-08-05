import express, { json } from "express"
import morgan from "morgan"

const app = express()

app.use(json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))