import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { useRecoilState } from "recoil";
import {
  commentAtom,
  errorAtom,
  listingAtom,
  loadingAtom,
  messageAtom,
  ratingAtom,
  reviewAtom,
} from "../atom/atom";
import Loading from "./Loading";
import { BackendUrl } from "../helper";


export default function Details() {
  const [listing, setListing] = useRecoilState(listingAtom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [rate, setRate] = useRecoilState(ratingAtom);
  const [comment, setComment] = useRecoilState(commentAtom);
  const [review, setReview] = useRecoilState(reviewAtom);
  const backendUrl = BackendUrl;
  const { id } = useParams();
  const navigate = useNavigate();

  const Getadata = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/listings/${id}`, {
        method: "GET",
        credentials: "include",
      });
   
      const result = await response.json();
      if (response.ok) {
        setListing(result.listing);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
    }
  };
  const DeleteListing = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/listings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setListing(result.listing);
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 2000);
      }else{
        setError(result.message)
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const Review = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/v1/api/listings/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rate, comment }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(result.message);
      setRate("");
      setComment("");
      setTimeout(() => {
        setMessage("");
        setError("");
        navigate(`/detail/${id}`);
      }, 3000);
    } else {
      setError(result.message);
      setError(result.validationMessage);
      setTimeout(() => {
        setError("");
        setMessage("");
        navigate(`/detail/${id}`);
      }, 3000);
    }
  };
  const GetReview = async () => {
    const response = await fetch(
      `${backendUrl}/v1/api/listings/ratings/${id}`,
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
      `${backendUrl}/v1/api/listings/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (response.ok) {
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
        navigate(`/detail/${id}`);
      }, 2000);
    } else {
      setError(result.message);
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
    <div className=" flex justify-center flex-col mx-5 md:mx-20 py-5">
      {message && (
        <h1 className="text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5  md:py-2 text-2xl rounded-xl text-black font-bold">
          {message}
        </h1>
      )}

      {error && (
        <h1 className="text-center bg-red-500 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-black font-bold">
          {error}
        </h1>
      )}

      <div className="flex justify-between py-5">
        <h1 className="text-3xl">{listing.title}</h1>
        <h1 className="text-lg">
          <i className="fa-regular fa-heart space-x-5"></i>&nbsp; &nbsp;save
        </h1>
      </div>
      <div className="img ">
        <img
          src={listing.image}
          className=" h-96 object-cover w-full rounded-2xl"
          alt=""
        />
      </div>
      <div className="details flex flex-col sm:flex-row sm:justify-between md:justify-evenly my-10">
        <div className="detail">
          <div className="py-6">
            <h1 className="text-2xl">{listing.title} in india</h1>
            <p>
              {listing.guests} Guests, {listing.bedrooms} Bedroom,{" "}
            </p>
          </div>
          <div className="borde border-b-2"></div>
          <div className="py-6">
            <h1>Hosted By: {listing.hostedBy} </h1>
          </div>
          <div className="btn flex gap-5 mb-7 justify-center sm:justify-start">
            <Link
              to={`/listing/${listing._id}`}
              className="bg-black text-white py-1 px-7 text-xl rounded-md "
            >
              Edit
            </Link>
            <button
              onClick={DeleteListing}
              className="bg-red-500 text-white py-1 px-7 text-xl rounded-md "
            >
              Delete
            </button>
          </div>
          <div className="borde border-b-2"></div>
          {review.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-left my-2 bg-white px-2 rounded-md mb-2"
            >
              <div className="flex justify-between gap-2 text-lg">
                <div className="flex flex-col gap-1">
                  <h1>Rate: {item.rate}/5</h1>
                  <p>Comment: {item.comment}</p>
                </div>
                <button onClick={() => DeleteReview(item._id)}>
                  <i className="fa-solid fa-trash text-sm"></i>
                </button>
              </div>
              <div>
                <p className="italic">{item.rateBy}</p>
              </div>
            </div>
          ))}

          <div className="borde border-b-2"></div>
          <div className="rating my-5 flex gap-5 mb-7 justify-center sm:justify-start">
            <form onSubmit={Review} className="flex flex-col w-full gap-2 ">
              <div className="w-full flex flex-col">
                <label htmlFor="rate">Rate </label>
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  name="rate"
                  className="border-2 border-gray-300 p-2 text-xl pl-2 rounded-md"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <label htmlFor="comment">Comment</label>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-2 border-gray-300 p-2 text-xl pl-2 rounded-md"
                name="comment"
                type="text"
                placeholder="Comment "
              />
              <button
                type="submit"
                className="bg-red-500 text-white py-1 px-7 text-xl rounded-md hover:bg-red-600"
              >
                Review
              </button>
            </form>
          </div>
        </div>

        <div className="price w-auto h-72 sm:w-60 py-5 shadow-xl mx-auto mt-10 sm:mt-10 bg-white rounded-xl border-2 border-gray-200 p-5">
          <div className="mb-4">
            <h1 className="space-x-2 mb-2 text-xl">
              <i className="fa-solid fa-dollar-sign"></i>
              {listing.price} / Nights
            </h1>
            <p className="text-gray-600">Price before taxes</p>
          </div>
          <div className="border-2"></div>

          <div className="btn mt-2">
            <button className="w-full py-2 bg-red-500 text-white text-center text-xl rounded-md">
              Reserve
            </button>
          </div>
          <p className="text-center pt-2">You cant't be change yet</p>
        </div>
      </div>
    </div>
  );
}
