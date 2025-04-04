const Router = require("express")
const listingRouter = Router()
const { Listings, User, Rating, SaveListing, Booking } = require("../model/DB")
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
        const listing = await Listings.findById(id).populate("userId","username")
        return res.json({
            listing: listing
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
listingRouter.post("/", userAuth, async (req, res) => {
    const { title, image, price, description, bedrooms, guests } = req.body;
    const userId = req.user;
    try {
        if(!title || !image || !price || !description || !bedrooms || !guests ){
            return res.status(404).json({
                message: "All inputs required"
            })
        }
        const NewListing = await Listings.create({
            title, image, price, description, bedrooms, guests, userId:userId
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
listingRouter.put("/:id", userAuth, async (req, res) => {
    const { title, image, price, description, bedrooms, guests } = req.body;
    const { id } = req.params
    const userId = req.user;
    try {
        const findUser = await Listings.findById(id)
        if(findUser.userId == userId){
             const NewListing = await Listings.findByIdAndUpdate({ _id: id }, {
                title: title, image: image, price: price, description: description, bedrooms: bedrooms, guests: guests
            })
            return res.json({
                message: "Listing updated successfully",
                NewListing: NewListing
            })
        }
        return res.status(404).json({
            message: "You are not owner"
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
        const findOwner = await Listings.findById(id)
        const owner = findOwner.userId
        if(owner == userId){
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
        }
        return res.status(404).json({
            message: "Not owner"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
// review
listingRouter.post("/rate/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user
    const { rate, comment } = req.body;
    try {
        const review = await Rating.create({
            rate,
            comment,
            user: userId,
            listingId: id
        })
            return res.json({
                review: review,
                message: "Thanks for rate"
            })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.get("/rate/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listingId = await Listings.findById(id)
        const findReview =await Rating.find({listingId: listingId}).populate('user','username')
        if (findReview == null) {
            return res.json({
                review: null
            })
        } else {
            return res.json({
                review: findReview
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
listingRouter.delete("/rate/:id/:reviewid", userAuth, async (req, res) => {
    const { id, reviewid } = req.params;
    const userId = req.user
    try {
       const listing = await Listings.findById(id)
       const review = await Rating.findById(reviewid)
       if(review){
        if(userId == review.user){
            const dltreview = await Rating.findByIdAndDelete(reviewid)
            return res.json({
               message: "Comment Deleted"
           })
           }else{
            return res.json({
                message: "Not Allowed"
           })
           }
       }else{
        return res.json({
            message: "error"
        })
       } 
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

//Saving listing
listingRouter.post("/save/:id", userAuth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;
    try{
        const savedListing = await SaveListing.find({listing: id})
        const savedListingId = savedListing.map((item)=> item.listing)
        console.log(savedListing)
        console.log(savedListingId)
        if(savedListingId == id){
            return res.json({
                message: "Already saved"
            })
        }
        // const save =await SaveListing.create({
        //     listing: id,
        //     user: userId
        // })
    return res.json({
        message: "Successfully Saved"
    })
    }catch(error){
        res.json({
            message: error.message
        })
    }
    
})
listingRouter.post("/saving/:id", userAuth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;

    const saving = await User.updateOne(
        {_id: userId},
        {$push: {
            listing: id
        }}
    )
    return res.json({
        message: "saved"
    })
})

//bookings
listingRouter.post("/booking/:id",userAuth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;
    try{
        const booking = await Booking.create({
            listing: id,
            user: userId
        })
        return res.json({
            message: "Successfully Booked your listing"
        })
    }catch(error){
        res.json({
            message: error.message
        })
    }
})
module.exports = {
    listingRouter
}