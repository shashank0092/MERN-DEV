const dotenv=require('dotenv');
const mongoose=require('mongoose');

dotenv.config({path: './config.env'})

const DB=process.env.DATABASE;

const connect=async()=>{
    try{
        await mongoose.connect(DB)
        console.log('Connected TO Data Base')
    }
    catch(err){
        console.log(err)
    }
}

connect();


module.exports = connect;