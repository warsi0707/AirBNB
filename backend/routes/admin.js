const Router = require("express");
const bcyrpt = require("bcrypt")
const { Admin, Listings } = require("../model/DB");
const adminRouter = Router()
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const cookieParser = require('cookie-parser');
const { adminAuth } = require("../middleware/auth");


adminRouter.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existAdmin = await Admin.findOne({ username })
        if (existAdmin) {
            return res.status(404).json({
                errorMessage: "Admin already exist"
            })
        }
        const hashPassword = await bcyrpt.hash(password, 5)

        const admin = await Admin.create({
            username, password: hashPassword, email
        })
        if (admin) {
            return res.json({
                message: "Admin signup success"
            })
        } else {
            return res.status(404).json({
                errorMessage: "Error while signup"
            })
        }
    } catch (error) {
        res.status(404).json({
            errorMessage: error.message
        })
    }

})
adminRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const findAdmin = await Admin.findOne({ username })
        const compare = findAdmin && findAdmin.password ? await bcyrpt.compare(password, findAdmin.password) : false
        if (!compare) {
            return res.status(404).json({
                errorMessage: "Username or password not valid"
            })
        }
        if (findAdmin && compare) {
            const accessToken = jwt.sign({
                adminId: findAdmin._id
            }, JWT_ADMIN_SECRET)
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
            })
            return res.json({
                message: "Loged in",
                token: accessToken
            })
        } else {
            return res.status(404).json({
                errorMessage: "Bad Credentials"
            })
        }
    } catch (error) {
        res.status(404).json({
            errorMessage: error.message
        })
    }
})
adminRouter.get("/protected", adminAuth, (req, res) => {
    const id = req.admin
    res.json({
        message: "Protected route",
        id: id
    })
})
adminRouter.post("/listing", async (req, res) => {
    const { title, image, price, type, description, bedrooms, bathrooms, guests } = req.body;
    try {
        const newListing = await Listings.crete({
            title,
            type,
            image,
            price,
            description,
            bedrooms,
            bathrooms,
            guests
        })
        return res.json({
            message: "Listing added success",
            newListing: newListing
        })

    } catch (error) {
        res.status(404).json({
            errorMessage: error.message
        })
    }
})
adminRouter.put("/listing/:id", async (req, res) => {
    const { title, image, price, description, details } = req.body;
    const { id } = req.params;

    const editListing = await Listings.findByIdAndUpdate({ _id: id }, {
        title: title,
        price: price,
        image: image,
        details: details,
        description: description
    })
    if (editListing) {
        return res.json({
            message: "Updated success",
            updateLisitng: editListing
        })
    } else {
        return res.status(404).json({
            errorMessage: "Error while updating"
        })
    }
})
adminRouter.delete("/listing/:id", async (req, res) => {
    const { id } = req.params;

    const deletListing = await Listings.findByIdAndDelete(id)
    if (deletListing) {
        return res.json({
            message: "Deleted success",
            deletListing: deletListing
        })
    } else {
        return res.status(404).json({
            errorMessage: "Error while Deleting"
        })
    }
})

module.exports = {
    adminRouter
}