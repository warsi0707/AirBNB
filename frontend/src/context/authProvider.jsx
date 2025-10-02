import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { BackendUrl } from "../helper";

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [listingData, setListingData] = useState([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState([]);
  const backendUrl = BackendUrl;

    const verifyLogin =  async() => {
      try{
         const response = await fetch(`${backendUrl}/auth/verify`, {
        method: "GET",
        credentials: "include",
        headers : {
          token: localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (result.authenticated === true) {
        setAuthUser(result)
        setIsAuthenticated(true)
      } else {
        setAuthUser({})
        setIsAuthenticated(false)
      }
      }catch(error){
         setAuthUser({})
         setIsAuthenticated(false)
        console.error(error)
      }
    }
    const GetSavedListing = () => {
    const listing = JSON.parse(localStorage.getItem("saved-listing")) || [];
    setSaved(listing);
  };
   
    useEffect(() => {
      verifyLogin();
      GetSavedListing()
  }, [isAuthenticated]);

  return (
    <div>
      <AuthContext.Provider value={{authUser, setAuthUser,isAuthenticated, setIsAuthenticated,listingData, setListingData,loading, setLoading,saved, setSaved }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
