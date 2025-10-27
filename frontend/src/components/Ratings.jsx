import { memo, useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../redux/sclice/listingSlice";

function Ratings({rate}) {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.userAuth)
  const {id} = useParams()
  const [noOfStars, setNoOfStars] = useState([1,2,3,4,5])

  const removeReview =(reviewId)=>{
    dispatch(deleteReview({id:id, reviewId}))
  }

  return (

    <div className="py-3 space-y-2 border-b">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
        <img src="/user.png" className="rounded-full w-14 h-14" alt="" />
        <div>
          {rate?.user?.username &&
          <p className="text-xl">{ rate.user.username.split('')[0].toUpperCase() + rate.user.username.slice(1)}</p>}
          <p className="text-sm">{rate.user.role}</p>
        </div>
        </div>
        {authUser && authUser?.user?.userId === rate?.user._id &&
        <button onClick={()=> removeReview(rate._id)} className="text-lg"><i className="fa-solid fa-trash"></i></button>
        }
      </div>
      <div className="flex gap-2">
        {noOfStars.map((value, index) =>(
        <p key={index}>{index< rate?.rate ? <i className="fa-solid fa-star"></i>: <i className="fa-regular fa-star"></i>}</p>
      ))}
      </div>
      
     
      <p>{rate?.comment}</p>
    </div>
  )
}
export default  memo(Ratings)