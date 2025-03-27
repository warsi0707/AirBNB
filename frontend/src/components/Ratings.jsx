import { memo } from "react"

function Ratings({rate, comment, user,onclick}) {
  return (
    <div
    className="flex flex-col px-2 my-2 mb-2 bg-white rounded-md justify-left"
  >
    <div className="flex justify-between gap-2 text-lg">
      <div className="flex flex-col gap-1">
        <h1>Rate: {rate}/5</h1>
        <p>Comment: {comment}</p>
      </div>
      <button onClick={onclick}>
        <i className="text-sm fa-solid fa-trash"></i>
      </button>
    </div>
    <div>
      <p className="italic">{user}</p>
    </div>
  </div>
  )
}
export default  memo(Ratings)