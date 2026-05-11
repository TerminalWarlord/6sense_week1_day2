import express, { type NextFunction, type Request, type Response } from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { userRouter } from "./routes/user.route.js";
import { organizationRouter } from "./routes/organization.route.js";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/organization', organizationRouter);
app.get("/health", (req, res) => {
    res.json({
        message: "Successful"
    })
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).json({
        message: "Internal server error"
    })
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`App running at http://localhost:${PORT}`);
});