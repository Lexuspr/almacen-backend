import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGODB_CNN, {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
    })
    .catch(err => {
        console.log(err)
        throw new Error('Error al iniciar la base de datos')
    })
}

export default connectDB