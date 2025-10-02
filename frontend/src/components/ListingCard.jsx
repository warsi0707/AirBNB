import { memo } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

function ListingCard({ item, saved, setSaved, postSavedListing }) {
  const isSaved = saved.find((b) => b._id === item._id);

  function removeSavedListing(id) {
    let listing = JSON.parse(localStorage.getItem("saved-listing")) || [];
    if (!Array.isArray(listing)) {
      listing = [];
    }
    if (listing) {
      const newListing = listing.filter((b) => b._id !== id);
      localStorage.setItem("saved-listing", JSON.stringify(newListing));
      toast.success("Unsaved");
      setSaved(newListing);
    }
  }
  return (
    <div className="h-auto w-full sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-2xl relative">
      <Link to={`/detail/${item._id}`}>
        <img
          src={item.images[0]}
          alt=""
          className="object-cover w-full h-60 rounded-xl"
        />
        <div className="p-2">
          <div className="flex justify-between space-y-2 ">
            <h1 className="mt-1 text-lg">{item.title}</h1>
            <div className="text-gray-600">
              <i className="fa-solid fa-indian-rupee-sign"></i> {item.price}
            </div>
          </div>
          <div>
            <h1 className="text-gray-600"></h1>
          </div>
        </div>
      </Link>
      <div className="absolute p-2 top-5 right-5 ">
        {isSaved ? (
          <button
            onClick={() => removeSavedListing(item._id)}
            className="text-2xl text-red-700 "
          >
            {" "}
            <FaHeart />{" "}
          </button>
        ) : (
          <button
            onClick={() => postSavedListing(item)}
            className="text-2xl text-white b"
          >
            <CiHeart />{" "}
          </button>
        )}
      </div>
    </div>
  );
}
export default memo(ListingCard);
