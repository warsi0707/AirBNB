const Router = require("express")
const listingRouter = Router()
const { Listings, User } = require("../model/DB")
const { userAuth } = require("../middleware/auth")
const InputValidation = require("../middleware/inputValidation")
const { ReviewSchema, ListingSchema } = require("../model/Schema")


listingRouter.get("/", async (req, res) => {
    try {
        const lisitngs = await Listings.find({})

        if (lisitngs.length === 0) {
            return res.json({
                message: "No listing available",
                listings: []
            })
        } else {
            return res.json({
                listings: lisitngs
            })
        }
    } catch (error) {
        res.status(404).json({
            errorMessage: error.message
        })
    }
})
listingRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listings.findById(id)
        return res.json({
            listing: listing
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
listingRouter.post("/", InputValidation(ListingSchema), userAuth, async (req, res) => {
    const { title, image, price, description, bedrooms, guests } = req.body;
    const userId = req.user;
    const hostedById = await User.findById(userId)
    const username = hostedById.username.toString()
    try {
        const NewListing = await Listings.create({
            title, image, price, description, bedrooms, guests, hostedBy: username
        })
        if (NewListing) {
            return res.json({
                message: "Listing posted successfully",
                NewListing: NewListing
            })
        } else {
            return res.status(404).json({
                message: "Listing not posted"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.put("/:id", InputValidation(ListingSchema), userAuth, async (req, res) => {
    const { title, image, price, description, bedrooms, guests } = req.body;
    const { id } = req.params
    const userId = req.user;
    try {
        const findUser = await User.findById(userId)
        const userUsername = findUser.username
        const findListing = await Listings.findById(id)
        if (findListing.hostedBy === userUsername) {
            const NewListing = await Listings.findByIdAndUpdate({ _id: id }, {
                title: title, image: image, price: price, description: description, bedrooms: bedrooms, guests: guests
            })
            return res.json({
                message: "Listing updated successfully",
                NewListing: NewListing
            })

        }
        return res.status(404).json({
            message: "You are not owner of this listing"
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.delete("/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    try {

        if (userId) {
            const DeleteListing = await Listings.findByIdAndDelete(id)
            if (DeleteListing) {
                return res.json({
                    message: "Listing Deleted"
                })
            } else {
                return res.status(404).json({
                    message: error.message
                })
            }
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.post("/:id", InputValidation(ReviewSchema), userAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user
    const { rate, comment } = req.body;
    try {
        const findUser = await User.findById(userId)
        const findListing = await Listings.findById(id)
        const rateBy = findUser.username
        if (findListing) {
            findListing.review.push({
                rate: rate,
                comment: comment,
                rateBy: rateBy
            })
            findListing.save()
        }
        return res.json({
            message: "Thanks for rate"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.get("/ratings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const findReview = await Listings.findById(id)
        if (findReview.review === "") {
            return res.json({
                review: ""
            })
        } else {
            return res.json({
                review: findReview.review
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.delete("/:id/reviews/:reviewId", userAuth, async (req, res) => {
    const { id, reviewId } = req.params;
    const userId = req.user
    try {
        const user = await User.findById(userId)
        const username = user.username
        const review = await Listings.findById(id)
        const reviewOwner = review.review.map((item) => item.rateBy)

        if (!reviewOwner === username) {
            return res.status(404).json({
                messge: "You are not owner of this rate"
            })
        }
        await Listings.findByIdAndUpdate(
            id,
            {
                $pull: { review: { _id: reviewId } }
            }
        )
        return res.json({
            message: "Review deleted!"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
module.exports = {
    listingRouter
}