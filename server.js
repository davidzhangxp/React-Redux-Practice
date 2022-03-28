
// const config = require('./config');

// const express = require('express')
// const mongoose = require('mongoose')
// const Data = require('./noteSchema')

// // mongoose
// //     .connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// //     .then(() => {
// //         console.log("connected to mongodb")
// //     })
// //     .catch((error) => {
// //         console.log(error)
// //     })

// mongoose.connect(config.MONGODB_URL)

// mongoose.connection.once("open",()=>{
//     console.log("connect to mongodb")
// }).on("error",(error=>{
//     console.log(error)
// }))
// const app = express()

// app.post("/create",(req,res)=>{

//     var note = new Data({
//         title:req.get("title"),
//         note:req.get("note"),
//         date:req.get("date")
//     })
//     note.save()
//     .then(()=>{
//         if(note.isNew == false){
//             console.log("note is saved")
//             res.send("saved data")
//         }else{
//             console.log("note is not saved")
//         }
//     })
// })

// //fetch data from mongodb
// app.get("/fetch",(req,res)=>{
//     Data.find({}).then((dbitems)=>{
//         res.send(dbitems)
//     })
// })
// //delete one object
// app.post("/delete",(req,res)=>{
//     Data.findOneAndRemove({
//         _id:req.get("id")
//     },(err)=>{
//         console.log("delete failed")
//     })
//     res.send("item delete")
// })
// //update one note
// app.post("/update",(req,res)=>{
//     Data.findOneAndUpdate({
//         _id:req.get("id")
//     },{
//         title:req.get("title"),
//         note:req.get("note"),
//         date:req.get("date")
//     },(err)=>{
//         console.log("failed to update" + err)
//     })
//     res.send("updated complete")
// })

// app.listen(3000, () => {
//     console.log("server at http://localhost:3000")
// })