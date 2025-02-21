import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  bedsAtom,
  descriptionAtom,
  errorAtom,
  guestsAtom,
  imageAtom,
  loadingAtom,
  messageAtom,
  priceAtom,
  titleAtom,
} from "../atom/atom";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { BackendUrl } from "../helper";

export default function Edit() {
  const [title, setTitle] = useRecoilState(titleAtom);
  const [image, setImage] = useRecoilState(imageAtom);
  const [price, setPrice] = useRecoilState(priceAtom);
  const [description, setDescription] = useRecoilState(descriptionAtom);
  const [beds, setBeds] = useRecoilState(bedsAtom);
  const [guest, setGuest] = useRecoilState(guestsAtom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const navigate = useNavigate();
  const { id } = useParams();
  const backendUrl = BackendUrl;

  const GetData = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/api/listings/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (response.ok) {
      setTitle(result.listing.title);
      setImage(result.listing.image);
      setPrice(result.listing.price);
      setDescription(result.listing.description);
      setBeds(result.listing.bedrooms);
      setGuest(result.listing.guests);
    }
  };

  const EditListing = async (e) => {
    e.preventDefault();
    try {
      const respone = await fetch(`${backendUrl}/v1/api/listings/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, price, description, beds, guest }),
      });
      const result = await respone.json();
      if (respone.ok) {
        setLoading(false);
        setMessage(result.message);
        setTitle("");
        setImage("");
        setPrice("");
        setDescription("");
        setBeds();
        setGuest();
        setTimeout(() => {
          navigate(`/detail/${id}`);
          setMessage("");
        }, 2000);
      } else {
        setError(result.message);
        setTimeout(() => {
          setError("");
          navigate(`/detail/${id}`);
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="h-full">
      {message && (
        <h1 className="text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white">
          {message}
        </h1>
      )}
      {error && (
        <h1 className="text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white">
          {error}
        </h1>
      )}
      <div className="bg-white rounded-md  max-w-[700px] mx-auto my-2 p-5">
        <h1 className=" py-5 text-3xl mb-5">Create a new listing</h1>
        <div className="inputs">
          <form onSubmit={EditListing} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="py-2 rounded-md px-3 text-md"
                placeholder="Enter The Title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="py-2 rounded-md px-3 text-md"
                placeholder="Enter Your Descriptions"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg">
                Image Link
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="text"
                className="py-2 rounded-md px-3 text-md"
                placeholder="Image Link"
              />
            </div>
            <div className="flex flex-col gap-5 sm:grid sm:gap-2 sm:grid-cols-9 sm:justify-items-center">
              <div className="flex flex-col gap-2  sm:col-span-3">
                <label htmlFor="" className="text-lg">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="py-2 w-full rounded-md px-3 text-md"
                  placeholder="Price"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-3">
                <label htmlFor="" className="text-lg">
                  Guests
                </label>
                <input
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  type="number"
                  className="py-2 w-full rounded-md px-3 text-md"
                  placeholder="No Of Guests"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-3">
                <label htmlFor="" className="text-lg">
                  Beds
                </label>
                <input
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  type="number"
                  className="py-2 w-full rounded-md px-3 text-md"
                  placeholder="No Of Beds"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-500 w-full text-xl text-white py-2 font-bold rounded-md my-10 hover:bg-red-700"
            >
              Make changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
