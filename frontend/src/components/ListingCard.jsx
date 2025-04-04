import { memo } from "react";
import { Link } from "react-router-dom";

function ListingCard({ id, image, title, price }) {
  return (
    <div
    
    className="h-auto w-auto px-5 sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-gray-400 object-fill">
      <Link to={`/detail/${id}`}>
        <img
          src={image}
          alt=""
          className="object-cover w-full h-60 rounded-xl"
        />
        <div className="py-3">
          <div className="flex justify-between space-y-2 ">
            <h1 className="mt-1 text-xl">{title}</h1>
            <h1 className="text-gray-600">
              <i className="fa-solid fa-dollar-sign "></i> {price}
            </h1>
          </div>
          <div>
            <h1 className="text-gray-600"></h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default memo(ListingCard);
