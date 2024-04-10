const Listing = require("../models/listingModel.js")
const Review = require("../models/review.js")

module.exports.createReview = async(req, res) =>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
    //attaching login user to review author
    newReview.author = req.user._id
    console.log(newReview)
    listing.reviews.push(newReview)

    await newReview.save()
    await listing.save()
    req.flash("success", "Thanks for your review!")
    console.log("New review saved")
    res.redirect(`/listings/${listing.id}`)
}

module.exports.delteReview = async(req, res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted")
    res.redirect(`/listings/${id}`)
}