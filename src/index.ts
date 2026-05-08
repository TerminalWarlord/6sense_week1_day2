import express from "express";
import { config } from "dotenv";
config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        message: "Successful"
    })
});


app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});