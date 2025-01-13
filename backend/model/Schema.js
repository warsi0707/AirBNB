const { z } = require("zod")

const SignupSchema = z.object({
    username: z.string().min(3, "Username required").max(50, "Should be lesser"),
    password: z.string().min(3, "Password Should be more than 3").max(50, "Should be lesser"),
    email: z.string().email("Invalid email"),
})
const AdminSignupSchema = z.object({
    username: z.string().min(3, "Username required").max(50, "Should be lesser"),
    password: z.string().min(3, "Should be more than 3").max(50, "Should be lesser"),
    email: z.string().email("Invalid email"),
})
const LoginSchema = z.object({
    username: z.string().min(3, "Username required").max(50, "Should be lesser"),
    password: z.string().min(3, "Password Should be more than 3").max(50, "Should be lesser"),
})
const ListingSchema = z.object({
    title: z.string().min(4, "Title Required").max(100, "Title should be less"),
    image: z.string().min(5, "Sould be an image link"),
    price: z.number().min(2, "Price required").max(20),
    description: z.string().min(5, "Description Required").max(150, "Maximum"),
    bedrooms: z.number().min(1, "Required").max(7, "Not greater than 7"),
    guests: z.number().min(1, "Required").max(10, "More than 10 person allowed")

})
const ReviewSchema = z.object({
    rate: z.number().min(1, "Rate atleast 10").max(5, "Not greater than 5"),
    comment: z.string().min(3, "Comment Should more than 3 word").max(100, "Maximum word")
})

module.exports = {
    LoginSchema,
    ReviewSchema,
    AdminSignupSchema,
    SignupSchema,
    ListingSchema
}