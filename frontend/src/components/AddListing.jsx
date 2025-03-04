import { useRecoilState, useResetRecoilState } from "recoil";
import {
  bedsAtom,
  descriptionAtom,
  guestsAtom,
  imageAtom,
  loadingAtom,
  priceAtom,
  titleAtom,
} from "../atom/atom";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";

export default function AddListing() {
  const [title, setTitle] = useRecoilState(titleAtom);
  const [image, setImage] = useRecoilState(imageAtom);
  const [price, setPrice] = useRecoilState(priceAtom);
  const [description, setDescription] = useRecoilState(descriptionAtom);
  const [beds, setBeds] = useRecoilState(bedsAtom);
  const [guest, setGuest] = useRecoilState(guestsAtom);
  const setLoading = useResetRecoilState(loadingAtom);
  const backendUrl = BackendUrl;
  const navigate = useNavigate();
  const AddListing = async (e) => {
    e.preventDefault();
    try {
      const respone = await fetch(`${backendUrl}/listings`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, description, price, beds, guest }),
      });
      const result = await respone.json();
      setLoading(true);
      if (respone.ok) {
        setLoading(false);
        toast.success(result.message);
        setTitle("");
        setImage("");
        setPrice("");
        setDescription("");
        setBeds("");
        setGuest("");
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
  };
  return (
    <div className="h-full">
      <div className="bg-white rounded-md  max-w-[700px] mx-auto my-2 p-5">
        <h1 className="py-5 mb-5 text-3xl ">Create a new listing</h1>
        <div className="inputs">
          <form onSubmit={AddListing} className="flex flex-col gap-5">
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
                  value={guest}
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
                  value={beds}
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
