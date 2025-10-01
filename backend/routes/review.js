const Router = require("express");
const { Ratings, Listings } = require("../model/DB");
const { authChecker } = require("../middleware/auth");
const reviewRouter = Router()

// review
reviewRouter.post("/:id", authChecker, async (req, res) => {
    const { id } = req.params;
    const { rate, comment } = req.body;
    try {
        if (!comment) {
            return res.status(404).json({
                error: "Please write something"
            })
        }
        const existingListing = await Listings.findById(id)
        if (existingListing) {
            existingListing.reviews.push({
                rate: rate,
                comment: comment,
                user: req.user.userId,
                listingId: id
            })

        }
        existingListing.save()

        return res.json({
            listing: existingListing,
            message: "Thanks for rate"
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})

reviewRouter.delete("/:id/:reviewid", authChecker, async (req, res) => {
    const { id, reviewid } = req.params;

    try {
        const listing = await Listings.findById(id)
        if (!listing) {
            return res.status(404).json({
                error: "Listing not found"
            })
        }
        if (listing.reviews.find((item) => item._id.toString() === reviewid)) {
            listing.reviews = listing.reviews.filter((item) => item._id.toString() !== reviewid)
            await listing.save()
            return res.json({
                message: "Review deleted successfully"
            })
        } else {
            return res.status(404).json({
                error: "Review not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }

})

module.exports = {
    reviewRouter
}