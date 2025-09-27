import { useContext, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import { useEffect } from "react";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, authUser } = useContext(AuthContext);
  const [query, setQuery] = useState("")
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const backendUrl = BackendUrl;
  console.log(query)

  const searchedListing =async()=>{
      try{
        const response = await fetch(`${backendUrl}/listings/search?query=${query}`, {
          method: 'GET'
        })
        const result = await response.json()
        console.log(response)
        console.log(result)
      }catch(error){
        toast.error("failed")
      }
    }

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    console.log(token.length)
    if(token.length >0){
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      toast.success("Logout success")
      navigate("/")
    }
  
  };
  // useEffect(()=>{
    
  //   searchedListing()
  // },[query])

  return (
    <>
    <div className="sticky top-0 z-50 flex items-center justify-between w-full p-8 bg-white border-b">
      <div>
        <Link to={"/"} className="flex gap-2">
            <img
              src="/logo.png"
              width={30}
              height={10}
              className="h-8"
              alt=""
            />
            <h1 className="hidden text-2xl font-bold text-red-500 sm:block">
              airbnb
            </h1>
          </Link>
      </div>
      <div className="hidden lg:flex items-center p-1.5 border-2 rounded-full w-96">
        <input value={query} onChange={(e)=> setQuery(e.target.value)} type="text" className="w-full px-2 outline-none" placeholder="Type location"/>
        <button onClick={()=>searchedListing()} className="p-2 text-2xl text-white bg-red-500 rounded-full"><IoMdSearch/></button>
      </div>
      <div>
        {menu?  
        <button onClick={()=> setMenu(!menu)} className="p-3 text-2xl bg-gray-200 rounded-full"><RxCross1/></button>:
        <button  onClick={()=> setMenu(!menu)} className="p-3 text-2xl bg-gray-200 rounded-full"><HiMiniBars3/></button>
        }
      </div>
    </div>
    {menu && <div className="fixed z-50 p-5 bg-white border shadow-xl right-10 top-28 w-60 lg:w-80 rounded-xl">
      {isAuthenticated && authUser.username &&
      <div className="py-5 border-b">
        <p className="text-2xl font-semibold">{authUser?.username[0].toUpperCase()+ authUser?.username?.slice(1)}</p>
      </div>}
      {isAuthenticated && isAuthenticated &&
      <div className="flex flex-col gap-2 py-5 border-b">
        {authUser && authUser.role === 'ADMIN' &&
        <Link to={"/add"} className="hover:underline">Post Your Airbnb</Link>}
        
        <Link to={"/bookings"} className="hover:underline">Your Bookings</Link>
      </div>}
      <div className="flex flex-col gap-2 py-5 ">
        {isAuthenticated? 
        <button onClick={handleLogout} className="flex justify-start hover:underline">Logout</button>:
        <>
        <Link to={"/signin"} className="hover:underline">Signin</Link>
        <Link to={"/signup"} className="hover:underline">Signup</Link>
        </>
      }
      </div>
    </div>}
    </>
  );
}
export default memo(Navbar);
