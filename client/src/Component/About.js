import React from 'react';
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function About(){

    const [user,setUser]=useState({
        name:"",
        age:"",
        id:"",
        email:"",
        dob:"",
        phoneNumber:""
    })
    const navigate =useNavigate()
    const callAboutPage=async ()=>{
        try{
            const res=await fetch('http://localhost:5000/about',{
                method: 'GET',
                headers: {
                    Accept :"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            const data = await res.json();
            console.log(data);
            setUser({
                name: data.name,
                age: data.age,
                id:data.id,
                email: data.email,
                dob: data.dob,
                phoneNumber: data.phoneNumber,
            })

            if(!res.status===200){
                console.log("Data Not Avilable")
            }
            
        }
        catch(err){
            console.log(err);
            navigate('/login')
        }
    }

     useEffect(() => {
       callAboutPage();
    },[])  
    return(
        <>
            <div className="mt-5 ">
               <header>
                        <h4 className="text-center font-weight-bold">Details About Login Person</h4>
               </header>
               <div className="mt-5 ">
                   <p className="font-weight-bold container">Name:{user.name}</p>
                   <p className="font-weight-bold container">Age:{user.age}</p>
                   <p className="font-weight-bold container">ID:{user.id}</p>
                   <p className="font-weight-bold container">Email:{user.email}</p>
                   <p className="font-weight-bold container">DOB:{user.dob.split("T")[0]}</p>
                   <p className="font-weight-bold container">PhoneNumber:{user.phoneNumber}</p>
                   
               </div>
                
            </div>
        </>
    )
}