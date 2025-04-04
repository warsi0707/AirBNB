import { memo, useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BackendUrl } from "../helper"


 function YourBookings() {
  const [listing, setListing] = useState([])
  const Bookings =async()=>{
    try{
      const response = await fetch(`${BackendUrl}/user/bookings`, {
        method: "GET",
        credentials: 'include'
      })
      const result = await response.json()
      setListing(result.bookings)
      console.log(result.bookings.listing)
    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    Bookings()
  },[])
  if(listing === null){
    return (
      <div>
        <h1>No Bookings </h1>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-10 py-10">
      {listing.map((item)=>(
        <div key={item._id} className="flex flex-col items-center justify-center w-full gap-2 p-2 rounded-md sm:justify-between sm:flex-row h-72">
         <div className="w-full rounded-md h-72">
         <img src={item.listing.image} className="w-full rounded-md sm:h-72" alt="" />
         </div>
        <div className="flex flex-col justify-between w-full p-5 bg-gray-200 rounded-md min-h-72">
         <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-thin text-center">{item.listing.title}</h1>
            <p className="text-center text-gray-700">{item.listing.description}</p>
         </div>
         <div className="flex justify-between">
          <p>{item.bookedAt}</p>
          
         </div>
        </div>
      </div>
      ))}
      
    </div>
  )
}
export default memo(YourBookings)