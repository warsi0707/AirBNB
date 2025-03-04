import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { useRecoilState } from "recoil";
import {
  commentAtom,
  listingAtom,
  loadingAtom,
  ratingAtom,
  reviewAtom,
} from "../atom/atom";
import Loading from "./Loading";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";


export default function Details() {
  const [listing, setListing] = useRecoilState(listingAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [rate, setRate] = useRecoilState(ratingAtom);
  const [comment, setComment] = useRecoilState(commentAtom);
  const [review, setReview] = useRecoilState(reviewAtom);
  const backendUrl = BackendUrl;
  const { id } = useParams();
  const navigate = useNavigate();

  const Getadata = async () => {
    try {
      const response = await fetch(`${backendUrl}/listings/${id}`, {
        method: "GET",
        credentials: "include",
      });
   
      const result = await response.json();
      if (response.ok) {
        setListing(result.listing);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const DeleteListing = async () => {
    try {
      const response = await fetch(`${backendUrl}/listings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setListing(result.listing);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }else{
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const Review = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/listings/${id}`, {
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
      setRate("");
      setComment("");
      setTimeout(() => {
        navigate(`/detail/${id}`);
      }, 3000);
    } else {
      toast.error(result.message);
      toast.error(result.validationMessage);
      setTimeout(() => {
        navigate(`/detail/${id}`);
      }, 3000);
    }
  };
  const GetReview = async () => {
    const response = await fetch(
      `${backendUrl}/listings/ratings/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.review === "") {
      setReview("");
    } else {
      setReview(result.review);
    }
  };
  const DeleteReview = async (reviewId) => {
    const response = await fetch(
      `${backendUrl}/listings/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      setTimeout(() => {
        navigate(`/detail/${id}`);
      }, 2000);
    } else {
      toast.error(result.message);
    }
  };
  useEffect(() => {
    Getadata();
    GetReview();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
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
          src={listing.image}
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
            <h1>Hosted By: {listing.hostedBy} </h1>
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
            <div
              key={item._id}
              className="flex flex-col px-2 my-2 mb-2 bg-white rounded-md justify-left"
            >
              <div className="flex justify-between gap-2 text-lg">
                <div className="flex flex-col gap-1">
                  <h1>Rate: {item.rate}/5</h1>
                  <p>Comment: {item.comment}</p>
                </div>
                <button onClick={() => DeleteReview(item._id)}>
                  <i className="text-sm fa-solid fa-trash"></i>
                </button>
              </div>
              <div>
                <p className="italic">{item.rateBy}</p>
              </div>
            </div>
          ))}

          <div className="border-b-2 borde"></div>
          <div className="flex justify-center gap-5 my-5 rating mb-7 sm:justify-start">
            <form onSubmit={Review} className="flex flex-col w-full gap-2 ">
              <div className="flex flex-col w-full">
                <label htmlFor="rate">Rate </label>
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  name="rate"
                  className="p-2 pl-2 text-xl border-2 border-gray-300 rounded-md"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <label htmlFor="comment">Comment</label>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 pl-2 text-xl border-2 border-gray-300 rounded-md"
                name="comment"
                type="text"
                placeholder="Comment "
              />
              <button
                type="submit"
                className="py-1 text-xl text-white bg-red-500 rounded-md px-7 hover:bg-red-600"
              >
                Review
              </button>
            </form>
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
