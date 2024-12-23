require('dotenv').config()
const express = require("express")
const { userRouter } = require('./routes/user')
const { listingRouter } = require('./routes/listings')
const { adminRouter } = require('./routes/admin')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")
const path = require("path")


app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://air-bnb-9zp8.vercel.app",
    credentials: true
}))
app.use(express.static(path.join(__dirname, "build")))
app.use(express.json())
app.use(cookieParser());

app.use("/v1/api/listings", listingRouter)
app.use("/v1/api/user",userRouter)
app.use("/v1/api/admin", adminRouter)
app.get("/",(req, res)=>{
    res.send("Hello world")
})
app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const Main =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
        app.listen(process.env.PORT || 3000)
        console.log("App is listing on port 3000")
    }catch(err){
        console.error(err)
    }
}
Main()