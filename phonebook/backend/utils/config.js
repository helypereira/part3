import mongoose from "mongoose";

const connectDB = async(uri) => {
    try {
        if (!uri) {
            throw new Error('MongoDB URI is not defined')
        }
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        process.exit(1)
    }
}

export default connectDB