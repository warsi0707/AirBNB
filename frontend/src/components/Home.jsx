import React, { useEffect, useState } from 'react'
import Category from './Category'
import { Link } from 'react-router-dom'

export default function Home() {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const AllListing =async()=>{
    try{
      const response = await fetch("http://localhost:3000/v1/api/listings",{
        method: "GET",
      })
      const result = await response.json()
      console.log(result)
      setLoading(true)
      if(response.ok){
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
  return (
    <>
   <Category/>
   {loading? <h1>Loading...</h1>: ""}
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
