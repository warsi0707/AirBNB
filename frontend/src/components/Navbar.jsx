import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { authenticatedAtom, errorAtom, messageAtom, userAtom, userEmailAtom, userMenuAtom } from '../atom/atom'
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from '../helper'

export default function Navbar() {
    const [hamberg, setHamberg] = useState(false)
    const [message, setMessage] = useRecoilState(messageAtom)
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedAtom)
  
    const setError = useSetRecoilState(errorAtom)
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
            const response = await fetch(`${backendUrl}/v1/api/user/logout`,{
                method: "POST",
                credentials: "include"
            })
            const result = await response.json()
            if(response.ok){
                setIsAuthenticated(false)
                setMessage(result.message)
                setTimeout(() => {
                    setMessage("")
                    navigate("/")
                }, 2000);
            }else{
                setError(result.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
            }
        }catch(error){
            setError(error.message)
            setTimeout(() => {
                setError("")
            }, 2000);
        }
    }
  return (
    <div>
        <nav className='w-full p-2 md:p-7 border-b-2 flex justify-between'>
            <div className="logo ml-5  md:ml-10">
                <Link to={"/"} className='flex gap-2'>
                <img src="/logo.png" width={30} height={10} className='h-8' alt="" />
                <h1 className='text-red-500 font-bold text-2xl hidden sm:block'>airbnb</h1>
                </Link>
            
            </div>
            <div className="profiles flex gap-2 sm:gap-5 sm:mr-20">
                {isAuthenticated? <Link to={"/add"} className='mt-4 hidden md:block'>Airbnb your Home</Link>: ""}
                
                {/* <h1><i className="fa-solid fa-globe mt-3 text-lg hidden sm:block"></i></h1> */}
                <h1  className='flex gap-4 p-4 px-4 rounded-full border border-gray-300 shadow-sm transition-all hover:ease-in-out '>
                <button onClick={HandleHamberg}><i className="fa-solid fa-bars "></i></button> 
                {isAuthenticated?  <button onClick={HandleUserMenu}><i className="fa-regular fa-user mt-1"></i></button>: ""}
               
                </h1>
            </div>
        </nav>
        {message && <h1 className='text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{message}</h1>}
        {hamberg? <>
        <div className="hamberg w-64 py-4  bg-white rounded-xl shadow-xl  absolute right-5  mx-auto my-1 md:absolute sm:right-24 md:my-1 ">
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
        <div className="hamberg w-64 py-4  bg-white rounded-xl shadow-xl  absolute right-5  mx-auto my-1 md:absolute sm:right-24 md:my-1 ">
                <h1 className='w-full hover:bg-gray-100 p-1.5 px-5 text-black  py-2'>Username: {username}</h1>
                <h1 className='w-full hover:bw-full hover:bg-gray-100 p-1.5 px-5 text-gray-800  py-2' >Email: {userEmail}</h1>    
        </div>
        </>:""}
    </div>
  )
}
