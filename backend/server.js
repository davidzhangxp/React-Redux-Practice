import express from "express";
import mongoose from "mongoose";
import data from './data.js'
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from 'cors';
import config from "./config.js";
import orderRouter from "./routes/orderRouter.js";


//connect to mongodb
mongoose
.connect(config.MONGODB_URL || "mongodb://localhost/amazona",{
    serverSelectionTimeoutMS: 5000
})
.then(()=>{console.log("connect to mongodb")})
.catch((err)=>{console.log(err.reason)})

const app = express()
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//use router
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use('/api/orders',orderRouter)

app.get("/api/config/paypal",(req,res)=>{
    res.send(config.PAYPAL_CLIENT_ID || 'sb')
})
app.get("/",(req,res)=>{
    res.send("server is ready")
})

//this function will be moved to product router
// app.get("/api/products",(req,res)=>{
//     res.send(data.products)
// })
// app.get("/api/product/:id",(req,res)=>{
//     const product = data.products.find(x=>x._id === req.params.id)
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message:"Product not found"})
//     }
    
// })

//catch error
app.use((err,req,res,next)=>{
    const status = err.name && err.name === "validation Error" ? 400 : 500
    res.status(status).send({message:err.message})
})


const port = config.PORT || 5500
const server = app.listen(port,()=>{
    console.log("server is running on port")
})