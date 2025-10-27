import { memo } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveListing, unsaveListing } from "../redux/sclice/listingSlice";


function ListingCard({listing, item, saved, setSaved, postSavedListing }) {
  const dispatch = useDispatch()
  const savedListing = useSelector(state => state.listing.savedListing);
  const isSaved = savedListing?.find((b) => b._id === listing._id);

  const handlesaveListing =(payload)=>{
    dispatch(saveListing(payload))
  }
  const handleUnsaveListing =(payload)=>{
    dispatch(unsaveListing(payload))
  }

  return (
    <div className="h-auto w-full sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-2xl relative">
      <Link to={`/detail/${listing._id}`}>
        <img
          src={listing.images[0]}
          alt=""
          className="object-cover w-full h-60 rounded-xl"
        />
        <div className="p-2">
          <div className="flex justify-between space-y-2 ">
            <h1 className="mt-1 text-lg">{listing.title}</h1>
            <div className="text-gray-600">
              <i className="fa-solid fa-indian-rupee-sign"></i> {listing.price}
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
          onClick={()=> handleUnsaveListing(listing._id)}
            className="text-2xl text-red-700 "
          >
            {" "}
            <FaHeart />{" "}
          </button>
        ) : (
          <button
          onClick={()=> handlesaveListing(listing)}
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
