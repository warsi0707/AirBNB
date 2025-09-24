import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import { useRef } from "react";
import UserInput from "../components/UserInput";
import LoginButton from "../components/LoginButton";
import axios from 'axios'
import { useState } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


export default function Signin() {
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const backendUrl = BackendUrl;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {setIsAuthenticated} = useContext(AuthContext)

  const Signin =useCallback(async (e) => {
    e.preventDefault();
    setLoading(true)
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if(!username || !password){
      toast.error("All input required")
    }
    try {
      const response = await axios.post(`${backendUrl}/auth/signin`,{username, password})
      console.log(response)
      if(response.status ==200){
        setIsAuthenticated(true)
        setLoading(false)
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.token)
        navigate("/")
      }else{
        setLoading(false)
        toast.error(response.data.error)
      }
    } catch (err) {
      setLoading(false)
      toast(err.message);
    }
  },[])
  return (
    <div className="h-screen"> 
      <div className="w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl">
        <h1 className="py-5 text-2xl text-center">Signin</h1>
        <div className="border-b-2"></div>
        <div className="p-10">
          <h1 className="pb-5 text-2xl">Welcome to Airbnb</h1>
          <div>
             <div className="flex flex-col gap-1">
             <UserInput placeholder={"Username"} type={"text"} refs={usernameRef}/>
             <UserInput placeholder={"Password"} type={"password"} refs={passwordRef} />
             </div>
              <h1 className="py-3">
                Already an account,{" "}
                <a href="/signup" className="underline">
                  Signup
                </a>
              </h1>
              <button onClick={Signin} className="w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700">{`${loading? "loading...": "Signin"}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
