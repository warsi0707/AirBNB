import { memo, useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BackendUrl } from "../helper"
import BookingsCard from "../components/BookingsCard"


 function YourBookings() {
  const [listing, setListing] = useState([])
  const Bookings =async()=>{
    try{
      const response = await fetch(`${BackendUrl}/user/bookings`, {
        method: "GET",
        credentials: 'include'
      })
      const result = await response.json()
      if(response.ok){

      setListing(result.bookings)
      }
      
    }catch(error){
      toast.error(error.message)
    }
  }
  const DeleteBooking =useCallback(async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/user/bookings/${id}`,{
        method: "DELETE",
        credentials: 'include'
      })
      const result = await response.json()
      if(response.ok){
        Bookings()
        toast.success(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  },[])
  useEffect(()=>{
    Bookings()
  },[])
  if(listing === null){
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h1 className="text-5xl ">No Bookings </h1>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-10 py-10">
      {listing.map((item)=>(
        <BookingsCard key={item._id} title={item.listing.title} image={item.listing.image}  description={item.listing.description} bookedAt={item.bookedAt} onclick={()=> DeleteBooking(item._id)}/>
      ))}
    </div>
  )
}
export default memo(YourBookings)