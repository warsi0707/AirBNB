import { memo, useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { BackendUrl } from "../helper"


 function YourBookings() {
  const Bookings =useCallback(async()=>{
    try{
      const response = await fetch(`${BackendUrl}/user/bookings`, {
        method: "GET",
        credentials: 'include'
      })
      const result = await response.json()
      console.log(result)
    }catch(error){
      toast.error(error.message)
    }
  },[])
  useEffect(()=>{
    Bookings()
  },[])
  return (
    <div>
      
    </div>
  )
}
export default memo(YourBookings)