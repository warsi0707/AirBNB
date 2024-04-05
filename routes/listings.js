const express = require("express")
const router = express.Router();
const Listing = require("../models/listingModel.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {isLogedIn, isOwner,validateListing, validateReview} = require("../middleware.js")
const methodOverride = require('method-override')



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
    const newListing = new Listing(req.body.listings) //listings are came from the form-name-listings[name]
    newListing.owner = req.user._id;
    await newListing.save()
    req.flash("success", "New listing created! ")
    res.redirect("/listings")
}))

//Show route
router.get("/:id", wrapAsync( async (req, res) =>{
    let {id} = req.params;
    const listings = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner") //nested popolate:- populate inside reviews and inside this author
    if(!listings){
        req.flash("error", "Listing does not exist")
        res.redirect("/listings")
    }
    console.log(listings)
    res.render("listings/show.ejs", {listings})
}))

//Edit route
router.get("/:id/edit",isLogedIn,isOwner,  wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const listings = await  Listing.findById(id)
    if(!listings){
        req.flash("error", "Listing you requested does not exist! ")
        res.redirect(`/listings/${id}`)
    }
    res.render("listings/edit.ejs", {listings})
}))

//Update route
router.put("/:id",isLogedIn, isOwner,validateListing, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listings})
    req.flash("success", "Listing updated! ")
    res.redirect(`/listings/${id}`)
}))

//Delete route
router.delete("/:id",isLogedIn,isOwner, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted! ")
    console.log(deleteListing)
    res.redirect("/listings")
}))


module.exports = router;