"use client"
import Navbar from '@/components/Navbar'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from "next/image";
import { useEffect, useState } from "react";
import home from "../../../public/home.png";
import Card from "@/components/Card";
import stars from "../../../public/stars.png"
import aboutImage from "../../../public/aboutImage.png"
import trustIcon from "../../../public/trustIcon.png"
import clientIcon from "../../../public/clientIcon.png"
import excellenceIcon from "../../../public/excellenceIcon.png"
import { Swiper, SwiperSlide } from "swiper/react";
import backgroundPattern from "../../../public/backgroundPattern.png"
// Import Swiper styles
import 'swiper/css';
import ReviewCard from '@/components/ReviewCard';



const reviews=[
    {
      id:1,
      name:"harivansh",
      text:"Awesome app",
      rating:2
    },
    {
      id:2,
      name:"harivansh",
      text:"Awesome app",
      rating:3
    },
    {
      id:3,
      name:"harivansh",
      text:"Awesome app,just killed it bro ,what you made!!!! awsome oswe bor bro you have made a big change in society",
      rating:5
    },
    {
      id:4,
      name:"harivansh",
      text:"Awesome app",
      rating:3.5
    }
  ]

  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import { Pagination, Navigation } from 'swiper/modules';

import Link from 'next/link';
import Footer from '@/components/Footer';




function Page() {
    const theme= useSelector((state)=>state.getTheme.theme)


  return (
       <div
      className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}
    >
      <Navbar theme={theme}  />
      {/* Top div */}
      <div className="flex flex-col  items-center md:items-center md:flex-row md:justify-between md:mt-4 mt-10 h-[100%] w-[100%]">
        <div id="left" className="order-2 md:order-1 md:flex md:flex-col  md:justify-center items-center md:p-14 w-[50%]">
        <Image src={stars} alt="stars" className={` ${theme=="dark" ? " md:opacity-50 " : "opacity-5"} mx-7  md:mx-20 ` } />
          <h1 className="md:text-4xl font-bold">Our Amazing journey</h1>
         

          <p className={`my-7 text-lg ${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}>
            Your journey to find the perfect pg begins here. Explore your listings to find the stay that matches your dream.
          </p>
          {/* <button className="pbutton px-3 py-3 rounded-lg hover:scale-105 transition-transform ">Browse properties</button> */}
          <div className="mt-4 md:mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:justify-items-center">
    <Card text={"Happy customers"} heading={"200+"} img={null} theme={theme} height={"auto"} width={"100%"} />
    <Card text={"Properties for Client"} heading={"10k"} img={null} theme={theme} height={"auto"} width={"100%"} />
    <Card text={"Years of Experience"} heading={"16+"} img={null}  theme={theme} height={"auto"} width={"100%"} />
</div>

        </div>
        <div id="right" className=" md:order-2 order-1 w-full md:w-[50%]">
          <Image src={aboutImage} alt="Image" className="h-[300px]   md:h-[600px]" />
        </div>
      </div>

      {/*our values */}
      <div className='border-t-4 border-[#121212] my-7'></div>

      <Image src={stars} alt='stars' className={` ${theme=="dark" ? " md:opacity-50 " : "opacity-5"} mx-7  md:mx-20 ` }  />
        <div className='grid md:mb-7 valuesDiv  md:grid-cols-2 md:grid-rows-1  md:gap-10   md:mx-20 '>
            <div className='mx-7'>
                <h1 className='md:text-4xl md:py-2'>Our values</h1>
                <p className={`md:text-xl ${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}  >
                    Our story is one of the continous growth  and evolution.We started as a small team with big dreams. determined to create a real entire platform to help people like you
                </p>
            </div>    
                <div className='grid grid-rows-4 gap-3 mx-7 mb-7 md:gap-2 border border-[#14141466] rounded md:grid-rows-2 md:grid-cols-2 '>
                    <div className='border border-[#575757] rounded-lg md:p-3'>
                        <span>
                            <Image src={trustIcon} alt="trust Icon" />
                            <h1>trust</h1>
                        </span>
                        <p className=''>Trust is the corner stone of every successfull organisation</p>
                    </div>

                    <div className='border border-[#575757] rounded-lg md:p-3'>
                        <span>
                            <Image src={excellenceIcon} alt="excellenceIcon"  />
                            <h1>Excellence</h1>
                        </span>
                        <p>We set the bar high for overselves.From the properties we list to the service we provide</p>
                    </div>

                    <div className='border border-[#575757] rounded-lg md:p-3'>
                        <span>
                            <Image src={clientIcon} alt="clientIcon" />
                            <h1>Client-Centric</h1>
                        </span>
                        <p>Your dreams and needs are the center of our universe.we listen and understand </p>
                    </div>
                    <div className='border border-[#575757] rounded-lg md:p-3'>
                        <span>
                            <Image src={trustIcon} alt="trustIcon" />
                            <h1>commitment</h1>
                        </span>
                        <p>We are dedicated to providing you with the highest level of sevice ,professionalism and support</p>
                    </div>
                </div>
        </div>

      {/*revies */}
      <div className='border-t-4 border-[#121212] md:my-7 my-7 '></div>
      <Image  src={stars} alt="featured stars" className={` ${theme=="dark" ? " md:opacity-50 " : "opacity-5"} mx-7  md:mx-20 ` }  />
        <div className=" py-1 md:px-20  md:grid  grid-cols-1 md:grid-cols-2 md:items-center mx-7">
                
            <div>
              <h1 className="font-bold text-3xl m-2">Our our Clients say</h1>
              <p className="">Read the happy stories of our valued clients.Discover why they choose PgAdda for finding the perfect Pgs</p>
            </div>

            <div className="my-20 ">
              <Swiper
                      pagination={{
                        type: 'fraction',
                      }}
                    //   navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"  
              >
                {
                  reviews.map((item,index)=>(
                    <SwiperSlide key={index}>
                      <ReviewCard item={item}/>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
      </div>


      <div className='border-t-4 border-[#121212] my-7'></div>

      <div className="px-2 md:px-32 border-b-4 md:py-10 relative  border-[#141414] " style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Image src={backgroundPattern} alt="hii" className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"></Image>
                <div className="text-center" >
                  
                  <h1  className="md:text-3xl my-3">Start Your pg finding journey Today</h1>
                  <p className={` ${theme == "dark" ? " text-gray-500" : "text-gray-800"} pb-10`}>Start your PG-finding journey today with PgAdda! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PgAdda, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you are a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget. Say goodbye to the hassle of endless searches and let PgAdda guide you to the perfect spot. Begin your journey with us today and find your next home with ease and confidence!</p>
                  {/* <div className="m-20"><Link href={"/properties"} className="rounded-lg px-3 py-3 pbutton ">Explore properties</Link></div> */}
                </div>
          </div>

        <Footer theme={theme}/>
    </div>
  )
}

export default Page
 