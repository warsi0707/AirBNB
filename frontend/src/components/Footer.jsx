import React from 'react'
import {Link} from "react-router-dom"
export default function Footer() {
  return (
    <div>
      <footer className='w-full  border-t-2 mt-10 py-5'>
        
        {/* <div className="links flex justify-evenly my-5">
            <div className=''>
                <h1 className='text-2xl font-bold'>Supports</h1>
                <div className="links flex flex-col py-5">
                <a href="">Link1</a>
                <a href="">Link1</a>
                <a href="">Link1</a>
                </div>
            </div>
            <div className=''>
                <h1>Supports</h1>
                <div className="links flex flex-col py-5">
                <a href="">Link1</a>
                <a href="">Link1</a>
                <a href="">Link1</a>
                </div>
            </div>
        </div> */}
        {/* <div className="border-2"></div> */}
        <div className="things flex justify-center">
            <div className="links mx-auto text-2xl flex gap-5 pt-5 pb-2">
                <Link to={"https://www.linkedin.com/in/samir-warsi/"}> <i className="fa-brands fa-linkedin"></i></Link>
                <Link to={"https://github.com/warsi0707"}> <i className="fa-brands fa-github"></i></Link>
                <Link to={"https://x.com/Samir_warsi2001"}> <i className="fa-brands fa-x-twitter"></i></Link>
            </div>
        </div>
        <div className=" flex justify-center">
            <h1><i className="fa-regular fa-copyright"></i>2024, Samir Warsi</h1>
        </div>

      </footer>
    </div>
  )
}