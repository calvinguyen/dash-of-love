import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"

//Import routes
import testDataRoute from "./routes/test.js";

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors(
    {
        origin: '*'
    }
))

app.use(express.json())
app.use(morgan("dev"))

//Setup middleware for routes
app.use("/testData", testDataRoute)

app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
})

//Error Handler
app.use((err, req, res, next) => {
    console.error(err.message, req);
    res.status(500).send(err.message);
})