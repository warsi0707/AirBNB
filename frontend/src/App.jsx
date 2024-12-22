import {BrowserRouter as HashRouter,  Routes, Route } from "react-router-dom";
import { redirect } from "react-router";
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

function App() {
  const isAuthenticated = useRecoilValue(authenticatedAtom)

  return (
    <>
    <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Details/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/listing/:id" element={<Edit/>}/>
        {isAuthenticated? <Route path="/add"  element={<AddListing/>}/>: ""}
      </Routes>
      <Footer/>
    </HashRouter>
      
    </>
  )
}

export default App
