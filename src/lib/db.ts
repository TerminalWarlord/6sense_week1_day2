import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;
let isConnected = false;

export async function connectDB() {
    if (isConnected) return;
    try {
        const conn = await mongoose.connect(DATABASE_URL);
        isConnected = conn.connections[0]?.readyState === 1;
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}