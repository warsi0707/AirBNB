import {BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Details from "./pages/Details";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Footer from "./components/Footer";
import AddListing from "./pages/AddListing";
import Edit from "./pages/Edit";
import ErrorPage from "./components/ErrorPage";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import SavedListings from "./pages/SavedListings";
import YourBookings from "./pages/YourBookings";


function App() {
  const {isAuthenticated, authUser} = useContext(AuthContext)
 
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Details/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/listing/:id" element={<Edit/>}/>
        <Route path="/add"  element={isAuthenticated && authUser.role === 'ADMIN'? <AddListing/>: <Signin/>}/>
        <Route path="/bookings"  element={isAuthenticated? <YourBookings/>: <Signin/>}/>
        <Route path="/saved-listing" element={<SavedListings/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
