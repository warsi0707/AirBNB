import { memo, useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BackendUrl } from "../helper"
import BookingCard from "../components/BookingCard"


 function YourBookings() {
  const [listing, setListing] = useState([])

  const Bookings =async()=>{
    try{
      const response = await fetch(`${BackendUrl}/booking`, {
        method: "GET",
        credentials: 'include',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      const result = await response.json()
      console.log(response)
      console.log(result)
      if(response.status == 200){
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
    <div className="flex flex-wrap justify-center w-full min-h-screen gap-10 p-5 lg:px-40 md:justify-between">
      {listing && listing.map((item)=>(
        <BookingCard key={item._id} item={{...item}}/>
      ))}
    </div>
  )
}
export default memo(YourBookings)