import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router"
import { Link } from 'react-router'
import { useRecoilState } from 'recoil'
import { errorAtom, listingAtom, messageAtom} from '../atom/atom'


export default function Details() {
  const [listing, setListing] = useRecoilState(listingAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [error, setError] = useRecoilState(errorAtom)

  const {id} = useParams()
  const navigate = useNavigate()


  const Getadata =async()=>{
    try{
      const response = await fetch(`https://airbnb-1-bgud.onrender.com/v1/api/listings/${id}`,{
        method: "GET"
      })
      const result = await response.json()
      if(response.ok){
        setListing(result.listing)
      }
    }catch(err){
      setError(err)
    }
  }
  const DeleteListing =async()=>{
    try{
      const response = await fetch(`https://airbnb-1-bgud.onrender.com/v1/api/listings/${id}`,{
        method: "DELETE",
        credentials: "include"
      })
      const result = await response.json()
      if(response.ok){
        setMessage(result.message)
        setListing(result.listing)
        setTimeout(() => {
          setMessage("")
          navigate("/")
        }, 2000);
      }
    }catch(error){
      setError(error.message)
    }
  }
 
  useEffect(()=>{
    Getadata() 
  },[])
  return (
    <div className=' flex justify-center flex-col mx-5 md:mx-20 py-5'>
           {message && <h1 className='text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{message}</h1>}
           {error && <h1 className='text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{error}</h1> }
      <div className='flex justify-between py-5'>
        <h1 className='text-3xl'>{listing.title}</h1>
        <h1 className='text-lg'><i className="fa-regular fa-heart space-x-5"></i>&nbsp; &nbsp;save</h1>
      </div>
      <div className="img ">
        <img src={listing.image} className=' h-96 object-cover w-full rounded-2xl' alt="" />
      </div>
      <div className="details flex flex-col sm:flex-row sm:justify-between md:justify-evenly my-10">
        <div className="detail">
           <div className="py-6">
              <h1 className='text-2xl'>{listing.title} in india</h1>
              <p>{listing.guests} Guests, {listing.bedrooms} Bedroom, </p>
           </div>
           <div className="borde border-b-2"></div>
           <div className="py-6">
            <h1>Hosted By:  </h1>
           </div>

           <div className="btn flex gap-5 justify-center sm:justify-start">
            <Link to={`/listing/${listing._id}`} className='bg-black text-white py-1 px-7 text-xl rounded-md '>Edit</Link>
            <button onClick={DeleteListing} className='bg-red-500 text-white py-1 px-7 text-xl rounded-md '>Delete</button>
           </div>
        </div>
        <div className="price w-auto sm:w-60 py-5 shadow-xl mx-auto mt-10 sm:mt-10 bg-white rounded-xl border-2 border-gray-200 p-5">
          <div className="mb-4">
            <h1 className='space-x-2 mb-2 text-xl'><i className="fa-solid fa-dollar-sign"></i>{listing.price} / Nights</h1>
            <p className='text-gray-600'>Price before taxes</p>
          </div>
          <div className="border-2"></div>
          
          <div className="btn mt-2">
            <button  className='w-full py-2 bg-red-500 text-white text-center text-xl rounded-md'>Reserve</button>
          </div>
          <p className='text-center pt-2'>You cant't be change yet</p>
        </div>
      </div>
    </div>
  )
}
