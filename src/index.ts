import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        message: "Successful"
    })
});


app.listen(PORT, async () => {
    await connectDB();
    console.log(`App running at http://localhost:${PORT}`);
});