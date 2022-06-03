import React from 'react';
import {Link} from 'react-router-dom'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    
    const navigate=useNavigate();
    const[user,setUser]=useState({
        name:"",
        age:"",
        id:"",
        email:"",
        phoneNumber:"",
        dob:"",
        password:"",
        cpassword:""    
    })
    let name,value
    function handleInput(e){
        console.log("Changes begin In Register Form")
         name=e.target.name; 
         value=e.target.value;
        
        setUser({...user ,[name]:value})
    }


    const PostData=async(e)=>{
        e.preventDefault();
        const res=await fetch('http://localhost:5000/register',{
            method:"POST",
           
            headers:{
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            credentials:"include",
            body:JSON.stringify({
                name:user.name,
                age:user.age,
                id:user.id,
                email:user.email,
                phoneNumber:user.phoneNumber,
                dob:user.dob,
                password:user.password,
                cpassword:user.cpassword
            })
        })
       
        const data= await res;
        console.log(data)
        console.log('My name is shukla boi')
        if(res.status===404 ||!data){
            window.alert("Data Not Saved")
        }
        else{
            window.alert("Data Saved")
            navigate('/login');
        }
    }

    return(
        <>
            <header className="my-4">
                <h3 className="text-center font-weight-bold">Register From</h3>
            </header>

            <form method="POST" className="container my-4">
                <div>
                    <label  className="my-4">
                        Name: <input type="text" name="name" placeholder="Enter Your Name Here" required 
                        value={user.name}
                        onChange={handleInput}/>
                    </label>
                </div>

                <div>
                    <label >
                        Age: <input type="number" name="age" placeholder="Enter Your Age Here" required
                        value={user.age}
                        onChange={handleInput}/>
                    </label>
                </div>

                <div>
                    <label className="my-4">
                        ID: <input type="number" name="id" placeholder="Enter Your ID Here" required
                        value={user.id}
                        onChange={handleInput}/>
                    </label>
                </div>

                <div>
                    <label >
                        Email: <input type="email" name="email" placeholder="Enter Your Email Here" required 
                        value={user.email}
                        onChange={handleInput}/>
                    </label>
                </div>

                <div>
                    <label className="my-4">
                        PhoneNumber: <input type="text" name="phoneNumber" placeholder="Enter Your PhoneNumber Here" required value={user.phoneNumber}
                        onChange={handleInput}/>
                    </label>
                </div>
                <div>
                    <label >
                        DOB: <input type="date" name="dob" required value={user.dob}
                        onChange={handleInput}/>
                    </label>
                </div>
                <div>
                    <label className="my-4">
                        Password: <input type="password" name="password" placeholder="Enter Your Password Here" required
                        value={user.password}
                        onChange={handleInput}/>
                    </label>
                </div>
                <div>
                    <label >
                        Cheack Password: <input type="password" name="cpassword" placeholder="Renter Your Password Here"  required value={user.cpassword}
                        onChange={handleInput}/>
                    </label>
                </div>
                <div className="my-4">
                    <input type="submit" value="Register" className="btn btn-primary" onClick={PostData}/>
                </div>
                <div>
                    <Link to="/login" >Already Registered</Link>
                </div>
            </form>

        </>
    )
}