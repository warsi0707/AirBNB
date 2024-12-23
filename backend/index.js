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
    origin: "http://localhost:5173",
    // origin: "https://airbnb-fe-xmbs.onrender.com",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")))
app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use("/v1/api/listings", listingRouter)
app.use("/v1/api/user",userRouter)
app.use("/v1/api/admin", adminRouter)


const Main =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
        app.listen(3000)
        console.log("App is listing on port 3000")
    }catch(err){
        console.error(err)
    }
}
Main()