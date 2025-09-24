import { useNavigate } from "react-router";
import { BackendUrl } from '../helper';
import toast from "react-hot-toast";
import UserInput from "../components/UserInput";
import { memo,  useRef } from "react";
import { useState } from "react";

 function Signup() {
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()
  const backendUrl = BackendUrl
  const [loading, setLoading] = useState(false)

  const Signup =async(e)=>{
    e.preventDefault()
    
    try{
      setLoading(true)
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value
    if(!username || !email || !password){
      toast.error("All input required")
    }
      const response = await fetch(`${backendUrl}/auth/signup`,{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
      })
      const result = await response.json()
      console.log(response)
      console.log(result)
      if(response.ok == true){
        setLoading(false)
        navigate("/signin")
         toast.success(result.message)
      }else{
        setLoading(false)
        toast.error(result.error)
      }
    }catch(err){
      setLoading(false)
      toast.error(err.message)
    }
    
  }
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
                    <button onClick={Signup} className="w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700">{`${loading? "Loading...": "signup"}`} </button>
                </div>
            </div>
        </div>
    
    </div>
  )
}
export default memo(Signup)