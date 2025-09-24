import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import { memo,  useRef } from "react";
import ListingInput from "../components/ListingInput";

 function AddListing() {
  const titleRef = useRef()
  const imageRef = useRef()
  const priceRef = useRef()
  const descriptionRef = useRef()
  const bedsRef = useRef()
  const guestRef = useRef()
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const AddListing = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value
    const image = imageRef.current.value
    const description = descriptionRef.current.value
    const price = priceRef.current.value
    const bedrooms = bedsRef.current.value
    const guests = guestRef.current.value
    try {
      const respone = await fetch(`${backendUrl}/listings`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, description, price, bedrooms, guests }),
      });
      const result = await respone.json();
      if (respone.ok) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.validationMessage);
        setTimeout(() => {
          toast.error("");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="h-full">
      <div className="bg-white rounded-md  max-w-[700px] mx-auto my-2 p-5">
        <h1 className="py-5 mb-5 text-3xl ">Create a new listing</h1>
        <div className="inputs">
          <form onSubmit={AddListing} className="flex flex-col gap-5">
           <ListingInput title={"Title"} type={"text"} placeholder={"Title"} refs={titleRef}/>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg">
                Description
              </label>
              <textarea
               ref={descriptionRef}
                type="text"
                className="px-3 py-2 border border-gray-200 rounded-md text-md"
                placeholder="Enter Your Descriptions"
              />
            </div>
            <ListingInput title={"Image Link"} type={"text"} placeholder={"Link..."} refs={imageRef}/>
            <div className="flex flex-col justify-between gap-5 md:flex-row">
              
            <ListingInput title={"Price"} type={"number"}  refs={priceRef}/>
             <ListingInput  title={"Guests"} type={"number"}  refs={guestRef}/>
             <ListingInput  title={"Beds"} type={"number"}  refs={bedsRef}/>
            </div>
            <button
              type="submit"
              className="w-full py-2 my-10 text-xl font-bold text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(AddListing)