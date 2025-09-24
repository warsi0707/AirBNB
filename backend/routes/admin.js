const Router = require("express");
const { Listings } = require("../model/DB");
const { authChecker } = require("../middleware/auth");
const adminRouter = Router()


adminRouter.get("/protected", (req, res) => {
    const id = req.admin
    res.json({
        message: "Protected route",
        id: id
    })
})
adminRouter.get("/listing", authChecker, async (req, res) => {
    try {
        const listings = await Listings.find({
            ownerId: req.user.userId
        })
        if (!listings && listings.length == 0) {
            return res.json({
                listings: []
            })
        }
        return res.json({
            listings: listings
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
})


//post listing
adminRouter.post("/listing", authChecker, async (req, res) => {
    const { title, images, price, description, location, amenties, bedrooms, guests } = req.body;
    if (!title || !price || !location || !bedrooms) {
        return res.status(404).json({
            message: "Input required"
        })
    }
    try {
        const newListing = await Listings.create({
            title,
            price,
            images: images,
            price,
            description,
            bedrooms,
            guests,
            location,
            amenties: amenties,
            ownerId: req.user.userId
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
adminRouter.get("/listing/:id", authChecker, async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listings.findById({ _id: id }).populate('ownerId', 'username email')
        if (!listing) {
            return res.status(404).json({
                error: "Not Found",
                listing: []
            })
        }
        res.json({
            listing: listing
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
})
adminRouter.put("/listing/:id", authChecker, async (req, res) => {
    const { title, images, price, description, location, amenties, bedrooms, guests } = req.body;
    const { id } = req.params;
    try {
        const findListing = await Listings.findById({ _id: id })
        if (findListing && findListing.ownerId == req.user.userId) {
            const editListing = await Listings.findByIdAndUpdate({ _id: id }, {
                title,
                price,
                images: images,
                price,
                description,
                bedrooms,
                guests,
                location,
                amenties: amenties,
                ownerId: req.user.userId
            })
            if (editListing) {
                return res.json({
                    message: "Updated success",
                    updateLisitng: editListing
                })
            } else {
                return res.status(404).json({
                    error: "Error while updating"
                })
            }
        } else {
            return res.status(404).json({
                message: "Listing not found or not the owner"
            })
        }
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
})

adminRouter.delete("/listing/:id", authChecker, async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listings.findById({ _id: id })
        if (!listing) {
            return res.status(404).json({
                error: "Not found"
            })
        }
        if (listing && listing.ownerId == req.user.userId) {
            const deletListing = await Listings.findByIdAndDelete(id)
            if (deletListing) {
                return res.json({
                    message: "Deleted success",
                    deletListing: deletListing
                })
            } else {
                return res.status(404).json({
                    error: "Error while Deleting"
                })
            }
        } else {
            return res.status(404).json({
                error: "Not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            error: "Not found"
        })
    }
})

module.exports = {
    adminRouter
}