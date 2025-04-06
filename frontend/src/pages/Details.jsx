import { Link, useNavigate, useParams } from "react-router";
import useListing from "../hooks/useListing";
import { BackendUrl } from "../helper";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Ratings from "../components/Ratings";

import useListingDelete from "../hooks/useListingDelete";
import toast from "react-hot-toast";
import axios from "axios";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const { review } = useReview();
  const { listing, owner } = useListing();
  const { DeleteListing } = useListingDelete();
  const rateRef = useRef(3);
  // const [rate, setRate] = useState(3)
  const commentRef = useRef(null);
  const [review, setReview] = useState([]);
  
  const GetReview = useCallback(async () => {
    try {
      const response = await axios.get(`${BackendUrl}/listings/rate/${id}`, {
    
      });
      const result = response.data;
      // const result = await response.json();
      if (response) {
        setReview(result.review || []);
      } else {
        setReview([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
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
        GetReview()
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const DeleteReview = useCallback(async (reviewId) => {
    const response = await fetch(
      `${BackendUrl}/listings/rate/${id}/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (response.ok) {
        GetReview()
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }, []);
  const SaveListing = async () => {
    try {
      const response = await fetch(`${BackendUrl}/listings/save/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ReservListing = async () => {
    try {
      const response = await fetch(`${BackendUrl}/listings/booking/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/bookings");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
      GetReview();
  }, []);
  return (
    <div className="flex flex-col justify-center py-5 mx-5 md:mx-20">
      <div className="flex justify-between py-5">
        <h1 className="text-3xl">{listing.title}</h1>
        <p className="text-lg">
          <button onClick={SaveListing}>
            <i className="space-x-5 transition duration-300 ease-in fa-regular fa-heart hover:cursor-pointer hover:scale-150"></i>
            &nbsp; &nbsp;save
          </button>
        </p>
      </div>
      <div className="img ">
        <img
          src={`${listing.image}`}
          className="object-cover w-full transition-all duration-300 ease-in h-96 rounded-2xl hover:shadow-lg hover:scale-105 hover:shadow-gray-600"
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
          <div className="flex justify-center gap-5 btn mb-7 sm:justify-start ">
            <Link
              to={`/listing/${listing._id}`}
              className="py-1 text-xl text-white transition-all duration-300 ease-in-out bg-black rounded-md px-7 hover:shadow-xl hover:shadow-gray-500 hover:scale-110"
            >
              Edit
            </Link>
            <button
              onClick={DeleteListing}
              className="py-1 text-xl text-white transition-all duration-300 bg-red-500 rounded-md px-7 hover:shadow-xl hover:shadow-red-400 hover:scale-105"
            >
              Delete
            </button>
          </div>
          <div className="border-b-2 borde"></div>
          {review.map((item) => (
            <Ratings
              key={item._id}
              rate={item.rate}
              comment={item.comment}
              user={item.user.username}
              onclick={() => DeleteReview(item._id)}
            />
          ))}

          <div className="border-b-2 borde"></div>
          <div className="flex justify-center gap-5 my-5 rating mb-7 sm:justify-start">
            <div className="flex flex-col w-full gap-2 ">
              <div className="flex flex-col w-full">
                <label htmlFor="rate">Rate </label>
                <input
                  ref={rateRef}
                  // value={rate}
                  // onChange={(e)=> setRate(e.target.value)}
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
                className="py-1 text-xl text-white transition-all duration-300 bg-red-500 rounded-md px-7 hover:bg-red-600 hover:shadow-xl hover:scale-105 hover:shadow-red-200"
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
            <button
              onClick={ReservListing}
              className="w-full py-2 text-xl text-center text-white transition-all duration-300 ease-in bg-red-500 rounded-md hover:shadow-xl hover:shadow-red-300 hover:scale-110"
            >
              Reserve
            </button>
          </div>
          <p className="pt-2 text-center">You cant`t be change yet</p>
        </div>
      </div>
    </div>
  );
}
export default memo(Details);
