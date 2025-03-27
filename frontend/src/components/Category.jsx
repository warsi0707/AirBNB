export default function Category() {
  return (
    <div className='w-[500px] md:w-[900px] mx-auto flex justify-center gap-7 py-5 mb-4'>
      <button className='cursor-not-allowed text-md'><i className="fa-solid fa-house-chimney-crack"></i><h1>Farms</h1></button>
      <button className='text-lg cursor-not-allowed'><i className="fa-solid fa-ticket-simple"></i><h1>Icons</h1></button>
      <button className='text-lg cursor-not-allowed'><i className="fa-solid fa-umbrella-beach"></i><h1>Beachfront</h1></button>
      <button className='cursor-not-allowed text-md'><i className="fa-solid fa-person-shelter"></i><h1>Rooms</h1></button>
      <button className='text-lg cursor-not-allowed'><i className="fa-solid fa-warehouse"></i><h1>Tree House</h1></button>
    </div>
  )
}
