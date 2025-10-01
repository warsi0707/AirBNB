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
      if(response.status == 200){
      setListing(result.bookings)
      }
      
    }catch(error){
      toast.error(error.message)
    }
  }
  const DeleteBooking =useCallback(async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/booking/${id}`,{
        method: "DELETE",
        headers : {
          token: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status == 200){
        Bookings()
        toast.success(result.message)
      }else{
        toast.error(result.error)
      }
    }catch(error){
      toast.error(error.message)
    }
  },[])
  useEffect(()=>{
    Bookings()
  },[])
  if(listing.length ==0){
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h1 className="text-5xl ">No Bookings </h1>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap w-full min-h-screen gap-10 p-5 justify-evenly ">
      {listing && listing.map((item)=>(
        <BookingCard key={item._id} item={{...item}} handleRemoveBooking={()=>DeleteBooking(item._id)}/>
      ))}
    </div>
  )
}
export default memo(YourBookings)