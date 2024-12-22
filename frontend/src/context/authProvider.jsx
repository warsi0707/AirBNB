

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authenticatedAtom, userAtom, userEmailAtom } from '../atom/atom'
import AuthContext from './AuthContext'



export default function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedAtom)
  const [username, setUsername] = useRecoilState(userAtom)
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom)


  useEffect(()=>{
    const verifyLogin =async()=>{
      const response = await fetch("http://localhost:3000/v1/api/user/auth",{
        method: "GET",
        credentials: "include"
      })
      const result = await response.json()
      if(result.authenticated === true){
        setIsAuthenticated(true)
        setUserEmail(result.user.email)
        setUsername(result.user.username)
      }else{
        setIsAuthenticated(false)
        setUserEmail("")
        setUsername("")
      }
    }
    verifyLogin()
  },[])

  
  return (
    <div>
     <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
     </AuthContext.Provider>
    </div>
  )
}
