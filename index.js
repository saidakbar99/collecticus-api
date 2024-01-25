import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import router from './router/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
       await mongoose.connect(process.env.DB_URL)
       app.listen(PORT, () => console.log(`>>> Server is working now on PORT:${PORT}`))
    } catch (e) {
       return console.error(e)
    }
}

start()
