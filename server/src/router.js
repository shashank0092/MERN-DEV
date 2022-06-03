const bcrypt = require('bcryptjs');
const express = require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const router = express.Router();
const auth=require('./auth')
const app = express()
const user = require('./model');
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin: true, //included origin as true
    withcredentials: true, //included credentials as true
};

app.use(cors(corsOptions))




router.post('/register', async (req, res) => {

    const { name, age, id, email, phoneNumber, dob, password, cpassword } = req.body;

    if (!name || !age || !id || !email || !phoneNumber || !dob || !password || !cpassword) {
        res.send('Please Fill All Deatails')
    }

    try {

        if (password === cpassword) {
            const validateEmail = await user.findOne({ email: email });
            const validateid = await user.findOne({ id: id });
            const validatephoneNumber = await user.findOne({ phoneNumber: phoneNumber })
            if (validateEmail) {
                res.send('Email Is already avlaible').status(422)
            }
            else if (validateid) {
                res.send('ID ALREADY AVLIABLE').status(422)
            }
            else if (validatephoneNumber) {
                res.send('Phone Number Already Avliable').status(422)
            }

            else {
                const newUser = new user({
                    name: name,
                    age: age,
                    id: id,
                    email: email,
                    phoneNumber: phoneNumber,
                    dob: dob,
                    password: password,
                    cpassword: cpassword
                })
                const token=await newUser.genrateToken();
                res.cookie("RegisterCookie",token,{
                    
                    httpOnly:true,
                    
                });


                const data = await newUser.save()
                console.log('Token Genrated During Registratio->'+token)
                res.send('Data Stored').status(201)
                // localStorage.setItem('RegisterCookies',"token")
                console.log(data)

            }

        }
        else{
            res.send('Re Enter Password').status(422)
        }
    } catch (error) {
        console.log('This is wrong Data')
        res.status(422)
    }

})


router.post('/login',async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
       
        if(!email||!password){
            res.send('Fill All Deatils')
        }else{
            const data=await user.findOne({email: email})

            const isMatch=await bcrypt.compare(password,data.password);
            
            if(isMatch){
                
                const token=await data.genrateToken();
                console.log('Token Genrated During Login->'+token)
                res.cookie('LoginCookies',token,{
                    httpOnly: true,
                    
                })
                res.send(data)
            }
            else{
                res.send("Password Not Matched")
            }
            
        }
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/about',auth,(req,res)=>{
    console.log("Hello About World")
    res.send(req.rootUser)
})

router.get('/getData',auth,(req,res)=>{
    console.log("Hello contact world")
    res.send(req.rootUser)
})

router.post('/contactForm',auth,async(req,res)=>{
    try {
        const {message} = req.body;

        
            const userContact=await user.findOne({_id:req.userID})

            if(userContact){
                const userMessage=userContact.addMessage(message)
                await userContact.save();
                console.log("Message Saved")
            }
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/logout',(req,res)=>{
    console.log('Logout Page');
    res.clearCookie("LoginCookies");
    res.window.reload()
    res.status(200)

})
module.exports = router;