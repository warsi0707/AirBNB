import { memo, useEffect, useState } from "react";
import BookingInput from "./BookingInput";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { booking } from "../redux/sclice/listingSlice";


function BookingInputForm({ handleBookingForm,listing }) {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckout]= useState('')
  const [guests, setGuests] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [totalPrice, setTotalPrice] = useState(listing.price)

  const navigate = useNavigate()

  const handleBooking =async()=>{
   await dispatch(booking({checkIn, checkOut, guests, firstName, lastName, phone, email, totalPrice,id})).unwrap()
    handleBookingForm()
    navigate('/bookings')
  }
  useEffect(()=>{
    if(checkIn && checkOut){
      let start = new Date(checkIn)
      let end = new Date(checkOut)
      let totalDay = (end - start)/ (1000 * 60 *60* 24)
      const newTotalPrice = totalDay * listing.price
      setTotalPrice(newTotalPrice)
    }
  },[checkIn, checkOut])
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen p-5 bg-white lg:p-10">
      <div className="flex items-center justify-between py-5 text-xl lg:text-3xl lg:px-20">
        <h1 className="font-semibold">Booking, City Center Apartment</h1>
        <button onClick={handleBookingForm}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="flex w-full h-full py-5 px- lg:px-20 lg:min-h-screen ">
        <div className="flex flex-col w-full h-screen gap-10 px-2 bg-white lg:px-10">
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold">Booking Details</p>
            <div className="flex w-full gap-10">
              <BookingInput values={checkIn} handleChange={(e)=> setCheckIn(e.target.value)} type={'Date'} label={"Check-In"} />
              <BookingInput values={checkOut} handleChange={(e)=> setCheckout(e.target.value)} type={'Date'} label={"Check-out"} />
            </div>
            <div className="flex w-full gap-10">
              <div className="w-full">
                <label  htmlFor="">No of guests</label>
                <select values={guests} handleChange={(e)=> setGuests(e.target.value)} className="w-full p-2 border-2 border-black rounded-md outline-none" name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold">Contact Details</p>
            <div className="flex w-full gap-10">
              <BookingInput values={firstName} handleChange={(e)=> setFirstName(e.target.value)} type={'text'} placeholder={"First Name"} label={"Fist Name"} />
              <BookingInput values={lastName} handleChange={(e)=> setLastName(e.target.value)} type={'text'} placeholder={"Last Name"} label={"Last Name"} />
            </div>
            <div className="flex w-full gap-10">
              <BookingInput values={phone} handleChange={(e)=> setPhone(e.target.value)} type={'Number'} placeholder={"+91 1234567890"} label={"Phone Number "} />
              <BookingInput values={email} handleChange={(e)=> setEmail(e.target.value)} type={'email'} placeholder={"user@gmail.com"} label={"E-Mail"} />
            </div>
          </div>
          <div>
            <p>Total Fare: {totalPrice}</p>
          </div>
          <div>
            <button onClick={handleBooking} className="w-full p-2 text-xl text-white bg-black rounded-xl hover:bg-gray-900">Book Now</button>
          </div>
        </div>
        <div className="hidden w-full h-screen px-32 lg:flex ">
          <div className="w-full h-full overflow-hidden lg:h-[600px] bg-gray-100 shadow-lg">
            <img src={listing?.images[0]} className="w-full h-72 rounded-t-3xl" alt="" />
            <div className="p-5 space-y-5">
              <div className="flex items-center justify-between text-2xl font-semibold">
              <p className="">{listing?.title}</p>
              <div className="flex items-center justify-center gap-1 text-center">
               <p><MdOutlineCurrencyRupee/></p>
                <p className="">{listing?.price.toLocaleString()}</p>
              </div>
              
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam optio asperiores alias neque? Corporis qui maiores laboriosam architecto deleniti deserunt.</p>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Room Features</p>
              
                <div className="grid grid-cols-2">
                  {listing?.amenties?.map((item, indx)=>(
                <p key={indx} >{item}</p>
                ))}
              </div>
              
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(BookingInputForm);
