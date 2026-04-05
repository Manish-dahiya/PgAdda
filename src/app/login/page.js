"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import aboutImage from "../../../public/aboutImage.png"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '@/redux/userSlice';
import { redirect } from 'next/navigation';
function Page() {
    const [isloggin,setIsLoggin]=useState(false);
    const errorMessage= useSelector((state)=>state.userData.user.error)
    const status= useSelector((state)=>state.userData.user.status)
    
    const dispatch= useDispatch()
    const init={
        username:"",
        email:"",
        password:"",
        contact:"",
        role:""
        
    }
    const [formData,setFormData]=useState(init)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    // useEffect(()=>{
    //     console.log(formData)
    // },[formData,errorMessage,status])

    const handleLoginUser=()=>{
      if(formData.username=="" || formData.password=="" ||formData.role==""){
        toast.error("fill the fields first");
        return;
      }
        dispatch(loginUser(formData))
    }   
    const handleRegisterUser=()=>{
      if(formData.username=="" || formData.password=="" ||formData.role=="" || formData.email=="" || formData.contact==""){
        toast.error("fill the fields first");
        return;
      }
      dispatch(registerUser(formData))
    }
    useEffect(() => {
      if (status === "pending") {
          toast.loading("Processing...");
      } else if (status === "success" ) {
          toast.dismiss();
          toast.success("login successfull");
        redirect("/")
      } else if (status === "failed" ) {
        toast.dismiss();
        toast.error(errorMessage);
    }
      else if (status === "rejected" && errorMessage) {
          toast.dismiss();
          toast.error(errorMessage);
      }
  }, [status, errorMessage]);

    
  return (
      <div className='h-[100vh] w-full flex  justify-between text-white bg-[#141414]'>
        <div className='  rounded-lg  flex flex-col gap-7 justify-center items-center w-full md:w-[50%]'>
       
            {isloggin?<h1 className='text-2xl text-gray-300'>Login to your account</h1>:<h1 className='text-2xl text-gray-300'>Create a New Account</h1>}
            <div>
            <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='username'  className='text-center  text-white bg-[#14141466] px-2 w-64 md:w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg' />
            </div>
            {!isloggin &&<div> <input type="text" value={formData.email} onChange={handleChange}  name='email' placeholder='email' className='text-center   text-white bg-[#14141466] px-2 w-64 md:w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg' /></div>
            }
           <div>
            <form action="">
             <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='password'  className='text-center   text-white bg-[#14141466] px-2 w-64 md:w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  />
             </form>
             </div>

           {!isloggin &&<div> <input type="text" name='contact' value={formData.contact} onChange={handleChange} placeholder='contact:99999'  className='text-center   text-white bg-[#14141466] px-2 w-64 md:w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  /></div>
           }
           <div  className='text-center'> 
            <label htmlFor="role" className=''>Select Role </label><br />
   <span className='flex mt-3 justify-center items-center gap-2'>
   <label htmlFor="user" className='mx-3'>User</label>
<input 
  type="radio" 
  name="role" 
  value="user" // Unique ID for the first radio button
  id="user" // Add unique ID for better label association
  className="w-6 h-6" // Increased size of radio button
  onChange={handleChange}
/>

<label htmlFor="owner" className=''>Owner</label> 
<input 
  type="radio" 
  name="role"  // Same name to group them together
  value="owner" // Unique ID for the second radio button
  id="owner" // Add unique ID for better label association
  className="w-6 h-6 " // Increased size of radio button
  onChange={handleChange}
/>
   </span>



            </div>
           {
            isloggin?<button className='bg-blue-400 py-2 px-4 rounded-lg' onClick={handleLoginUser}>Login</button>
            :<button className='bg-blue-400 py-2 px-4 rounded-lg' onClick={handleRegisterUser}>Sign up</button>
        }
        {
            isloggin?<span className='hover:text-blue-500 ' onClick={()=>setIsLoggin(!isloggin)}>Create A new Account ?</span>: <span className='hover:text-blue-500 ' onClick={()=>setIsLoggin(!isloggin)}>Already have an Account?</span>
        }
        </div>
       
        <div>

        <div id="right" className=" hidden md:block   w-full ">
          <Image src={aboutImage} alt="Image" className="h-[300px]   md:h-[600px]" />
        </div>
        </div>
       
    </div>
  )
}

export default Page
