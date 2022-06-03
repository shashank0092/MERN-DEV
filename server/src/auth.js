const jwt=require("jsonwebtoken");
const user=require('./model');

const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.LoginCookies;

        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await user.findOne({_id:verifyToken.id,"tokens.token":token});
        if(!rootUser){
            console.error("User Not Find")
        }
        else{
            req.token=token;
            req.rootUser=rootUser;
            req.userID=rootUser._id;
            next();
        }
        
    } catch (error) {
        res.send("First Login")
        console.log(error);
    }
}

module.exports =auth;