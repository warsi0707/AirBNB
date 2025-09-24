const Router = require("express");
const { Ratings } = require("../model/DB");
const { authChecker } = require("../middleware/auth");
const reviewRouter = Router()

// review
reviewRouter.post("/:id",authChecker, async (req, res) => {
    const { id } = req.params;
    const { rate, comment } = req.body;
    try {
        if(!comment){
            return res.status(404).json({
                error: "Please write something"
            })
        }
        
        const review = await Ratings.create({
            rate,
            comment,
            user: req.user.userId,
            listingId: id
        })
            return res.json({
                review: review,
                message: "Thanks for rate"
            })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})
reviewRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const review  = await Ratings.find({
            listingId: id
        }).populate('user', 'username role')
        if(review.length ==0){
            return res.json({
                review: []
            })
        }
        return res.json({
            review: review
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})
reviewRouter.delete("/:id/:reviewid",authChecker, async (req, res) => {
    const { id, reviewid } = req.params;

    try {
       const review = await Ratings.findByIdAndDelete({_id:reviewid},{listingId:id})
       
       if(review){
        return res.json({
            message: "Review remove"
        })
       }
       res.status(404).json({
        error: "Not Found"
       })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }

})

module.exports = {
    reviewRouter
}