
export default function ListingHeartBtn(itemId) {
    const saved = localStorage.getItem('saved')
    const parseSaved = JSON.parse(saved)
    console.log(parseSaved)
  return (
    <div>
        {parseSaved.find((item)=> item._id == itemId ? <button  className="text-2xl text-white b"><i class="fa-solid fa-heart"></i></button>:
       <button  className="text-2xl text-white b"><i className=" fa-regular fa-heart"></i></button>
       )}
    </div>
  )
}
