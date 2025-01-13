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
    hostedBy: String,
    bedrooms: Number,
    review: [{
        rate: Number,
        comment: String,
        rateBy: String
    }],
    guests: Number
})

const Admin = mongoose.model("Admin", adminSchema)
const User = mongoose.model("User", userSchema)
const Listings = mongoose.model("Listing", listingSchema)

module.exports = {
    Admin,
    User,
    Listings
}