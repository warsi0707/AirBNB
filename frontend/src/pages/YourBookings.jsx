import { lazy, memo, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchCancelBooking, getBookings } from "../redux/sclice/listingSlice"
const BookingCard = lazy(()=> import("../components/BookingCard"))


 function YourBookings() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.listing.bookings)

  useEffect(()=>{
    dispatch(getBookings())
  },[dispatch])

  const handleCancelBooking =useCallback((id)=>{
    dispatch(fetchCancelBooking({id:id}))
  },[])

  if(bookings && bookings.length ==0){
    return (
      <div className="h-[80vh] pt-32 flex items-center justify-center">
        <h1 className="text-5xl ">No Bookings </h1>
      </div>
    )
  }else{
      return (
    <div className="flex flex-wrap w-full min-h-screen gap-10 p-5 justify-evenly ">
      {bookings && bookings?.bookings?.map((booking)=>(
        <BookingCard key={booking._id} booking={booking} handleCancelBooking={()=> handleCancelBooking(booking._id)} />
      ))}
    </div>
  )
  }

}
export default memo(YourBookings)