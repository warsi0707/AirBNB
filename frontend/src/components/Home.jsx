import React, { useEffect, useState } from 'react'
import Category from './Category'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { errorAtom, listingData, messageAtom } from '../atom/atom'
import Loading from './Loading'
import { BackendUrl } from '../helper'
import axios from "axios"
export default function Home() {
  const [data, setData] = useRecoilState(listingData)
  const [error, setError] = useRecoilState(errorAtom)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useRecoilState(messageAtom)
  const backendUrl =BackendUrl

  const AllListing =async()=>{
    try{
      const response = await axios.get(`${backendUrl}/v1/api/listings`)
      const result =  response.data
      setLoading(true)
      if(response){
        setMessage(response.message)
        setLoading(false)
        setData(result.listings)
      }
    }catch(err){
      setError(err)
    }
  }
  useEffect(()=>{
    AllListing()
  },[])

  if(loading){
    return <>
   <Loading/>
    </>
  }
  return (
    <>
   <Category/>
   {loading? <h1>Loading...</h1>: ""}
   {message && <h1 className='text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{message}</h1>}
   {error && <h1 className='text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{error}</h1> }
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-3  xl:grid-cols-4 '>
      {data.map((item)=>(
      <div key={item._id} className='h-auto w-auto px-5 sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-xl'>
        <Link to={`/detail/${item._id}`}> 
          <img src={item.image} alt="" className='w-full h-60 object-cover rounded-xl' />
        <div className='py-3'>
        <div className=' flex justify-between space-y-2'>
          <h1 className='text-xl mt-1'>{item.title}</h1>
          <h1 className='text-gray-600'><i className="fa-solid fa-dollar-sign "></i> {item.price}</h1>
        </div>
        <div>
          <h1 className='text-gray-600'></h1>
        </div>
        </div>
        </Link>
      </div> 
      ))}
    </div>
    </>
  )
}
