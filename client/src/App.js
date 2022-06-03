import React from 'react';
import Navbar from './Component/Navbar'
import {Route,Routes} from 'react-router-dom'
import About from './Component/About';
import Home from './Component/Home';
import Register from './Component/Register';
import Login from './Component/Login';
import Contact from './Component/Contact';
import Error from './Component/Error';
import Logout from './Component/Logout'

export default function App(){
  return(
    <>
        <Navbar/>
       
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
    </>
  )
}