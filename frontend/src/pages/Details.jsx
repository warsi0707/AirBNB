import { Link, useParams } from "react-router";
import useListing from "../hooks/useListing";
import { BackendUrl } from "../helper";
import { memo, useRef } from "react";
import Ratings from "../components/Ratings";
import useReview from "../hooks/useReview";
import useListingDelete from "../hooks/useListingDelete";
import toast from "react-hot-toast";


function Details() {
  const { id } = useParams();
  const { review } = useReview();
  const { listing, owner } = useListing();
  const { DeleteListing } = useListingDelete();
  const rateRef = useRef(3);
  const commentRef = useRef(null);

  const PostReview = async () => {
    const rate = rateRef.current.value;
    const comment = commentRef.current.value;
    try {
      const response = await fetch(`${BackendUrl}/listings/rate/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rate, comment }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  const DeleteReview= async(reviewId)=>{
    const response = await fetch(`${BackendUrl}/listings/rate/${id}/${reviewId}`,{
        method: "DELETE",
        credentials: 'include'
    })
    const result = await response.json()
    if(response.ok){
        toast.success(result.message)
    }else{
        toast.error(result.message)
    }
}

  return (
    <div className="flex flex-col justify-center py-5 mx-5 md:mx-20">
      <div className="flex justify-between py-5">
        <h1 className="text-3xl">{listing.title}</h1>
        <h1 className="text-lg">
          <i className="space-x-5 fa-regular fa-heart"></i>&nbsp; &nbsp;save
        </h1>
      </div>
      <div className="img ">
        <img
          src={`${listing.image}`}
          className="object-cover w-full h-96 rounded-2xl"
          alt=""
        />
      </div>
      <div className="flex flex-col my-10 details sm:flex-row sm:justify-between md:justify-evenly">
        <div className="detail">
          <div className="py-6">
            <h1 className="text-2xl">{listing.title} in india</h1>
            <p>
              {listing.guests} Guests, {listing.bedrooms} Bedroom,{" "}
            </p>
          </div>
          <div className="border-b-2 borde"></div>
          <div className="py-6">
            <h1>Hosted By: {owner}</h1>
          </div>
          <div className="flex justify-center gap-5 btn mb-7 sm:justify-start">
            <Link
              to={`/listing/${listing._id}`}
              className="py-1 text-xl text-white bg-black rounded-md px-7 "
            >
              Edit
            </Link>
            <button
              onClick={DeleteListing}
              className="py-1 text-xl text-white bg-red-500 rounded-md px-7 "
            >
              Delete
            </button>
          </div>
          <div className="border-b-2 borde"></div>
          {review.map((item) => (
            <Ratings key={item._id} rate={item.rete} comment={item.comment} user={item.user.username} onclick={()=>DeleteReview(item._id)}/>
          ))}

          <div className="border-b-2 borde"></div>
          <div className="flex justify-center gap-5 my-5 rating mb-7 sm:justify-start">
            <div className="flex flex-col w-full gap-2 ">
              <div className="flex flex-col w-full">
                <label htmlFor="rate">Rate </label>
                <input
                  ref={rateRef}
                  name="rate"
                  className="p-2 pl-2 text-xl border-2 border-gray-300 rounded-md"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <label htmlFor="comment">Comment</label>
              <input
                ref={commentRef}
                className="p-2 pl-2 text-xl border-2 border-gray-300 rounded-md"
                name="comment"
                type="text"
                placeholder="Comment "
              />
              <button
                onClick={PostReview}
                type="submit"
                className="py-1 text-xl text-white bg-red-500 rounded-md px-7 hover:bg-red-600"
              >
                Review
              </button>
            </div>
          </div>
        </div>

        <div className="w-auto p-5 py-5 mx-auto mt-10 bg-white border-2 border-gray-200 shadow-xl price h-72 sm:w-60 sm:mt-10 rounded-xl">
          <div className="mb-4">
            <h1 className="mb-2 space-x-2 text-xl">
              <i className="fa-solid fa-dollar-sign"></i>
              {listing.price} / Nights
            </h1>
            <p className="text-gray-600">Price before taxes</p>
          </div>
          <div className="border-2"></div>

          <div className="mt-2 btn">
            <button className="w-full py-2 text-xl text-center text-white bg-red-500 rounded-md">
              Reserve
            </button>
          </div>
          <p className="pt-2 text-center">You cant`t be change yet</p>
        </div>
      </div>
    </div>
  );
}
export default  memo(Details)