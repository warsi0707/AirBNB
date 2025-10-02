import {Link} from "react-router-dom"
export default function Footer() {
  const date = new Date
  return (
    <div>
      <footer className='w-full py-5 mt-10 border-t-2'>
        <div className="flex justify-center things">
            <div className="flex gap-5 pt-5 pb-2 mx-auto text-2xl links">
                <Link to={"https://www.linkedin.com/in/samir-warsi/"}> <i className="fa-brands fa-linkedin"></i></Link>
                <Link to={"https://github.com/warsi0707"}> <i className="fa-brands fa-github"></i></Link>
                <Link to={"https://x.com/Samir_warsi2001"}> <i className="fa-brands fa-x-twitter"></i></Link>
            </div>
        </div>
        <div className="flex justify-center ">
            <h1><i className="fa-regular fa-copyright"></i>{date.getFullYear()}, Samir Warsi</h1>
        </div>

      </footer>
    </div>
  )
}
