import connectToDatabase from "@/lib/dbConnect"
import users from "@/models/user.model"
import { NextResponse } from "next/server"

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const privatekey=process.env.JWT_SECRET// used to encode the cookie data


export async function POST(req){
   
    const {username,password,role}=await req.json()
    await connectToDatabase();
    
        const user=await users.findOne({username:username})
        // console.log(user)
        if(!user){
            return NextResponse.json({response:"user does not exist", success:false},{status:200})
        }
        //comparing the password 
        const checkpassword=await bcrypt.compare(password,user.password)
        if(!checkpassword){
            return NextResponse.json({response:"password is incorrect" ,success:false},{status:200})
        }
        if(role!= user.role){
            return NextResponse.json({response:"Role is incorrect" ,success:false},{status:200})
        }
        const data={
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            contact:user.contact,
            bio:user.bio,
            avatar:user.avatar
        }
        const token=jwt.sign(data,privatekey)
       return NextResponse.json({response:token,success:true},{status:201});
}