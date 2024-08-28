import bcrypt from "bcrypt"
import Admin from "../models/Admin.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const userRegister = async(req,res)=>{
    try{
        const {userName,password,email} = req.body
        const preUser = await User.findOne({
            email
        })
        if(preUser)
        {
        res.status(400).json({message:"User is Already Registered"})
        }
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password,salt)
        const user = new User({
            userName,email,password:passwordHash
        })
        const savedUser = await user.save() 
        res.status(201).json({savedUser,message:"Registration Successful"})

    }
    catch(err)
    {
        res.status(500).json({message:err.message})

    }
}

export const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body
        console.log(email)
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({message:"Email is not Registered"})

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:"Invalid Credential"})

        const token = jwt.sign({id : user._id},process.env.JWT_SECRET)
        delete user.password
     
      
        res.status(200).json({token,user,message:"Login Successful"})
    }
    catch(err)
    {
        res.status(500).json({message:"Something went wrong",error:err.message})

    }

}
export const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email:email})
        if(!admin) return res.status(400).json({message:"Invalid Credential"})

        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch) return res.status(400).json({message:"Invalid Credential"})

        const token = jwt.sign({id : admin._id},process.env.ADMIN_JWT_SECRET)
        delete admin.password
        

        res.status(200).json({token,admin,message:"Login Successful"})
    }
    catch(err)
    {
        res.status(500).json({message:"Something went wrong",error:err.message})

    }

}