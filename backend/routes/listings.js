const Router = require("express")
const listingRouter = Router()
const { Listings, User } = require("../model/DB")
const { userAuth } = require("../middleware/auth")


listingRouter.get("/",async(req, res) =>{
   
    try{
        const lisitngs = await Listings.find({})

        if(lisitngs.length ===0){
            return res.json({
                message: "No listing available"
            })
        }else{
            return res.json({
                listings: lisitngs
            })
        }
    }catch(error){
        res.status(404).json({
            errorMessage: error.message
        })
    }
})
listingRouter.get("/:id",async(req, res) =>{
    const { id } = req.params;
    const listing = await Listings.findById(id)
    return res.json({
        listing: listing
    })
   
})
listingRouter.post("/",userAuth, async(req, res)=>{
    const {title, image, price, description, bedrooms, guests} = req.body;
    const userId = req.user;
    try{
        const NewListing = await Listings.create({
            title, image, price, description, bedrooms, guests, hostedBy: userId
        })
        
        return res.json({
            message: "Listing posted successfully",
            NewListing: NewListing
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    } 
})
listingRouter.put("/:id",userAuth, async(req, res)=>{
    const {title, image, price, description, bedrooms, guests} = req.body;
    const {id} = req.params
    try{
        const NewListing = await Listings.findByIdAndUpdate({_id:id},{
            title:title, image:image, price:price, description:description, bedrooms:bedrooms, guests:guests
        })
        return res.json({
            message: "Listing updated successfully",
            NewListing: NewListing
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    } 
})
listingRouter.delete("/:id",userAuth,async(req, res) =>{
    const {id} = req.params;
    const userId = req.user;
    try{
        if(userId){
            const DeleteListing = await Listings.findByIdAndDelete(id)
            if(DeleteListing){
                return res.json({
                    message: "Listing Deleted"
                })
            }else{
                return res.status(404).json({
                    message: error.message
                })
            }
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})

module.exports = {
    listingRouter
}