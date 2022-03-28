import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";
import bcrypt from 'bcrypt'
import { isAuth } from "../utils.js";

const userRouter = express.Router()

userRouter.get('/createAdmin',expressAsyncHandler(async(req,res)=>{

    try {
        const user = new User({
            name:'admin',
            email:'admin@example.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:true
        })
        const createUser = await user.save()
        res.send(createUser)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}))

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            })
        }else{
            res.status(401).send({message:'Password is incorrect'})
        }
    }else{
        res.status(401).send({message:'Invalid Email or Password'})
    }
}))

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    try {
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,8)
        })
        const createUser = await user.save();
        res.send({
            _id:createUser._id,
            name:createUser.name,
            email:createUser.email,
            isAdmin:createUser.isAdmin,
            token:generateToken(createUser)
        })
    } catch (error) {
        res.status(500).send({message:error.message})
    }


}))

userRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req,res)=>{
        const user = await User.findById(req.params.id)
        res.send(user)
    }))

userRouter.put(
    '/update/:id',
    isAuth,
    expressAsyncHandler(async(req,res)=>{
        try {
            const user = await User.findById(req.params.id)
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password){
                user.password = bcrypt.hashSync(req.body.password,8)
            }
            
            const updatedUser = await user.save()
            res.send({
                _id: updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
                token:generateToken(updatedUser)
            })
        } catch (error) {
            res.status(500).send({message:error.message})
        }

    })
)    

export default userRouter;