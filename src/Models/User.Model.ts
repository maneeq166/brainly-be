import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password should be 8 characters long"],
        minlength:8
    },
    email:String
    
},{timestamps:true})

export const User = mongoose.model("user",UserSchema);