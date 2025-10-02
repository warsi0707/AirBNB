import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { memo, useState } from "react";
import ListingInput from "../components/ListingInput";
import { BackendUrl } from "../helper";

 function AddListing() {
  const [title, setTitle] = useState("")
  const [price, setPrice]= useState(0)
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState(2)
  const [bedrooms, setBedrooms] = useState(0)
  const [amenties, setAmenties] = useState([])
  const [images, setImages] = useState([])

  const [amentiesInput, setAmentiesInput] = useState("")
  const [imageInput, setImageInput] = useState("")
  const navigate = useNavigate();



  const handleAddAmenties =()=>{
    setAmenties([...amenties, amentiesInput])
    setAmentiesInput("")
  }
  const handleImageUpload =()=>{
    toast.success("Image uploaded")
    setImages([...images, imageInput])
    setImageInput("")
  }


  const handleAddListing = async () => {
    try {
      const respone = await fetch(`${BackendUrl}/admin/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ title, images, description, price,location, amenties, bedrooms, guests }),
      });
      const result = await respone.json();
      if (respone.status ==200) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.error);
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="w-full min-h-screen">
      <div className="bg-white rounded-md  max-w-[700px] mx-auto my-2 p-5">
        <h1 className="py-5 mb-5 text-3xl ">Create a new listing</h1>
        <div className="flex flex-col gap-4">
          <ListingInput value={title} onchange={(e)=> setTitle(e.target.value)} label={"Title"} type={'text'} placeholder={'Listing Title'}/>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <ListingInput value={price} onchange={(e)=> setPrice(e.target.value)} label={"Price /Day"} type={'number'}placeholder={"1200"}/>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-lg">No of Beds</label>
              <select value={bedrooms} onChange={(e)=> setBedrooms(e.target.value)} name="" id="" className="p-2 border border-gray-300 rounded-md outline-none">
                <option value="">Select No Of Beds</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-lg">No of Guests</label>
              <select value={guests} onChange={(e)=> setGuests(e.target.value)} name="" id="" className="p-2 border border-gray-300 rounded-md outline-none">
                <option value="">Select Guests</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between w-full gap-2 md:flex-row ">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="">Amenties</label>
              <div className="flex gap-2">
                {amenties && amenties.map((item,indx)=>(
                  <p key={indx}>{item}</p>
                ))}
              </div>
              <div className="flex w-full border border-gray-300">
                <input value={amentiesInput} onChange={(e)=> setAmentiesInput(e.target.value)} type="text" className="w-full p-2 outline-none" placeholder="amenties" />
                <button onClick={handleAddAmenties} className="px-2 border-l">+</button>
              </div>
              
            </div>
            <ListingInput value={location} onchange={(e)=> setLocation(e.target.value)} label={"Location"} type={'text'} placeholder={"listign Location"}/>
            
          </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Iamge Link</label>
              <div className="flex w-full gap-2">
              <input value={imageInput} onChange={(e)=> setImageInput(e.target.value)} type="text" className="w-full p-1.5 rounded-md border border-gray-300 outline-none" id="iamges" />
              <button onClick={handleImageUpload} className="px-2 border border-gray-300 rounded-md">Upload</button>
            </div>
            </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="">Description</label>
            <textarea value={description} onChange={(e)=> setDescription(e.target.value)} name="" className="p-3 border border-gray-300 rounded-md" placeholder="Write something" rows={5} id=""></textarea>
          </div>
          <button onClick={handleAddListing} className="w-full p-2 text-white bg-red-100 rounded-md">Upload Listing</button>
        </div>
      </div>
    </div>
  );
}

export default memo(AddListing)