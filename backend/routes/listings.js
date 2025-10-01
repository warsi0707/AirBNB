const Router = require("express")
const listingRouter = Router()
const { Listings } = require("../model/DB")


listingRouter.get("/search", async (req, res) => {
    const { query } = req.query
  
    try {
        if (query == "") {
            return res.status(404).json({
                error: "Input required"
            })
        }
        const listing = await Listings.find(
            {
                $or: [
                    { location: { $regex: query, $options: "i" } },
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ]
            }
        )
        if(listing.length ==0){
            return res.json({
                listing: [],
                message: "Not found"
            })
        }
        return res.json({
            listing: listing
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
})
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
        const listing = await Listings.findById(id).populate("ownerId reviews.user", "username role")
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