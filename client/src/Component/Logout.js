import React from 'react'
import { useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Logout(){
    const navigate=useNavigate();
    const LogoutFunction=async()=>{

      try {
       
        const res=await fetch('http://localhost:5000/logout',{
            method: 'GET',
            headers: {
                Accept :"application/json",
                "content-type": "application/json"
            },
            credentials:"include",
            
        })

        navigate('/login');

      } catch (error) {
          console.log(error)
      }
    }



    useEffect(()=>{
        LogoutFunction()
    },[])

    return(
        <h1 className="text-center mt-5">Log Out Page</h1>
    )
}