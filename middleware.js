const Listing = require("./models/listingModel.js")
const Review = require("./models/review.js")
const {listingSchema, reviewSchema} = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js");



// Middleware for login required
module.exports.isLogedIn = (req, res, next)=>{
    // console.log(req.path, "..", req.originalUrl)
    if(!req.isAuthenticated()){
        //Redirect url after login
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You are not owner of this listing! ")
        return res.redirect("/login")
    }
    next()

}

// Middleware for redirect url
module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}

// Middleware for ownership
module.exports.isOwner = async(req, res, next) =>{
    let {id} = req.params;
    //Authorizaton for update, only owner can update it
    let listings = await Listing.findById(id)
    if(!listings.owner._id.equals(res.locals.currentUSer._id)){
        req.flash("error", "You don`t have permission of this listing")
        res.redirect(`/listings/${id}`)
    }
    next()
}


//Validation function for listings
module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body)
    if(error) {
        let errMsg = error.details.map((element) =>element.message).join(",")
        throw new ExpressError(400, errMsg)
    }else {
        next()
    }
}


//Validation function for reviews
module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body)
    if(error) {
        let errMsg = error.details.map((element) =>element.message).join(",")
        throw new ExpressError(400, errMsg)
    }else {
        next()
    }
}

// Validataion for review owner
module.exports.isReviewAuthor = async(req, res, next) =>{
    let {id, reviewId} = req.params;
    //Authorizaton for update, only owner can update it
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currentUSer._id)){
        req.flash("error", "You are not the author of this review")
        res.redirect(`/listings/${id}`)
    }
    next()
}