import  { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";

 function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [bedrooms, setBeds] = useState();
  const [guests, setGuest] = useState();
  const navigate = useNavigate();
  const backendUrl = BackendUrl;
  
  const GetData = async () => {
    const response = await fetch(
      `${backendUrl}/listings/${id}`,
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
      const respone = await fetch(`${backendUrl}/listings/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, price, description, bedrooms, guests }),
      });
      const result = await respone.json();
      if (respone.ok) {
        // setLoading(false);
        toast.success(result.message);
        setTimeout(() => {
          navigate(`/detail/${id}`);
        }, 2000);
      } else {
        toast.error(result.message);
        setTimeout(() => {
          navigate(`/detail/${id}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  
  return (
    <div className="h-full">
      <div className="bg-white rounded-md  max-w-[700px] mx-auto my-2 p-5">
        <h1 className="py-5 mb-5 text-3xl ">Create a new listing</h1>
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
                className="px-3 py-2 rounded-md text-md"
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
                className="px-3 py-2 rounded-md text-md"
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
                className="px-3 py-2 rounded-md text-md"
                placeholder="Image Link"
              />
            </div>
            <div className="flex flex-col gap-5 sm:grid sm:gap-2 sm:grid-cols-9 sm:justify-items-center">
              <div className="flex flex-col gap-2 sm:col-span-3">
                <label htmlFor="" className="text-lg">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="w-full px-3 py-2 rounded-md text-md"
                  placeholder="Price"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-3">
                <label htmlFor="" className="text-lg">
                  Guests
                </label>
                <input
                  value={guests}
                  onChange={(e) => setGuest(e.target.value)}
                  type="number"
                  className="w-full px-3 py-2 rounded-md text-md"
                  placeholder="No Of Guests"
                />
              </div>
              <div className="flex flex-col col-span-3 gap-2">
                <label htmlFor="" className="text-lg">
                  Beds
                </label>
                <input
                  value={bedrooms}
                  onChange={(e) => setBeds(e.target.value)}
                  type="number"
                  className="w-full px-3 py-2 rounded-md text-md"
                  placeholder="No Of Beds"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 my-10 text-xl font-bold text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Make changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default memo(Edit)