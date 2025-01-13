import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from 'recoil';
import {emaildAtom, errorAtom, loadingAtom, messageAtom, passwordAtom, usernameAtom} from "../atom/atom"
import { BackendUrl } from '../helper';
export default function Signup() {
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [email, setEmail] = useRecoilState(emaildAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [error, setError] = useRecoilState(errorAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const navigate = useNavigate()
  const backendUrl = BackendUrl

  const Signup =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${backendUrl}/v1/api/user/signup`,{
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
        setLoading(false)
        setMessage(result.message)
        
        setTimeout(() => {
          navigate("/signin")
        }, 2000);
      }else{
        setError(result.message)
        setError(result.validationMessage)
        navigate("/signup")
        setTimeout(() => {
          setError("")
        }, 3000);
      }

    }catch(err){
      setError(err)
    }
    
  }
  return (
    <div className='h-screen'>
      {message && <h1 className='text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{message}</h1>}
      
      {error && error.map((item)=> (
          <h1 key={item._id} className='text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{item}</h1>
      )) }
        <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
            <h1 className='text-2xl text-center py-5'>Signup </h1>
            <div className="border-b-2"></div>
            <div className='p-10'>
                <h1 className='pb-5 text-2xl'>Welcome to Airbnb</h1>
                <div>
                    <form onSubmit={Signup}>
                    <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" className='w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 ' placeholder='Username' />
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" className='w-full p-3.5  hover:rounded-lg border-2 ' placeholder='Email' />
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
                    <h1 className='py-3'>Already an account,   <a href="" className='underline'>Login</a></h1>
                  
                    <button type='submit' className='bg-red-600 text-xl text-white w-full p-3 my-2 rounded-xl hover:bg-red-700'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    
    </div>
  )
}
