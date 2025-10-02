import { useNavigate, useParams } from "react-router";
import { BackendUrl } from "../helper";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuIndianRupee } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";
import { IoBedSharp } from "react-icons/io5";
import Ratings from "../components/Ratings";
import RatingInputForm from "../components/RatingInputForm";
import { useCallback } from "react";
import BookingInputForm from "../components/BookingInputForm";
import AuthContext from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";

export default function Details() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [isRating, setIsRating] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const {saved,authUser} = useContext(AuthContext)
  console.log(authUser)
  const navigate = useNavigate()
  


  const handleListing =useCallback( async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BackendUrl}/listings/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.status == 200) {
        setLoading(false)
        setListing(result.listing);
      }else{
        setLoading(false)
        setListing([])
      }
    } catch (error) {
      toast.error(error);
    }
  },[])
  const handleDeleteListing =async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/admin/listing/${id}`, {
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status ==200){
        navigate("/")
        toast.success(result.message)
      }else{
        toast.error(result.error)
      }
    }catch(error){
      toast.error("Failed")
    }
  }
  const handleDeleteRate =useCallback( async(rateId)=>{
    try{
      const response = await fetch(`${BackendUrl}/rate/${id}/${rateId}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status == 200){
        handleListing()
        toast.success(result.message)
      }else{
        toast.error(result.error)
      }
    }catch(error){
      toast.error(error)
    }
  },[])
 
  useEffect(() => {
    handleListing();
  }, [id, reviews]);


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
       {saved && saved.map((b)=>b._id ===listing._id ?
       <p key={b._id} className="flex items-center gap-2 pr-5 text-sm text-red-100 md:text-lg"><FaHeart/>  <p className="underline">Your Favorie</p></p>: "")}
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
          {listing.reviews && listing.reviews.map((item)=>(
            <Ratings key={item._id} rate={{...item}} handleDeleteRate={handleDeleteRate} />
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
        {authUser && authUser.role === 'ADMIN' &&
        <div className="flex flex-col gap-2 py-5 md:flex-row md:gap-10 lg:justify-end">
          <button className="p-2 md:px-5 md:py-1.5 text-white bg-yellow-500 rounded-md">Update Listing</button>
            <button onClick={()=>handleDeleteListing(listing._id)} className="p-2 md:px-5 md:py-1.5 text-white bg-red-100 rounded-md">Delete Listing</button>
        </div>}
      </div>
      
    </div>
    {isRating && <RatingInputForm handleReviewForm={()=>setIsRating(!isRating)} handleListing={handleListing}/>  }
      {isBooking && <BookingInputForm listing={{...listing}} handleBookingForm={()=> setIsBooking(!isBooking)} />}
    </div>
  );
}
