const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String,  unique: true },
    password: String,
    email: String,
    saved: [{
        listing : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookedAt : {
        type: Date,
        default: Date.now
    }
    }],
    bookings  :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }],
    role: {
        type: String,
        enum :['USER', 'ADMIN'], default: 'USER'
    }
})

const listingSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    price: {type:Number, required: true},
    description: String,
    location: {type:String, required: true},
    guests: Number,
    bedrooms:Number,
    amenties: [{type: String}],
    images: [{type: String}],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }],
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

const bookings = new mongoose.Schema({
    listing : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    totalPrice: {type: Number,  required: true},
    guests: {type: Number, required: true},
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    bookedAt : {
        type: Date,
        default: Date.now
    }

})


const Booking = mongoose.model("Booking", bookings)
const Ratings = mongoose.model("Ratings", ratings)
const User = mongoose.model("User", userSchema)
const Listings = mongoose.model("Listing", listingSchema)

module.exports = {
    User,
    Listings,
    Ratings,
    Booking,
}