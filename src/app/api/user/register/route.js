import connectToDatabase from "@/lib/dbConnect"
import users from "@/models/user.model"
import { NextResponse } from "next/server"

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const privatekey=process.env.JWT_SECRET// used to encode the cookie data
const joi= require("joi")

export async function POST(req){
    await connectToDatabase()
    const {username,email,password,contact,role}=await req.json()

    //validations
    const userJoiSchema=joi.object({
        username:joi.string().min(3).max(25).alphanum().required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(10).alphanum(),
        contact:joi.string().min(10).max(10)
    })

    const check=userJoiSchema.validate({username,email,password,contact})
    if (check.error) {
        const message = check.error.details[0].message
        console.log(message);
        return NextResponse.json({response:message,success:false},{status:200})
    }


    const userName=await users.findOne({username:username})
    const userEmail=await users.findOne({email:email})
    if(userName){
        return NextResponse.json({response:"username already exists", success:false},{status:200})
    }
    if(userEmail){
        return NextResponse.json({response:"email already exists", success:false},{status:200})
    }
    //to store the password in encrypted format

    const salt=await bcrypt.genSalt(10)
    const hashedpasword=await bcrypt.hash(password,salt)
    // const avatarFilename = req.file ? req.file.filename : "avatar.png"
    const userResult=await users.create({
        username:username,
        email:email,
        password:hashedpasword,
        contact:contact,
        role:role
        // avatar:avatarFilename
    })

    console.log("created user",userResult)
    const data={
        _id:userResult._id,
        username:userResult.username,
        email:userResult.email,
        role:userResult.role,
        contact:userResult.contact,
        bio:userResult.bio,
        avatar:userResult.avatar
    }
    const token=jwt.sign(data,privatekey)
    // res.cookie("token",token) //saving the username to the cookies
    return NextResponse.json({response:token, success:true},{status:201});
}