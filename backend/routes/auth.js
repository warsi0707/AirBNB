const Router = require("express");
const authRouter = Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { User } = require("../model/DB");
const { JWT_USER_SECRET, ADMIN_SECRET } = require("../config");
const { authChecker } = require("../middleware/auth");




authRouter.post("/signup",  async (req, res) => {
    const { username, password, email,adminCode } = req.body;
    try {
        if(!username || !password || !email){
            return res.status(404).json({
                error: "All input required"
            })
        }
        const existUser = await User.findOne({ username })
        if (existUser) {
            return res.status(404).json({
                error: `${username} already registerd`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
    
        
        if(adminCode === ADMIN_SECRET){
            const admin = await User.create({
                username,
                password: hashPassword,
                email,
                role: 'ADMIN'
            })
            
            if(!admin){
                return res.json({
                message: "Admin registerd failed"
            }) 
            }else{
                return res.json({
                message: "Admin registerd successfully"
            })
            }
        }
        if (!existUser) {
            const newUser = await User.create({
                username,
                password: hashPassword,
                email,
                role: 'USER'
            })
            return res.json({
                message: `${username} signup success`,
                user: newUser
            })
        } else {
            return res.status(404).json({
                error: `${username} not signup`
            })
        }

    } catch (error) {
        res.status(404).json({
            error: error.mesage
        })
    }
})
authRouter.post("/signin",  async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
            return res.status(404).json({
                error: "Username and password required"
            })
        }
    try {
        
        const findUser = await User.findOne({ username })
        if (!findUser) {
            return res.status(404).json({
                message: `${username} not found`
            })
        }
        const user = findUser ? bcrypt.compare(password, findUser.password) : false
       
        if (user) {
            const token = jwt.sign({
                userId: findUser._id,
                username: findUser.username,
                role: findUser.role,
                email: findUser.email
            }, JWT_USER_SECRET)

            // res.cookie("userAccessToken", userAccessToken, {
            //     httpOnly: true,
            //     maxAge: 7 * 24 * 60 * 60 * 1000,
            //     sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            //     secure: process.env.NODE_ENV === "Development" ? false : true,
            // })
            return res.json({
                message: "Signin Succes",
                token: token
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
authRouter.get("/verify", authChecker,  async (req, res) => {
    const userId = req.user
    try {
        const user = await User.findById(req.user.userId)
        if (user) {
            return res.json({
                authenticated: true,
                username: user.username,
                email: user.email,
                role: user.role,
                userId: user._id
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
// authRouter.post("/logout",  (req, res) => {
//     res.clearCookie("userAccessToken", {
//         sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
//         secure: process.env.NODE_ENV === "Development" ? false : true,
//     })
//     res.json({
//         message: "Logout"
//     })
// })

module.exports ={
    authRouter
}