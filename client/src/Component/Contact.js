import React from 'react'
import {useState,useEffect} from 'react';




export default function Contact() {
    
    const [values,setValues]=useState({
        name:"",
        email:"",
        phoneNumber:"",
        message:"",
    })
    
    const [user,setUser]=useState({
        name:"",
        email:"",
        phoneNumber:"",
    })
    
    let name,value;
    const handleInput=(e)=>{
        console.log("Contact Form Changes Begin")
        name=e.target.name;
        value=e.target.value;
        console.log(name)
        console.log(value)
        setValues({...values,[name]:value})
    }
    const callContactPage=async ()=>{
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
            setUser({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber
              
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
        callContactPage();
     },[])  
    const [btnColor,setColor]=useState('primary');

    const contactForm=async(e)=>{
        e.preventDefault();
        const {name,email,phoneNumber,message}=values;

        const res=await fetch('http://localhost:5000/contactForm',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept": 'application/json',
            },
            credentials:"include",
            body: JSON.stringify({
               
                message:values.message
            })
        })

        const data= await res.json()

        if(!data){
            console.log("Message Not Send")
        }
        else{
            alert("Message Send");
            setValues({message:""})
        }

    }
    return (
        <>
            <div className="d-flex mx-4 my-4">
                <div className="bg-primary container m-4 p-4">
                    <p className="text-dark font-weight-bold">Phone Number</p>
                    <p className="text-light font-weight-bold">7016204503</p>
                </div>
                <div className="bg-success container m-4 p-4">
                    <p className="text-dark font-weight-bold">Email Adress</p>
                    <p className="text-light font-weight-bold">shashank0865@gmail.com</p>
                </div>
                <div className="bg-danger container m-4 p-4">
                    <p className="text-dark font-weight-bold">Ofiice Adress</p>
                    <p className="text-light font-weight-bold">Ahemdabad</p>
                </div>
            </div>

            <div className="d-flex flex-column">
                <div className="mx-auto ">
                    <h4 className="font-weight-bold">Get In Touch</h4>
                </div>

                <form className="d-flex-column mx-auto" method="post">
                    <div className="d-flex  justify-content-between mx-auto">
                        <label className="m-4 ">
                            Name: <input type="text" placeholder="Enter Your Name Here" required value={user.name?(user.name):values.name} onChange={handleInput} name="name"/>
                        </label>
                        <label className="m-4">
                            Phone Number: <input type="text" placeholder="Enter Your Phone Number Here" required value={user.phoneNumber?(user.phoneNumber):values.phoneNumber} name="phoneNumber"  onChange={handleInput}/>
                        </label>
                        <label className="m-4">
                            Gmail ID: <input type="text" placeholder="Enter Your Gmail ID Here" required value={user.email?(user.email):values.email} name="email"  onChange={handleInput}/>
                        </label>
                    </div>
                    <div class="form-group m-4">
                        <label for="exampleFormControlTextarea1">Message</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" value={values.message} onChange={handleInput} name="message"></textarea>
                    </div>
                   <div className="d-flex mx-3" onMouseEnter={()=>{
                       setColor('success')
                   }}
                   onMouseLeave={()=>{
                       setColor('primary')
                   }}
                   >
                   <button type="button" className={`btn btn-${btnColor} btn-lg btn-block w-100 shukla`} onClick={contactForm} >Submit</button>
                   </div>
                </form>
            </div>
        </>
    )
}