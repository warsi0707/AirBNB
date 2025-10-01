import { memo, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { useParams } from "react-router-dom";

function Ratings({rate,handleDeleteRate}) {
  const {id} = useParams()
  const [noOfStars, setNoOfStars] = useState([1,2,3,4,5])
  const {authUser} = useContext(AuthContext)

  return (

    <div className="py-3 space-y-2 border-b">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
        <img src="/user.png" className="rounded-full w-14 h-14" alt="" />
        <div>
          <p className="text-xl">{rate.user.username.split('')[0].toUpperCase() + rate.user.username.slice(1)}</p>
          <p className="text-sm">{rate.user.role}</p>
        </div>
        </div>
        {authUser.username === rate.user.username &&
        <button onClick={()=>handleDeleteRate(rate._id)} className="text-lg"><i className="fa-solid fa-trash"></i></button>
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