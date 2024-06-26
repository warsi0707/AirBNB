const Joi = require("joi")

//Schema for server-side form validation for listings
module.exports.listingSchema = Joi.object({
    listings : Joi.object({
        title:Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.string().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    })
}),


//server-side validaton for review
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5),
        comment: Joi.string().required()
    })
}).required()