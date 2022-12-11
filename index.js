import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import busRoutes from './routes/bus.js'
import connectDB from './database/mongo.js'
import { PORT } from './config.js'

const app = express()

//connectDB()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('api/buses', busRoutes)
//app.use('/api/products', productRoutes)
//app.use('/api/categories', categoryRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))