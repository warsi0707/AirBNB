import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingHeartBtn from "./ListingHeartBtn";

function ListingCard({  item }) {
  const [savedListing, setSavedListing] = useState([])
  console.log(savedListing)

  const handleGetSaved =()=>{
    const saved =JSON.parse(localStorage.getItem('saved') || "[]") 
    setSavedListing(saved)
  }
  const handleSaved =(item)=>{
    const saved =JSON.parse(localStorage.getItem('saved'))
    console.log(saved)
    
    if(saved && saved.find((items)=> items._id !== item.id)){
      saved.push(item)
      localStorage.setItem('saved', JSON.stringify(saved))
    }
  }
    useEffect(()=>{
      const saved =JSON.parse(localStorage.getItem('saved')) 
    setSavedListing(saved)
    },[])
  return (
    <div
    className="h-auto w-full sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-2xl relative">
      <Link to={`/detail/${item._id}`}>
        <img
          src={item.images[0]}
          alt=""
          className="object-cover w-full h-60 rounded-xl"
        />
        <div className="p-2">
          <div className="flex justify-between space-y-2 ">
            <h1 className="mt-1 text-lg">{item.title}</h1>
            <div className="text-gray-600">
              <i className="fa-solid fa-indian-rupee-sign"></i> {item.price}
            </div>
          </div>
          <div>
            <h1 className="text-gray-600"></h1>
          </div>
        </div>
      </Link>
      <div className="absolute p-2 top-5 right-5 ">
        {/* {JSON.parse(saved)} */}
        {/* {savedListing.includes(String(item._id))?
       <button  className="text-2xl text-white b"><i className="fa-solid fa-heart"></i> </button> : */}
       <button onClick={()=>handleSaved(item)} className="text-2xl text-white b"><i className="fa-regular fa-heart"></i> </button>
       {/* } */}
       
      </div>
      
    </div>
  );
}
export default memo(ListingCard);
