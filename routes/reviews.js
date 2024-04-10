const express = require("express")
const router = express.Router({mergeParams: true});
const Listing = require("../models/listingModel.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
const {reviewSchema} = require("../schema.js")
const {validateReview, isLogedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controller/reviews.js")

// Post reviews route
router.post("/",isLogedIn,validateReview, wrapAsync(reviewController.createReview))

// Delete reviews route
router.delete("/:reviewId",isLogedIn, isReviewAuthor, wrapAsync(reviewController.delteReview))

module.exports = router;