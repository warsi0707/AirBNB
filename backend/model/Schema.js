const {z} = require("zod")

const ListingSchema = z.object({
    
})

const LoginSchema = z.object({
    username: z.string({required_error: "Username required"}).max(50, {message:"Should be lesser"}),
    password: z.string().min(3,"Should be more than 3").max(50, {messsage:"Should be lesser"})
})

module.exports = {
    LoginSchema
}