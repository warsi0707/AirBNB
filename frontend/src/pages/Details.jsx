import {  useParams } from "react-router";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuIndianRupee } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";
import { IoBedSharp } from "react-icons/io5";
import Ratings from "../components/Ratings";
import RatingInputForm from "../components/RatingInputForm";
import BookingInputForm from "../components/BookingInputForm";
import { useDispatch, useSelector } from "react-redux";
import {  fetchlistingByid, getReviews, } from "../redux/sclice/listingSlice";

export default function Details() {
  const dispatch = useDispatch()
  const listing = useSelector(state => state.listing.detailedListing)
  const loading = useSelector(state => state.listing.loading)
  const reviews = useSelector(state => state.listing.reviews)
  const { id } = useParams();
  const [isRating, setIsRating] = useState(false)
  const [isBooking, setIsBooking] = useState(false)

 
  useEffect(() => {
    dispatch(fetchlistingByid(id))
    dispatch(getReviews(id))
    // handleListing();
  }, [ id,dispatch]);


  if(loading){
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-center pb-52">
        <h1 className="text-2xl font-bold md:text-6xl">Loading...</h1>
      </div>
    )
  }
  return (
    <div className="md:px-32">
    <div className="flex justify-between p-3 py-5 lg:px-10">
       <h1 className="px-5 text-xl font-bold lg:px-10 lg:text-5xl">{listing.title}</h1>
       {/* {saved && saved.map((b)=>b._id ===listing._id ?
       <p key={b._id} className="flex items-center gap-2 pr-5 text-sm text-red-100 md:text-lg"><FaHeart/>  <p className="underline">Your Favorie</p></p>: "")} */}
    </div>
    <div className="flex flex-col-reverse w-full min-h-screen grid-cols-5 gap-10 p-5 lg:p-10 lg:grid">
      <div className="flex flex-col w-full min-h-screen col-span-2 gap-10 px-5 text-xl lg:px-10">
        <div className="space-y-5 text-xl">
          <div>
            {/* <h1 className="text-3xl font-bold lg:text-5xl">{listing.title}</h1> */}
            <p className="text-xl">{listing.location}</p>
          </div>
          <div className="flex items-center text-center">
            <p>
              <LuIndianRupee />
            </p>{" "}
            <p className="text-2xl font-bold">{listing?.price}</p>
            <p className="text-gray-700">/night</p>
          </div>
        </div>
        <div className="flex items-center justify-start w-full gap-10 ">
          <div className="flex flex-col items-center">
            <p>
              <IoPeopleSharp />
            </p>
            <p>{listing.guests} Guests</p>
          </div>
          <div className="flex flex-col items-center">
            <p>
              <IoBedSharp />
            </p>
            <p>{listing.bedrooms} Beds</p>
          </div>
        </div>
        <p className="text-gray-600">
          {listing.description} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Nulla vitae quia atque voluptas, ipsa doloremque
          possimus blanditiis ab quam quasi.
        </p>
        <div className="grid justify-between w-full grid-cols-2 gap-2">
          {listing &&
            listing?.amenties?.map((item, indx) => (
              <div key={indx} className="flex items-center text-slate-700">
                <p>
                  <IoIosArrowRoundForward />
                </p>
                <p>{item}</p>
              </div>
            ))}
        </div>
        <button onClick={()=> setIsBooking(!isBooking)} className="w-full p-3 border border-gray-500 rounded-full hover:bg-red-500 hover:text-white">
          Book Now
        </button>
        <div className="mx-auto">
            <button onClick={()=> setIsRating(!isRating)} className="hover:underline hover:text-red-500">Rate us <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></button>
        </div>
        <div className="flex flex-col gap-3">
          {reviews && reviews.map((item,index)=>(
            <Ratings key={item._id || index} rate={item} />
          ))}
          
        </div>
      </div>
      <div className="w-full col-span-3 space-y-2 lg:min-h-screen">
        {listing.images && (
          <img
            src={`${listing?.images[0]}`}
            className="w-full  h-[500px] rounded-3xl"
            alt=""
          />
        )}
        <div className="flex-wrap hidden gap-2 lg:flex-nowrap lg:flex">
          {listing &&
            listing?.images?.slice(1).map((item, indx) => (
            <img key={indx} src={item} className="w-full h-48 rounded-2xl" />))}
        </div>
        {/* { authUser?.username === listing?.ownerId?.username &&
        <div className="flex flex-col gap-2 py-5 md:flex-row md:gap-10 lg:justify-end">
          <Link to={`/listing/${listing._id}`} className="p-2 md:px-5 md:py-1.5 text-white bg-yellow-500 rounded-md text-center">Update Listing</Link>
            <button onClick={()=>handleDeleteListing(listing._id)} className="p-2 md:px-5 md:py-1.5 text-white bg-red-100 rounded-md">Delete Listing</button>
        </div>} */}
      </div>
      
    </div>
    {isRating && <RatingInputForm handleReviewForm={()=>setIsRating(!isRating)} />  }
      {isBooking && <BookingInputForm listing={listing} handleBookingForm={()=> setIsBooking(!isBooking)} />}
    </div>
  );
}
