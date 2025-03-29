import { memo, useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BackendUrl } from "../helper"
import SavedListingCard from "../components/SavedListingCard"


function SavedListings() {
  const [listing, setListing] = useState([])

  const GetListing =useCallback( async()=>{
    try{
      const response = await fetch(`${BackendUrl}/user/saved`,{
        method: "GET",
        credentials: 'include'
      })
      const result = await response.json()
      setListing(result.savedListing)
    }catch(error){
      toast.error(error.message)
    }
  },[])
  const RemoveSave =useCallback(async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/user/save/${id}`,{
        method: "DELETE",
        credentials: 'include'
      })
      const result = await response.json()
      if(response.ok){
        toast.success(result.message)
      }else{
        toast.error(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  },[])
  useEffect(()=>{
    GetListing()
  },[])
  if(listing === null){
    return (
      <div className="h-[60vh] flex items-center justify-center ">
        <p className="text-5xl font-thin ">No saved listing</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 m-2 sm:m-10 h-[80vh]">
      {listing.map((item)=> (
        <SavedListingCard key={item._id} title={item.listing.title} date={item.savedAt} id={item.listing._id} onclick={()=> RemoveSave(item._id)}/>
      ))}
    </div>
  )
}
export default  memo(SavedListings)