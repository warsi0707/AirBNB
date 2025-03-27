import { useCallback, useEffect, useState } from "react"
import { BackendUrl } from "../helper"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

export default function useReview() {
    const {id} = useParams()
    const [review, setReview] = useState([])

    const GetReview=useCallback(async()=>{
        try{
            const response = await fetch(`${BackendUrl}/listings/rate/${id}`,{
                method :'GET',
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                setReview(result.review)
            }else{
                setReview(null)
            }
        }catch(error){
            toast.error(error.message)
        } 
    },[])
    useEffect(()=>{
        GetReview()
    },[])
  return {
    review
  }
}
