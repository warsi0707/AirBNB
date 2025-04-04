import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { BackendUrl } from "../helper";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const backendUrl = BackendUrl;


    const verifyLogin =  async() => {
      const response = await fetch(`${backendUrl}/user/auth`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.authenticated === true) {
        setIsAuthenticated(true);
        setUserEmail(result.email);
        setUsername(result.username);
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
        setUsername("");
      }
    }
   
    useEffect(() => {
      verifyLogin();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username,userEmail }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
