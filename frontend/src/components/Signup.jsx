import { useNavigate } from "react-router";
import { useRecoilState } from 'recoil';
import {emaildAtom, passwordAtom, usernameAtom} from "../atom/atom"
import { BackendUrl } from '../helper';
import toast from "react-hot-toast";
export default function Signup() {
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [email, setEmail] = useRecoilState(emaildAtom)
  const navigate = useNavigate()
  const backendUrl = BackendUrl

  const Signup =async(e)=>{
    e.preventDefault()
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
        setUsername("")
        setEmail("")
        setPassword("")
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
    
  }
  return (
    <div className='h-screen'>
        <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
            <h1 className='py-5 text-2xl text-center'>Signup </h1>
            <div className="border-b-2"></div>
            <div className='p-10'>
                <h1 className='pb-5 text-2xl'>Welcome to Airbnb</h1>
                <div>
                    <form onSubmit={Signup}>
                    <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" className='w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 ' placeholder='Username' />
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" className='w-full p-3.5  hover:rounded-lg border-2 ' placeholder='Email' />
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
                    <h1 className='py-3'>Already an account,   <a href="" className='underline'>Login</a></h1>
                    <button type='submit' className='w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    
    </div>
  )
}
