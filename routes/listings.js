const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLogedIn, isOwner,validateListing, validateReview} = require("../middleware.js")
const methodOverride = require('method-override')

const listingController = require("../controller/listings.js")




//Router for same paths
router
    .route("/")
    .get(wrapAsync(listingController.renderIndex))
    .post(isLogedIn,validateListing, wrapAsync(listingController.renderCreateListing))
    
//New route.
router.get("/new",isLogedIn, listingController.renderNewForm)

router.route("/:id")
    .get(wrapAsync(listingController.renderShow))
    .put(isLogedIn, isOwner,validateListing, wrapAsync(listingController.renderUpdate))
    .delete(isLogedIn,isOwner, wrapAsync(listingController.renderDelete))

//Edit route
router.get("/:id/edit",isLogedIn,isOwner,  wrapAsync(listingController.renderEdit))






module.exports = router;