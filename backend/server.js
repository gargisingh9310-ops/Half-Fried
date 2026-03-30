import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routers/foodRoute.js"
import userRouter from "./routers/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routers/cartRoute.js"
import orderRouter from "./routers/orderRoute.js"

//app config
const app= express()
const port= 5000


//middlewarw
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter) 
app.use("/api/order", orderRouter)

app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
    
}) 