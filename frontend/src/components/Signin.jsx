import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { errorAtom, loadingAtom, messageAtom, passwordAtom, usernameAtom } from '../atom/atom'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const [username, setUsername] = useRecoilState(usernameAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const [error, setError] =useRecoilState(errorAtom)
    const [message, setMessage] = useRecoilState(messageAtom)
    const [loading, setLoading] = useRecoilState(loadingAtom)
    const navigate = useNavigate()

    const Signin =async(e)=>{
        e.preventDefault()
        try{
            const response =await fetch("http://localhost:3000/v1/api/user/signin",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })
            const result = await response.json();
            setLoading(true)
            if(response.ok){
                setMessage(result.message)
                setLoading(false)
                setError("")
                setTimeout(() => {
                    navigate("/")
                    setMessage("")
                }, 2000);
            }else{
                setError(result.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
            }
         
        }catch(err){
            setError(err)
        }
    }
  return (
       <div className='h-screen'>
        {message && <h1 className='text-center bg-green-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{message}</h1>}
        {error && <h1 className='text-center bg-red-300 w-52 md:w-80 mx-auto my-2 py-1.5 md:py-2 text-xl rounded-xl text-white'>{error}</h1> }
        <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
            <h1 className='text-2xl text-center py-5'>Signin</h1>
            <div className="border-b-2"></div>
            <div className='p-10'>
                <h1 className='pb-5 text-2xl'>Welcome to Airbnb</h1>
                <div>
                    <form >
                    <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" className='w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 ' placeholder='Username' />
                    <input value={password} onChange={(e)=> setPassword( e.target.value)} type="password" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
                    <h1 className='py-3'>Already an account,   <a href="" className='underline'>Login</a></h1>
                    <button type='submit' onClick={Signin} className='bg-red-600 text-xl text-white w-full p-3 my-2 rounded-xl hover:bg-red-700'>{loading? "Signing": "signin..."}</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
  )
}
