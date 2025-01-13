import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticatedAtom, userAtom, userEmailAtom } from "../atom/atom";
import AuthContext from "./AuthContext";
import { BackendUrl } from "../helper";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(authenticatedAtom);
  const setUsername = useSetRecoilState(userAtom);
  const setUserEmail = useSetRecoilState(userEmailAtom);
  const backendUrl = BackendUrl;

  useEffect(() => {
    const verifyLogin = async () => {
      const response = await fetch(`${backendUrl}/v1/api/user/auth`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.authenticated === true) {
        setIsAuthenticated(true);
        setUserEmail(result.user.email);
        setUsername(result.user.username);
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
        setUsername("");
      }
    };
    verifyLogin();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
