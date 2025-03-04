import { useRecoilState } from "recoil";
import {
  loadingAtom,
  passwordAtom,
  usernameAtom,
} from "../atom/atom";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";

export default function Signin() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signin = async (e) => {
    e.preventDefault();
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
      console.log(result)
      setLoading(true);
      if (response.ok) {
        toast.success(result.message)
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.validationMessage)
      }
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <div className="h-screen"> 
      <div className="w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl">
        <h1 className="py-5 text-2xl text-center">Signin</h1>
        <div className="border-b-2"></div>
        <div className="p-10">
          <h1 className="pb-5 text-2xl">Welcome to Airbnb</h1>
          <div>
            <form>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 "
                placeholder="Username"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 "
                placeholder="Password"
              />
              <h1 className="py-3">
                Already an account,{" "}
                <a href="" className="underline">
                  Login
                </a>
              </h1>
              <button
                type="submit"
                onClick={Signin}
                className="w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700"
              >
                {loading ? "Signing" : "signin..."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
