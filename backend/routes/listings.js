const Router = require("express")
const listingRouter = Router()
const { Listings} = require("../model/DB")

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
        const listing = await Listings.findById(id).populate("ownerId","username")
        return res.json({
            listing: listing
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