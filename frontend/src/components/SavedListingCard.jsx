import { memo, useContext } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";


function SavedListingCard({item}) {
  const {setSaved} = useContext(AuthContext)
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
   <div className="flex flex-col w-full grid-cols-3 border shadow-xl md:grid rounded-2xl border-slate-200 ">
    <img src={item.images[0]} className="w-full h-48 col-span-1 rounded-t-xl md:rounded-tr-none md:rounded-l-xl" alt="" />
    <div className="flex flex-col w-full h-full col-span-2 gap-2 p-5 md:gap-5 rounded-r-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold lg:text-xl">{item.title}</p>
          <p className="text-gray-600">{item.location}</p>
        </div>
        <div className="flex items-center font-semibold md:text-2xl">
          <p><MdCurrencyRupee/></p>
           <p className="pb-1">{item.price}</p>
        </div>
       
      </div>
      <div className="flex flex-wrap gap-2 text-sm lg:flex-nowrap">
        {item && item.amenties.map((amen, indx)=> (
            <p key={indx}>{amen}</p>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={()=> removeSavedListing(item._id)} className="p-1.5 md:text-2xl border rounded-full text-red-100" ><FaHeart/></button>
        <Link to={`/detail/${item._id}`} className="flex items-center gap-2 px-2 text-white bg-red-100 md:px-5 md:text-xl rounded-xl"><p>Book Now</p> <CiCalendarDate/></Link>
      </div>
    </div>
   </div>
  );
}
export default memo(SavedListingCard);
