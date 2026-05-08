import express, { type NextFunction, type Request, type Response } from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { userRouter } from "./routes/user.route.js";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.get("/health", (req, res) => {
    res.json({
        message: "Successful"
    })
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Internal server error"
    })
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`App running at http://localhost:${PORT}`);
});