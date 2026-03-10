const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true, "user name is required"],
        unique : true
    },
    phone:{
        type: String,
        required : [true, "phone number is required"],
        unique : true
    },
    email:{
        type: String,
        required : [true, "email is required"],
        unique : true
    },
    password : {
        type:String,
        required : [true, "password is required"],
    },
    isVerified: { type: Boolean, default: false },
})


const authModel = mongoose.model("user", authSchema);

module.exports = authModel;