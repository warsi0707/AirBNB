const Listing = require("../models/listingModel.js")
const methodOverride = require('method-override')
const {listingSchema} = require("../schema.js")

//Index route
module.exports.renderIndex = async(req, res) =>{
    let allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
}

//Creat route
module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs")
}
//Create and save route
module.exports.renderCreateListing = async (req, res, next) =>{
    const newListing = new Listing(req.body.listings) //listings are came from the form-name-listings[name]
    newListing.owner = req.user._id;
    await newListing.save()
    req.flash("success", "New listing created! ")
    res.redirect("/listings")
}

    

//Show route
module.exports.renderShow = async (req, res) =>{
    let {id} = req.params;
    const listings = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner") //nested popolate:- populate inside reviews and inside this author
    if(!listings){
        req.flash("error", "Listing does not exist")
        res.redirect("/listings")
    }
    console.log(listings)
    res.render("listings/show.ejs", {listings})
}







//Edit route
module.exports.renderEdit = async(req, res) =>{
    let {id} = req.params;
    const listings = await  Listing.findById(id)
    if(!listings){
        req.flash("error", "Listing you requested does not exist! ")
        res.redirect(`/listings/${id}`)
    }
    res.render("listings/edit.ejs", {listings})
}



//Update route
module.exports.renderUpdate = async(req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listings})
    req.flash("success", "Listing updated! ")
    res.redirect(`/listings/${id}`)
}
//Delete route
module.exports.renderDelete = async(req, res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted! ")
    console.log(deleteListing)
    res.redirect("/listings")
}