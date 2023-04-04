import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"

//Import routes
import testsRoute from "./routes/tests.js"
import flavorsRoute from "./routes/flavors.js"
import customersRoute from "./routes/customers.js"
import menuRoute from "./routes/menu.js"
import referralsRoute from "./routes/referrals.js"
import ordersRoute from "./routes/orders.js"
import typesRoute from "./routes/types.js"
import dashboardRoute from "./routes/dashboard.js"

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
app.use("/tests", testsRoute)
app.use("/flavors", flavorsRoute)
app.use("/customers", customersRoute)
app.use("/menu", menuRoute)
app.use("/referrals", referralsRoute)
app.use("/orders", ordersRoute)
app.use("/types", typesRoute)
app.use("/dashboard", dashboardRoute)

app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
})

//Error Handler
app.use((err, req, res, next) => {
    console.error(err.message, req);
    res.status(500).send(err.message);
})