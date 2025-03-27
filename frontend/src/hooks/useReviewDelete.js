import { useParams } from "react-router-dom"
import { BackendUrl } from "../helper"
import toast from "react-hot-toast"
import { useCallback } from "react"

export default function useReviewDelete() {
    const {id} = useParams()
    
    const DeleteReview= useCallback(async({reviewId})=>{
        try{
            const response = await fetch(`${BackendUrl}/lisitngs/rate/${id}/${reviewId}`,{
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
  return {
    DeleteReview
  }
}
