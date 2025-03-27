const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    email: String,
    savedListing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]
})
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    email: String
})

const listingSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    type: String,
    image: String,
    price: Number,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bedrooms: Number,
    // review: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Rating"
    // }],
    guests: Number
})
const ratings = new mongoose.Schema({
    rate: {
        type: Number,
        required: true
    },
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listings"
    }
})
const Rating = mongoose.model("Rating", ratings)
const Admin = mongoose.model("Admin", adminSchema)
const User = mongoose.model("User", userSchema)
const Listings = mongoose.model("Listing", listingSchema)

module.exports = {
    Admin,
    User,
    Listings,
    Rating
}