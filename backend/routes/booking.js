const Router = require("express");
const { Booking } = require("../model/DB");
const { authChecker } = require("../middleware/auth");
const bookingRouter = Router()

//bookings
bookingRouter.get("/",authChecker, async(req, res)=>{
    try{
        const bookings = await Booking.find({
            user: req.user.userId
        }).populate('listing')
        if(bookings.length ==0){
            return res.json({
                bookings: []
            })
        }
        return res.json({
            bookings: bookings
        })
    }catch(error){
        res.json({
            message: error.message
        })
    }
})
bookingRouter.post("/:id", authChecker, async(req, res)=>{
    const {id} = req.params;
    const {checkIn, checkOut, totalPrice,guests, firstName, lastName, phone, email} = req.body;
    try{
        if(!checkIn || !checkOut || !totalPrice || !guests || !firstName || !lastName ||!phone || !email){
            return res.status(404).json({
                error: "All input required"
            })
        }
        const bookings = await Booking.find({})
        if(bookings.find((booking)=> booking.listing.toString() === id.toString()) ){
            return res.status(404).json({
                error: "Can't book existing listing"
            })
        }
        const newBooking = await Booking.create({
            listing: id,
            user: req.user.userId,
            checkIn: Date(checkIn),
            checkOut: Date(checkOut) ,
            totalPrice,
            firstName,
            lastName,
            phone,
            email,
            guests
        })
        if(!newBooking){
            return res.status(404).json({
                error: "Booking failed"
            })
        }
        res.json({
            booking: newBooking,
            message: "Booking successfully"
        })
    }catch(error){
        res.status(404).json({
            error:error
        })
    }
})
bookingRouter.delete("/:id", authChecker, async(req, res)=>{
    const {id} = req.params;
    try{
        const removeBooking = await Booking.findByIdAndDelete({_id:id})
        if(!removeBooking){
            return res.status(404).json({
                error: "Failed"
            })
        }
        return res.json({
            booking: removeBooking,
            message: "Booking cancel"
        })
    }catch(error){
        res.status(404).json({
            error: error
        })
    }
})

module.exports ={
    bookingRouter
}