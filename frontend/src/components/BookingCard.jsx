import { memo } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";


function BookingCard({item}) {
  console.log(item)
  return (
    <div className='w-full h-full border shadow-md bg-slate-100 md:w-96 rounded-xl' >
      <div>
        <img src={item.listing.images[0]} className='w-full h-60 rounded-t-xl' alt="" />
      </div>
      <div className='flex flex-col gap-5 p-5' >
        <p className='text-sm text-gray-600'>Booking Id: {item._id}</p>
        <div>
          <p className='text-xl font-semibold md:text-2xl'>{item?.listing.title}</p>
          <div className='flex items-center md:text-2xl'><MdOutlineCurrencyRupee/><p>{item.totalPrice}</p></div>
        </div>
        <div className='flex items-center justify-between'>
          <p>{item.checkIn}</p>
          <p>{item.checkOut}</p>
        </div>
        <p>{item.listing.description}</p>
        <button className="p-2 text-white bg-black rounded-md">Cancel Booking</button>
      </div>
    </div>
  )
}

export default memo(BookingCard)
