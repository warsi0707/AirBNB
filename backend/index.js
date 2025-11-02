require('dotenv').config()
const express = require("express")
const { listingRouter } = require('./routes/listings')
const { adminRouter } = require('./routes/admin')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()
const cors = require("cors")
const { authRouter } = require('./routes/auth')
const { reviewRouter } = require('./routes/review')
const { bookingRouter } = require('./routes/booking')
const ConnectDB = require('./utils/ConnectDB')
const { FRONTEND_URL } = require('./config')

app.use(cors({
    origin: FRONTEND_URL,
    // credentials: true
}))

ConnectDB()
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/api/v1/listings", listingRouter)
app.use("/api/v1/booking", bookingRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/rate", reviewRouter)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})

const Main = async () => {
    try {
        app.listen(process.env.PORT || 3000)
        console.log("App is listing on port 3000")
    } catch (err) {
        console.error(err)
    }
}
Main()