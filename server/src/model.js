const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
    },
    age: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    cpassword: {
        type: String,
        // required: true,
    },
    messages:[
        {
            name: {type: String},
            email: {type: String},
            phoneNumber: {type: String},
            message: {type: String}

        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

DataSchema.methods.genrateToken=async function(){
    try {
        const token=await jwt.sign({id: this._id},process.env.SECRET_KEY);
        this.tokens=await this.tokens.concat({token: token})
        await this.save();
        return token;
        
    } catch (error) {
        console.log(error);
    }
}



DataSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("Password Before Bycryption->" + this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log('Password After Bycryption->' + this.password);
        this.cpassword = undefined;
        next()
    }
})

DataSchema.methods.addMessage=async function(message){
    try {
        this.messages=this.messages.concat({message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

const model = new mongoose.model('User', DataSchema);

module.exports = model