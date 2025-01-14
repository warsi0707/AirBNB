require('dotenv').config()
const express = require("express")
const { userRouter } = require('./routes/user')
const { listingRouter } = require('./routes/listings')
const { adminRouter } = require('./routes/admin')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()
const cors = require("cors")

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/v1/api/listings", listingRouter)
app.use("/v1/api/user", userRouter)
app.use("/v1/api/admin", adminRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})

const Main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
        app.listen(process.env.PORT || 3000)
        console.log("App is listing on port 3000")
    } catch (err) {
        console.error(err)
    }
}
Main()