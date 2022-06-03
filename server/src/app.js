const express=require('express')
const app=express();
const cors=require('cors')
const user=require('./model')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser');
dotenv.config({path:'./config.env'});
const port=process.env.PORT ||5000;
app.use(express.json())
app.use(cors())



require('./conn')
app.use(cookieParser());
app.use(require('./router'))
app.use(express.Router())


if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
}


app.listen(port,(req,res)=>{
    console.log(`Runnig At ${port}`);
})