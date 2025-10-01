import { useState } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import  { memo } from 'react'
import AuthContext from '../context/AuthContext'
import toast from 'react-hot-toast'
import { BackendUrl } from '../helper'
import { useNavigate, useParams } from "react-router";


function RatingInputForm({handleReviewForm,handleListing}) {
    const {authUser,isAuthenticated} = useContext(AuthContext)
    const {id} = useParams()
    const [noStar, setNostar] = useState([1,2,3,4,5])
    const [rate, setRate] = useState(3)
    const commentRef = useRef("")
    const navigate = useNavigate()

    const handleRating =async(e)=>{
        e.preventDefault()
        if(isAuthenticated == false){
            toast.error("Login required")
            return;
        }
        const comment = commentRef.current.value;
        try{
            const response = await fetch(`${BackendUrl}/rate/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify({rate, comment})
            })
            const result =await response.json()
            if(response.status ==200){
                handleListing()
                toast.success(result.message)
                handleReviewForm(false)
            }else{
                toast.error(result.error)
            }
        }catch(error){
            toast.error(error)
        }
    }

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen px-5 bg-black/70 backdrop-blur-lg'>
        <div className='bg-white shadow-xl w-full  lg:w-[600px] rounded-xl '>
            <div className='flex justify-between p-5 border-b-2' >
                <h1 className='text-2xl font-semibold'>Rate Listing name adfsad</h1>
                <button onClick={handleReviewForm} className='text-xl'><i className="fa-solid fa-xmark"></i></button>
            </div>
            <p className='px-5 py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ratione quasi, nemo necessitatibus a culpa aperiam quis magni rerum laudantium?</p>
            <div className='px-5 py-3'>
                <p>Feedback to listing</p>
                <div className='flex gap-2 text-2xl'>
                    {noStar.map((stars, indx)=>(
                        <button key={indx} onClick={()=> setRate(stars)} >{rate >= stars? <i className="fa-solid fa-star"></i>: <i className="fa-regular fa-star"></i>}  </button>
                    ))}
                </div>
            </div>
            <div className='w-full px-5 py-3'>
                <p>Review your experience with us</p>
                <textarea ref={commentRef} name="" cols={5} rows={4} className='w-full p-2 bg-gray-100 border outline-none'  id=""></textarea>
            </div>
            <div className='flex justify-end gap-2 px-5 py-3'>
                <button onClick={handleReviewForm} className='px-8 py-2 border-2 rounded-xl'>Cancel</button>
                <button onClick={handleRating} className='px-8 py-2 text-white bg-red-500 rounded-xl'>Post review</button>
            </div>
        </div>
    </div>
  )
}
export default memo(RatingInputForm)