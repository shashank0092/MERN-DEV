import React from "react";
import { useState,useEffect } from "react";

export default function Home(){
    const [userData,setUserData] = useState({name: ""})
    const callHome=async ()=>{
        try{
            const res=await fetch('http://localhost:5000/getData',{
                method: 'GET',
                headers: {
                    Accept :"application/json",
                    "Content-Type":"application/json"
                },
                
                credentials:"include"
            })

            const data = await res.json();
            console.log(data);
            setUserData({
                name: data.name,
                
              
            })

            if(!res.status===200){
                console.log("Data Not Avilable")
            }
            
        }
        catch(err){
            console.log("Contact Us Page error");
            
        }
    }

    useEffect(() => {
        callHome();
     },[])  
    return(
        <>
           <div className="home-page d-flex justify-content-center ">
                <div className="home-div mt-5">
                    <p className="text-center  font-weight-bold">Welcome {userData.name?userData.name:"Plese Login"}</p>
                    <h1 className="font-weight-bold">We Are Mern Devloper</h1>
                </div>
           </div>
        </>
    )
}