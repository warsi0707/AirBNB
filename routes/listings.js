const express = require("express")
const router = express.Router();
const Listing = require("../models/listingModel.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema} = require("../schema.js")
const {isLogedIn} = require("../middleware.js")



//Validation function for listings
const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body)
    if(error) {
        let errMsg = error.details.map((element) =>element.message).join(",")
        throw new ExpressError(400, errMsg)
    }else {
        next()
    }
}






//Index route
router.get("/", wrapAsync( async(req, res) =>{
    let allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
}))

//New route.
router.get("/new",isLogedIn,(req, res) =>{
    res.render("listings/new.ejs")
})

//Create route
router.post("/",validateListing,isLogedIn, wrapAsync(async (req, res, next) =>{
    // if(!req.body.listings){
    //     throw new ExpressError(400, "Send valid data for listing")
    // }
    // listingSchema.validate(req.body)
    const newListing = new Listing(req.body.listings) //listings are came from the form-name-listings[name]
    await newListing.save()
    req.flash("success", "New listing created! ")
    res.redirect("/listings")
}))

//Show route
router.get("/:id", wrapAsync( async (req, res) =>{
    let {id} = req.params;
    const listings = await Listing.findById(id).populate("reviews")
    if(!listings){
        req.flash("error", "Listing does not exist")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listings})
}))

//Edit route
router.get("/:id/edit",isLogedIn,validateListing, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const listings = await  Listing.findById(id)
    res.render("listings/edit.ejs", {listings})
}))

//Update route
router.put("/:id",isLogedIn,validateListing, wrapAsync(async(req, res) =>{
    if(!req.body.listings){
        throw new ExpressError(400, "Send valid data for listing")
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listings})
    req.flash("success", "Listing updated! ")
    res.redirect("/listings")
}))

//Delete route
router.delete("/:id",isLogedIn, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted! ")
    console.log(deleteListing)
    res.redirect("/listings")
}))


module.exports = router;