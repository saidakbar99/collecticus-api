import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }))

const start = async () => {
    try {
    //    await mongoose.connect(process.env.DB_URL)
       app.listen(PORT, () => console.log(`>>> Server is working now on PORT:${PORT}`))
    } catch (e) {
       return console.error(e)
    }
}

start()
