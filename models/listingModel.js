const mongoose = require("mongoose")
const  Schema = mongoose.Schema


const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description : String,
    image : {
        type: String,
        default: "https://unsplash.com/photos/a-man-swimming-over-a-coral-reef-in-the-ocean-yetQBOG_ZWg",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-man-swimming-over-a-coral-reef-in-the-ocean-yetQBOG_ZWg": v,
    },
    price : Number,
    location : String,
    country: String,
})
const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing
