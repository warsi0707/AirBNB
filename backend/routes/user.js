const Router = require("express");
const userRouter = Router()
const { Review, Listings, User, SaveListing, Booking } = require("../model/DB");
const { JWT_USER_SECRET } = require("../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/auth");
const InputValidation = require("../middleware/inputValidation");
const { SignupSchema, LoginSchema } = require("../model/Schema");


userRouter.post("/signup", InputValidation(SignupSchema), async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existUser = await User.findOne({ username })
        if (existUser) {
            return res.status(404).json({
                message: `${username} not available!`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        if (!existUser) {
            const newUser = await User.create({
                username,
                password: hashPassword,
                email
            })
            return res.json({
                message: `${username} signup success`,
                user: newUser
            })
        } else {
            return res.status(404).json({
                message: `${username} not signup`
            })
        }

    } catch (error) {
        res.status(404).json({
            errorMessage: error.mesage
        })
    }
})
userRouter.post("/signin", InputValidation(LoginSchema), async (req, res) => {
    const { username, password } = req.body;

    try {
        const findUser = await User.findOne({ username })
        if (!findUser) {
            return res.status(404).json({
                message: `${username} not found`
            })
        }
        const user = findUser ? await bcrypt.compare(password, findUser.password) : false
        if (user) {
            const userAccessToken = jwt.sign({
                user: findUser.id
            }, JWT_USER_SECRET)

            res.cookie("userAccessToken", userAccessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
            })
            return res.json({
                message: "Signin Succes",
                token: userAccessToken
            })
        } else {
            return res.status(404).json({
                message: "Username or Password not matched"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
})
userRouter.get("/auth", userAuth, async (req, res) => {
    const userId = req.user
    try {
        const user = await User.findById(userId)
        if (user) {
            return res.json({
                authenticated: true,
                username: user.username,
                email: user.email
            })
        }
        if (user === "") {
            return res.json({
                authenticated: false
            })
        } else {
            return res.json({
                authenticated: true
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


})
userRouter.post("/logout", userAuth, (req, res) => {
    res.clearCookie("userAccessToken", {
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    res.json({
        message: "Logout"
    })
})
//Your saved listings
userRouter.get("/saved", userAuth, async(req, res)=>{
    const userId = req.user;
    try{
        const savedListing = await SaveListing.find({user: userId}).populate('listing','title').populate('user','username')
        return res.json({
            savedListing: savedListing
        })
        
    }catch(error){
        res.status(404).json({
            message: error.mesage
        })
    }
        
})
//un-save listing 
userRouter.delete("/save/:id", userAuth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;
    try{
        const unsave = await SaveListing.findByIdAndDelete(id, {
            user: userId
        })
        if(unsave){
            return res.json({
                message: "Unsaved"
            })
        }else{
            return res.json({
                message: "Failed"
            })
        }
    }catch(error){
        res.json({
            message: error.message
        })
    }
})

//Your bookings
userRouter.get("/bookings", userAuth, async(req, res)=>{
    const userId = req.user;
    try{
        const bookings = await Booking.find({user: userId}).populate('listing').populate('user','username')
        if(bookings.length == 0){
            return res.json({
                bookings: null
            })
        }
        return res.json({
            bookings: bookings
        })
    }catch(error){
        res.json({
            message: error.mesage
        })
    }
})
userRouter.delete("/bookings/:id", userAuth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;
    try{
        const deleteBooking = await Booking.findByIdAndDelete(id,{user: userId})
        if(deleteBooking){
            return res.json({
                message: "Deleted successfully"
            })
        }else{
            return res.status(404).json({
                message: "Deletaion failed"
            })
        }
    }catch(error){
        res.json({
            message: error.message
        })
    }
})



module.exports = {
    userRouter
}