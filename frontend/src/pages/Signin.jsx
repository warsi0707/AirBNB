import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import { memo, useCallback, useRef } from "react";
import UserInput from "../components/UserInput";
import LoginButton from "../components/LoginButton";

 function Signin() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signin = useCallback(async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch(`${backendUrl}/user/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.validationMessage)
      }
    } catch (err) {
      toast(err.message);
    }
  },[backendUrl,navigate])
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
                <a href="" className="underline">
                  Login
                </a>
              </h1>
              <LoginButton onclick={Signin} type={"Signin"}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Signin)