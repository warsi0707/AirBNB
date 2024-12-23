import {BrowserRouter ,  Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Footer from "./components/Footer";
import AddListing from "./components/AddListing";
import { useRecoilValue } from "recoil";
import { authenticatedAtom } from "./atom/atom";
import Edit from "./components/Edit";
import ErrorPage from "./components/ErrorPage";

function App() {
  const isAuthenticated = useRecoilValue(authenticatedAtom)
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Details/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/listing/:id" element={<Edit/>}/>
        {isAuthenticated? <Route path="/add"  element={<AddListing/>}/>: ""}
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
