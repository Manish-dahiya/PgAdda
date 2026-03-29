"use client"
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import defaultUser from "../../../public/defaultUser.png"
import demoProperty from "../../../public/demoProperty.png"
import PropertyCard from '@/components/PropertyCard'
// import LeafletMap from '@/components/LeafletMap'
import AddPropertyForm from '@/components/AddPropertyForm'
import Footer from '@/components/Footer'
import backgroundPattern from "../../../public/backgroundPattern.png"
import Link from 'next/link'
import { decodeToken } from '@/helper/helper'
import { getOwnersProperties } from '@/redux/propertySlice'
import {motion} from "framer-motion"

import { logoutUser } from "../../redux/userSlice";
import { useRouter } from "next/navigation";

import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
})


const properties=[
    {
      id:1,
      image:[demoProperty],
      name:"luxiry palace pg's",
      desc:"this is a nice pg",
      price:'$8744'
    },
    {
      id:1,
      image:[demoProperty],
      name:"luxiry palace pg's",
      desc:"this is a nice pg",
      price:'$8744'
    },
    {
      id:1,
      image:[demoProperty],
      name:"luxiry palace pg's",
      desc:"this is a nice pg",
      price:'$8744'
    },
    {
      id:1,
      image:[demoProperty],
      name:"luxiry palace pg's",
      desc:"this is a nice pg",
      price:'$8744'
    },
  
  ]

  
  const clients=[
    {
      id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"pending"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"success"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"success"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"pending"
    }
  ]




function Page() {
    const theme= useSelector((state)=>state.getTheme.theme)
    const [active,setActive]=useState(2) //default properties set
    const userFromStore= useSelector((state)=>state.userData.user.data)
    const [localUser,setLocalUser]=useState({username:null,email:null,contact:null,role:null})
    const [selectedLocation, setSelectedLocation] = useState(null);
    const ownerProp= useSelector((state)=>state.propertyData.ownerProperties)
    
    const dispatch= useDispatch()
    const router = useRouter();


    const [markers, setMarkers] = useState([
      { latitude:30.7848005, longitude:76.923568}, // Example marker 1
      { latitude: 51.515, longitude: -0.1 },  // Example marker 2
    ]);
  
    // Handle the location selection and simulate storing it in the state
    const handleLocationSelected = (location) => {
      setSelectedLocation(location);
      console.log('Location Selected:', location);
  
      // Example: You can send this data to a backend API to store the location
      // fetch('/api/save-location', {
      //   method: 'POST',
      //   body: JSON.stringify(location),
      //   headers: { 'Content-Type': 'application/json' },
      // });
    };

    useEffect(()=>{
       if(userFromStore){
        
        setLocalUser(userFromStore)
       
        console.log(userFromStore)
       }
    },[userFromStore])

    useEffect(()=>{
      
      // console.log("onwer id from useeffect",userFromStore._id)
        dispatch(getOwnersProperties(userFromStore._id))
    },[])
    useEffect(()=>{
      console.log(ownerProp?.data)
    },[ownerProp])
   
    
    const handleLogout = () => {
          console.log("Logout clicked");

    dispatch(logoutUser());
    router.push("/login");
    };


  return (
    <div  className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"}   overflow-x-hidden`}>
      <Navbar theme={theme} />

        {/* owner profile section*/}
        <div className=' md:h-[40vh] flex z-2 justify-center items-center relative ' style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Image src={backgroundPattern} alt="hii" className="opacity-20 z-1 pointer-events-none absolute top-0 left-0 w-full h-full object-cover"></Image>

            <div className='text-center'>
                <Image src={defaultUser} alt="default user" className='rounded-full ' height={150} />
                <h1 className='md:text-2xl'>{localUser.username?localUser.username:"user"}</h1>
                <div className=' py-1 px-3 rounded-lg'>
                    <button className=' hover:text-blue-400 cursor-pointer '>Edit</button> &nbsp; &nbsp; 
                    <button className='hover:text-blue-400 cursor-pointer text-red-400' onClick={handleLogout} >Logout</button>
                </div>

            </div>
        </div>

        {/* navigation section between owner properties and client */}
        <div className='h-10 border-b border-[#14141466] flex justify-center md:gap-10 mb-7'>
                <div className='flex flex-col w-20  pt-3  items-center'>
                    <div className={` cursor-pointer `} onClick={()=>setActive(1)}>Properties</div>
                   {active==1 &&  <div className=' border-b-4 border-blue-400 w-28  rounded-lg'></div>}

                </div>
                <div className='flex flex-col w-20 pt-3  items-center'>
                <div className={`cursor-pointer`} onClick={()=>setActive(2)}>Clients</div>

                {active==2 && <div className=' border-b-4 border-blue-400 w-28  rounded-lg'></div>}
                </div>
        </div>

        {/*properties of owner */ }
        {
            active==1 ?
            <div className='md:my-10 flex justify-center items-center '>
            <motion.div className='w-[80vw] grid md:grid-cols-3 md:gap-1 gap-7 grid-rows-auto  '
             initial={{
              opacity:0,
             }}
             whileInView={{
              opacity:1
             }}
             transition={{
              duration:0.5
             }}
            >
            {
                 ownerProp?.data?.map((item,index)=>(
                  //name={item.propertyName} coverImg={item.images[0].url} desc={item.propertyDesc} type={item.propertyType} bedrooms={item.bedrooms} furnishedType={item.furnishedType} bathrooms={item.bathrooms} price={item.propertyRent}
                     <PropertyCard key={index} item={item}/>
                 ))
             }
            </motion.div>
         </div>
        :   //clients div
             <motion.div className='flex md:items-center px-5   md:justify-center  md:px-20 md:mt-10'
             initial={{
              opacity:0,
             }}
             whileInView={{
              opacity:1
             }}
             transition={{
              duration:0.5
             }}
             >
                <table className='w-full text-center '>
                    <thead>
                        <tr className={`h-10 w-full border-b-4 ${theme=="dark"? " border-[#141414]" :"border-[#999696]"}`}>
                        <th>sno.</th>
                        <th>name</th>
                        <th>property</th>
                        <th>price</th>
                        <th>payment status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients?.map((item,index)=>(
                                <tr key={index} className={`h-10 w-full border-b-4 ${theme=="dark"? " border-[#141414]" :"border-[#999696]"} ${theme=="dark"?"text-[#999696]":"black"}`}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.property}</td>
                                    <td>{item.price}</td>
                                    <td className={`${item.status=="pending" ? "text-red-400" : "text-blue-700"}`}>{item.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
             </motion.div>
        }
            <div className={` py-4 px-20 mt-24 border-b-2  ${theme=="dark"? " border-[#141414]" :"border-[#999696]"}`}/>

        {/*add property form */}
        <div className='md:mx-10 text-center '>
            <h1 className='md:text-3xl font-bold  md:my-10'>Add new Property </h1>
            <div className='flex flex-col  md:flex-row md:gap-4 justify-center items-center md:items-start'>
           <div className='md:w-[50%] w-[100%]'>
            
           <LeafletMap onLocationSelected={handleLocationSelected} markers={markers} />
           </div>
            <AddPropertyForm selectedLocation={selectedLocation} />
            </div>
        </div>


        <div className="px-2 md:px-32 border-b-4 md:py-10 relative  border-[#141414] " style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Image src={backgroundPattern} alt="hii" className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"></Image>
                <div className="text-center" >
                  
                  <h1  className="md:text-3xl pt-7">Start Your pg finding journey Today</h1>
                  <p className={` ${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}>Start your PG-finding journey today with PGHub! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PGHub, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you’re a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget. Say goodbye to the hassle of endless searches and let PGHub guide you to the perfect spot. Begin your journey with us today and find your next home with ease and confidence!</p>
                  <div className="m-20" 

                  ><Link href={"/properties"} className="rounded-lg px-3 py-3 pbutton hover:scale-105 cursor-pointer">Explore properties</Link></div>
                </div>
          </div>

        <Footer theme={theme}/>

    </div>
  )
}

export default Page
