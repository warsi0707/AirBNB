import { useNavigate, useParams } from "react-router-dom"
import { BackendUrl } from "../helper"
import toast from "react-hot-toast"

export default function useListingDelete() {
    const {id} = useParams()
    const navigate = useNavigate()
    const DeleteListing =async()=>{
        try{
            const response = await fetch(`${BackendUrl}/listings/${id}`,{
                method: "DELETE",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                toast.success(result.message)
                navigate("/")
            }else{
                toast.error(result.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
  return {
    DeleteListing
  }
}
