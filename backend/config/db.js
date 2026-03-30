import mongoose from "mongoose";

 export const connectDB= async () => {
    await mongoose.connect('mongodb+srv://gargisingh9310_db_user:xaNwl1oHrGI95s8T@cluster0.82wheei.mongodb.net/Food-App').then(()=>console.log("connection successfully"));
    
}