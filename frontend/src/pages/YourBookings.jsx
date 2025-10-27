import { memo, useCallback, useEffect, useState } from "react"
import BookingCard from "../components/BookingCard"
import { useDispatch, useSelector } from "react-redux"
import {  fetchCancelBooking, getBookings } from "../redux/sclice/listingSlice"



 function YourBookings() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.listing.bookings)
  console.log(bookings)

  const handleCancelBooking =(id)=>{
    console.log("handleCancel received ID:", id);
    const result = dispatch(fetchCancelBooking(id));
  }


  useEffect(()=>{
    dispatch(getBookings())
  },[dispatch])

  if(bookings.length <=0){
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h1 className="text-5xl ">No Bookings </h1>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap w-full min-h-screen gap-10 p-5 justify-evenly ">
      {bookings && bookings?.bookings?.map((booking)=>(
        <BookingCard key={booking._id} booking={booking} handleCancelBooking={()=> handleCancelBooking(booking._id)} />
      ))}
    </div>
  )
}
export default memo(YourBookings)