import { useNavigate   } from "react-router-dom";
import { useRef } from "react";
import UserInput from "../components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../redux/sclice/userSlice";

export default function Signin() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth)
  const loading = useSelector(state=> state.userAuth.loading)
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()
 

  const handleSignin =()=>{
    dispatch(userSignin({username: usernameRef.current.value, password: passwordRef.current.value}))
    navigate("/")
  }
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
              <button onClick={handleSignin} className={`${loading ==true && "cursor-wait"} w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700 cursor-pointer`} >{`${loading ==true? "loading...": "Signin"}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
