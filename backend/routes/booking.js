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
bookingRouter.post("/:listingId", authChecker, async(req, res)=>{
    const {listingId} = req.params;
    const {checkIn, checkOut, totalPrice,guests, firstName, lastName, phone, email} = req.body;
    try{
        if(!checkIn || !checkOut || !totalPrice || !guests || !firstName || !lastName ||!phone || !email){
            return res.status(404).json({
                error: "All input required"
            })
        }
        const existingBooking = await Booking.find({
            listing: listingId
        })
        if(existingBooking.length >0 && existingBooking.map((item)=>item._id == listingId)){
            return res.json({
                message: "Can't book existing booking"
            })
        }
        
        const newBooking = await Booking.create({
            listing: listingId,
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
            message: "Booking successfully"
        })
    }catch(error){
        res.status(404).json({
            error:error
        })
    }
})
bookingRouter.delete("/:bookingId", authChecker, async(req, res)=>{
    const {bookingId} = req.params;
    try{
        const removeBooking = await Booking.findByIdAndDelete({_id:bookingId})
        if(!removeBooking){
            return res.status(404).json({
                error: "Failed"
            })
        }
        return res.json({
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