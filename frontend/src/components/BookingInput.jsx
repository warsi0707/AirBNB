import { memo } from "react";

function BookingInput({type,value, handleChange, placeholder, label}) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="" className="text-xl text-black">{label}</label>
      <input value={value} onChange={handleChange} type={type} className="w-full p-2 border-2 border-black rounded-md outline-none" placeholder={placeholder} />
    </div>
  );
}
export default memo(BookingInput)