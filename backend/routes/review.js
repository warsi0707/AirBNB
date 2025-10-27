const Router = require("express");
const { Ratings, Listings } = require("../model/DB");
const { authChecker } = require("../middleware/auth");
const reviewRouter = Router();

// review
reviewRouter.post("/:id", authChecker, async (req, res) => {
  const { id } = req.params;
  const { rate, comment } = req.body;
  try {
    if (!comment) {
      return res.status(404).json({
        error: "Please write something",
      });
    }
    const existingListing = await Listings.findById(id).populate(
      "reviews.user",
    );
    if (existingListing) {
      existingListing.reviews.push({
        rate: rate,
        comment: comment,
        user: req.user.userId,
        listingId: id,
      });
    }
    existingListing.save();
    return res.json({
        reviews: existingListing.reviews,
      message: "Thanks for rate",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

reviewRouter.delete("/:id/:reviewid", authChecker, async (req, res) => {
  const { id, reviewid } = req.params;

  try {
    const listing = await Listings.findById(id)
    if (!listing) {
      return res.status(404).json({
        error: "Listing not found",
      });
    }
    if (listing.reviews.find((item) => item._id.toString() === reviewid)) {
      if (listing.reviews.find((item) => item.user.toString() === req.user.userId)) {
        const deletedReview = listing.reviews = listing.reviews.filter(
        (item) => item._id.toString() !== reviewid
      );
      await listing.save();
      return res.json({
        deltedReviewId: reviewid,
        message: "Review deleted successfully",
      });
      }
      
      return res.status(404).json({
          error: "You can't delete this review",
        });
    } else {
      return res.status(404).json({
        error: "Review not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
reviewRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Listings.findById(id).populate(
      "reviews.user",
      "username role"
    );
    if (reviews.reviews.length <= 0) {
      return res.json({
        reviews: [],
      });
    }
    return res.json({
      reviews: reviews.reviews,
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

module.exports = {
  reviewRouter,
};
