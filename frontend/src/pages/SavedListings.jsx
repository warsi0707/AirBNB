import { memo, useContext, useState } from "react"
import SavedListingCard from "../components/SavedListingCard"
import AuthContext from "../context/AuthContext"


function SavedListings() {
  const {saved} = useContext(AuthContext)


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