const mongoose = require("mongoose")
const { number } = require("zod")
const Schmea = mongoose.Schema


const userSchema = new mongoose.Schema({
    username: {type: String,  required: true, unique: true},
    password: String,
    email: String,
    savedListing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]
})
const adminSchema = new mongoose.Schema({
    username: {type: String,  required: true, unique: true},
    password: String,
    email:  String
})

const listingSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    type: String,
    image: String,
    price: Number,
    description: String,
    hostedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bedrooms:Number,
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    guests: {
        type: Number,
        min: 1,
    },
   
    
})

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const Admin = mongoose.model("Admin", adminSchema)
const User = mongoose.model("User", userSchema)
const Listings = mongoose.model("Listing", listingSchema)
const Review = mongoose.model("Review", reviewSchema)
module.exports = {
    Admin,
    User,
    Listings,
    Review
}