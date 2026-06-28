import mongoose from 'mongoose';

// Function to connect to MongoDB
async function connectDB() {
    try {
        const url = process.env.MONGO_URI;

        if(!url) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        
        const connect = await mongoose.connect(url);

        console.log(`MongoDB Connected: ${connect.connection.host}`);

    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDB;