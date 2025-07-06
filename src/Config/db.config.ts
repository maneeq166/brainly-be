import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/brainly");
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Error in db:",error);
        
    }

}