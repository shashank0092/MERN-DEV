import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { useNavigate} from 'react-router-dom';
export default function Login(){
    
   

    

    const [user,setUser]=useState({
       email: '',
       password: '' 
    })
    
    const navigate=useNavigate();


    let name,value;
    const handleInput=(e)=>{

        console.log('Changes Bein In Login Form')
         name = e.target.name;
         value = e.target.value;

        setUser({...user,[name]:value})

        
    }
    
   
    const LoginUser = async(e)=>{
        e.preventDefault();

        const res=await fetch('http://localhost:5000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                email:user.email,
                password:user.password
            })

        })

        const data=await res;
        console.log(data)
        console.log("shukla Boi Login page")

        if(res.status===404||!data){
            window.alert("Invalid Crredaitlies")
        }
        else{
            window.alert("Sucessfully Login")
            navigate('/')
        }   

    }

    return(
        <>
           <header className="my-4">
               <h3 className="text-center font-weight-bold">Login Form</h3>
           </header>

           <form className="container">
               <div>
                   
                   <label >
                       Email: <input type="email" name="email" placeholder="Enter Your Email Here" required
                       value={user.email}
                       onChange={handleInput}/>
                   </label>
               </div>
               <div className="my-4">
                   <label >
                       Password: <input type="password" name="password" placeholder="Enter Your Password Here" required
                       value={user.password}
                       onChange={handleInput}/>
                   </label>
               </div>
               <div>
                   <input type="submit" value="Login" className="btn btn-primary" onClick={LoginUser}/>
               </div>
               <div className="my-4">
                    <Link to="/register">Don't Have Account</Link>                   
               </div>
           </form>
        </>
    )
}