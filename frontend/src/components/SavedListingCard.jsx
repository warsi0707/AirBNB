import { memo } from "react";
import { Link } from "react-router-dom";

function SavedListingCard({title, date,id, onclick}) {

  return (
    <div>
      <div className="flex justify-between w-full p-5 bg-gray-200 rounded-md ">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl">{title}</h1>
          <p>{date}</p>
        </div>
        <div className="flex items-center gap-5">
          <Link to={`/detail/${id}`} className="text-xl">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
          <button onClick={onclick} className="sm:text-xl">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
     
    </div>
  );
}
export default memo(SavedListingCard);
