import  { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BackendUrl } from '../helper'
import { useParams } from 'react-router-dom'

export default function useListing() {
    const {id} = useParams()
    const [listing, setListing] = useState({})
    const [owner, setOwner] = useState("")

    const GetListing = useCallback( async () => {
        try{
            const resppnse = await fetch(`${BackendUrl}/listings/${id}`, {
                method: "GET",
                credentials: "include",
              });
              const result = await resppnse.json();
              if(resppnse.ok){
                setListing(result.listing);
                setOwner(result.listing.userId.username)
              }else{
                setListing(null)
                setOwner(null)
              }
        }catch(error){
            toast.error(error.message)
        }
      },[])
      useEffect(()=>{
        GetListing()
      },[])
  return {
    listing, owner
  }
}
