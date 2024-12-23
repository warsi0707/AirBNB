const Router = require("express");
const userRouter = Router()
const { Review, Listings, User } = require("../model/DB");
const { JWT_USER_SECRET} = require("../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/auth");


userRouter.post("/signup",async(req, res) =>{
    const {username, password, email} = req.body;
    // INPUT VALIDATION REQUIRED

    try{
        const existUser = await User.findOne({username})
        if(existUser){
            return res.status(404).json({
                message: `${username} not available!`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        if(!existUser){
            const newUser = await User.create({
                username,
                password:hashPassword,
                email
            })
            return res.json({
                message: `${username} signup success`,
                user: newUser
            })
        }else{
            return res.status(404).json({
                message: `${username} not signup`
            })
        }

    }catch(error){
        res.status(404).json({
            errorMessage: error.mesage
        })
    }
})
userRouter.post("/signin", async(req, res) =>{
    const {username, password} = req.body;
   
    try{
        const findUser = await User.findOne({username})
        if(!findUser){
            return res.status(404).json({
                message: `${username} not found`
            })
        }
        const user = findUser? await bcrypt.compare(password, findUser.password): false
        if(user){
            const userAccessToken = jwt.sign({
                user : findUser.id
            },JWT_USER_SECRET)
           
            res.cookie("userAccessToken",userAccessToken,{
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
                secure:process.env.NODE_ENV==="Development"?false:true,
            })
            return res.json({
                message: "Signin Succes",
                token: userAccessToken
            })
        }
        
    }catch(error){
        return res.status(404).json({
            message: error.message
        })
    }
})
userRouter.get("/auth",userAuth,async(req, res) =>{
    const userId = req.user
    try{
        const user = await User.findById(userId)
       if(user){
        return res.json({
            authenticated: true,
            user: user
        })
       }
        if(user === ""){
            return res.json({
                authenticated: false
            })
        }else{
            return res.json({
                authenticated: true
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
   

})

userRouter.post("/logout",userAuth,(req, res)=>{
    res.clearCookie("userAccessToken",{
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })
    res.json({
        message: "Logout"
    })
})

userRouter.post("/review/:id",async(req, res) =>{
    const {id} = req.params;
    const {comment, rating} = req.body;
    
    const newReview = await Review.create({
        comment:comment,
        rating: rating
    })
    
    const listing = await Listings.findById(id)
   

        
        const addReview = listing.review.push(newReview)
        await listing.save()
        // Listings.review.push(id)

    res.json({
        message: "Review added",
        review: listing
    })

   
   

    
    
})

module.exports = {
    userRouter
}