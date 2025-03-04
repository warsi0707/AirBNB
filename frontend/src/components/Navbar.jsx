import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue} from 'recoil'
import { authenticatedAtom, userAtom, userEmailAtom, userMenuAtom } from '../atom/atom'
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from '../helper'
import toast from 'react-hot-toast'

export default function Navbar() {
    const [hamberg, setHamberg] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedAtom)
    const [userMneu, setUserMenu] = useRecoilState(userMenuAtom)
    const username = useRecoilValue(userAtom)
    const userEmail = useRecoilValue(userEmailAtom)
    const navigate = useNavigate()
    const backendUrl = BackendUrl

    const HandleHamberg =()=>{
        setHamberg(!hamberg)
    }
    const HandleUserMenu =()=>{
        setUserMenu(!userMneu)
    }
    const Logout = async()=>{
        try{
            const response = await fetch(`${backendUrl}/user/logout`,{
                method: "POST",
                credentials: "include"
            })
            const result = await response.json()
            if(response.ok){
                setIsAuthenticated(false)
                toast.success(result.message)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
        }catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div>
        <nav className='flex justify-between w-full p-2 border-b-2 md:p-7'>
            <div className="ml-5 logo md:ml-10">
                <Link to={"/"} className='flex gap-2'>
                <img src="/logo.png" width={30} height={10} className='h-8' alt="" />
                <h1 className='hidden text-2xl font-bold text-red-500 sm:block'>airbnb</h1>
                </Link>
            
            </div>
            <div className="flex gap-2 profiles sm:gap-5 sm:mr-20">
                {isAuthenticated? <Link to={"/add"} className='hidden mt-4 md:block'>Airbnb your Home</Link>: ""}
                
                {/* <h1><i className="hidden mt-3 text-lg fa-solid fa-globe sm:block"></i></h1> */}
                <h1  className='flex gap-4 p-4 px-4 transition-all border border-gray-300 rounded-full shadow-sm hover:ease-in-out '>
                <button onClick={HandleHamberg}><i className="fa-solid fa-bars "></i></button> 
                {isAuthenticated?  <button onClick={HandleUserMenu}><i className="mt-1 fa-regular fa-user"></i></button>: ""}
               
                </h1>
            </div>
        </nav>
        {hamberg? <>
        <div className="absolute w-64 py-4 mx-auto my-1 bg-white shadow-xl hamberg rounded-xl right-5 md:absolute sm:right-24 md:my-1 ">
            {!isAuthenticated? <>
                <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-black hover:cursor-pointer py-2'>  <Link to={"/signup"}>Signup</Link></h1>
                <h1 className='w-full hover:bw-full hover:bg-gray-100 p-1.5 px-5 text-gray-800 hover:cursor-pointer py-2' ><Link to={"/signin"}>Signin</Link></h1>
                </>:
                <><h1 className='w-full hover:bw-full hover:bg-gray-100 p-1.5 px-5 text-gray-800 hover:cursor-pointer py-2' ><button onClick={Logout}>Logout</button></h1>
                <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-gray-800 hover:cursor-pointer py-2'>{isAuthenticated? <Link to={"/add"}>Airbnb Your Home</Link>: ""}</h1>
                </>
          }
            
            <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-gray-800 hover:cursor-pointer py-2'><Link>Host</Link></h1>
            <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-gray-800 hover:cursor-pointer py-2'><Link>Help Centre</Link></h1>
        
        </div>
        </>: ""}
       {userMneu? <>
        <div className="absolute w-64 py-4 mx-auto my-1 bg-white shadow-xl hamberg rounded-xl right-5 md:absolute sm:right-24 md:my-1 ">
                <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-black  py-2'>Username: {username}</h1>
                <h1 className='w-full hover:bw-full hover:bg-gray-100 p-1.5 px-5 text-gray-800  py-2' >Email: {userEmail}</h1>    
        </div>
        </>:""}
    </div>
  )
}
