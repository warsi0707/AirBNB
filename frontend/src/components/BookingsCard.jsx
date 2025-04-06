import { memo } from "react";

function BookingsCard({ image, title, description, bookedAt, onclick}) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 p-2 rounded-md sm:justify-between sm:flex-row h-72">
      <div className="w-full rounded-md h-72">
        <img src={image} className="w-full rounded-md sm:h-72" alt="" />
      </div>
      <div className="flex flex-col justify-between w-full p-5 bg-gray-200 rounded-md min-h-72">
        <button onClick={onclick} className="flex justify-end">
          <i className="fa-solid fa-trash"></i>
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-thin text-center">{title}</h1>
          <p className="text-center text-gray-700">{description}</p>
        </div>
        <div className="flex justify-between">
          <p>{bookedAt}</p>
        </div>
      </div>
    </div>
  );
}
export default memo(BookingsCard);
