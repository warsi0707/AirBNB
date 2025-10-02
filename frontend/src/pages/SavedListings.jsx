import { memo, useContext, useState } from "react"
import SavedListingCard from "../components/SavedListingCard"
import AuthContext from "../context/AuthContext"


function SavedListings() {
  const {saved} = useContext(AuthContext)

  if(saved.length ==0){
    return (
      <div className="flex items-center justify-center w-full min-h-screen pb-52">
        <h1 className="text-2xl font-bold lg:text-4xl">No saved lisitng</h1>
      </div>
    )
  }
  return (
    <div className="w-full min-h-screen p-3 space-y-5 lg:px-60">
      <h1 className="text-2xl font-semibold">Your Saved Listing</h1>
      {saved && saved.map((item)=> (
        <SavedListingCard key={item._id} item={item}/>
      ))}
    </div>
  )
}
export default  memo(SavedListings)