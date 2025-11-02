import { memo } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";

function BookingCard({booking, handleCancelBooking}) {
  return (
    <div className='w-full h-full border shadow-md bg-slate-100 md:w-80 rounded-xl' >
      <div>
        <img src={booking?.listing?.images[0]} className='w-full h-60 rounded-t-xl' alt="" />
      </div>
      <div className='flex flex-col gap-5 p-5' >
        <p className='text-sm text-gray-600'>Booking Id: {booking?._id}</p>
        <div>
          <p className='text-xl font-semibold md:text-2xl'>{booking?.listing?.title}</p>
          <div className='flex items-center md:text-2xl'><MdOutlineCurrencyRupee/><p>{booking?.totalPrice}</p></div>
        </div>
        <div className='flex items-center justify-between'>
          <p>{booking?.checkIn}</p>
          <p>{booking?.checkOut}</p>
        </div>
        <p>{booking?.listing?.description}</p>

        <button onClick={handleCancelBooking} className="p-2 text-white bg-black rounded-md">Cancel Booking</button>
      </div>
    </div>
  )
}

export default memo(BookingCard)
