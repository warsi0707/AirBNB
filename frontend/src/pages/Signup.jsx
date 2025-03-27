import { useNavigate } from "react-router";
import { BackendUrl } from '../helper';
import toast from "react-hot-toast";
import LoginButton from "../components/LoginButton";
import UserInput from "../components/UserInput";
import { memo, useCallback, useRef } from "react";


 function Signup() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const backendUrl = BackendUrl

  const Signup =useCallback(async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value
    try{
      const response = await fetch(`${backendUrl}/user/signup`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, email})
      })
      const result = await response.json()
      if(response.ok){
        toast.loading(true)
        toast.success(result.message)
        
        setTimeout(() => {
          navigate("/signin")
        }, 2000);
      }else{
        toast.error(result.message)
      }
    }catch(err){
      toast.error(err.message)
    }
    
  },[backendUrl, navigate])
  return (
    <div className='h-screen'>
        <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
            <h1 className='py-5 text-2xl text-center'>Signup </h1>
            <div className="border-b-2"></div>
            <div className='p-10'>
                <h1 className='pb-5 text-2xl'>Welcome to Airbnb</h1>
                <div className="flex flex-col gap-1">
                    <UserInput refs={usernameRef} placeholder={"Username"} type={'text'}/>
                    <UserInput refs={emailRef} placeholder={"Email"} type={'email'}/>
                    <UserInput refs={passwordRef} placeholder={"Password"} type={'password'}/>
                    <h1 className='py-3'>Already an account,   <a href="" className='underline'>Login</a></h1>
                    <LoginButton onclick={Signup} type={"Signup"}/>
                </div>
            </div>
        </div>
    
    </div>
  )
}
export default memo(Signup)