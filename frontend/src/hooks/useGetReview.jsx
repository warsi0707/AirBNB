import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackendUrl } from '../helper'
import { useEffect } from 'react'

export default function useGetReview() {
    const {id} = useParams()
    const [reviews, setReviews] = useState([])
    console.log(reviews)

    const handleGetRate =async()=>{
        try{
          const response = await fetch(`${BackendUrl}/rate/${id}`,{
            method: 'GET'
          })
          const result = await response.json()
          if(response.status == 200){
            setReviews(result.review)
          }else{
            setReviews([])
          }
          console.log(response)
          console.log(result)
        }catch(error){
          console.error(error)
        }
      }
      useEffect(()=>{
        handleGetRate()
      },[])
  return {
    reviews, setReviews,handleGetRate
  }
}
