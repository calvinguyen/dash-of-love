import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import multer from "multer"

//Import routes
import reportsRoute from "./routes/reports.js"
import flavorsRoute from "./routes/flavors.js"
import customersRoute from "./routes/customers.js"
import menuRoute from "./routes/menu.js"
import referralsRoute from "./routes/referrals.js"
import ordersRoute from "./routes/orders.js"
import typesRoute from "./routes/types.js"

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

// Image upload logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

//Setup middleware for routes
app.use("/reports", reportsRoute)
app.use("/flavors", flavorsRoute)
app.use("/customers", customersRoute)
app.use("/menu", menuRoute)
app.use("/referrals", referralsRoute)
app.use("/orders", ordersRoute)
app.use("/types", typesRoute)

app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
})

//Error Handler
app.use((err, req, res, next) => {
    console.error(err.message, req);
    res.status(500).send(err.message);
})