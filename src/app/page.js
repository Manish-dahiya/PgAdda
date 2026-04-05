"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import home from "../../public/home.png";
import Card from "@/components/Card";
import homeIcon from "../../public/homeIcon.png"
import propertyIcon from "../../public/propertyIcon.png"
import PropertyCard from "@/components/PropertyCard";
import demoProperty from "../../public/demoProperty.png"
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import stars from "../../public/stars.png"
import ReviewCard from "@/components/ReviewCard";
import backgroundPattern from "../../public/backgroundPattern.png"
import Link from "next/link";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"


const properties=[
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    images:[{url:"https://res.cloudinary.com/dsilckk9k/image/upload/v1732169507/properties/vaqndvcm44wmurcjyqkz.jpg"}],
    name:"luxiry palace PGs",
    desc:"this is a nice pg",
    price:'$8744'
  }
]
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
    rating:3,
  
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

// setTheme(datafromstore)

export default function Home() {
  const [theme, setTheme] = useState("dark"); // Default to "dark"
  const datafromstore = useSelector((state) => state.getTheme.theme);
  const [mounted, setMounted] = useState(false); // Track if the component has mounted

  useEffect(() => {
    // Set mounted to true once the component is mounted
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    // If there's a theme in the Redux store or localStorage, set it
    if (datafromstore) {
      setTheme(datafromstore);
    } else if (savedTheme) {
      // Fallback to saved theme in localStorage if no theme in Redux store
      setTheme(savedTheme);
    }
  }, [datafromstore]); 

  return (
    <div
      className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}
    >
      <Navbar theme={theme}/>
      {/* Top div */}
      <div className="flex flex-col  items-center md:items-center md:flex-row md:justify-between md:mt-4 mt-10 h-[100%] w-[100%]">
        <motion.div id="left" className="order-2 md:order-1 md:flex md:flex-col  md:justify-center items-center md:p-14 md:w-[50%] w-[80%]"
        initial={{
          opacity:0,
          x:-25
        }}
        whileInView={{
          opacity:1,
          x:0
        }}
        transition={{
          duration:0.3
        }}
        viewport={{
          once:true
        }}
        >
        
         <motion.div>
            <h1 className="md:text-4xl font-bold"
          >Discover Your Dream </h1>
          <h1 className="md:text-4xl font-bold mt-1">Pg with PgAdda!</h1>

        </motion.div>

          <p className={`my-7 ${theme == "dark" ? " text-gray-500" : "text-gray-800"} text-lg`}>
            Your journey to find the perfect pg begins here. Explore your listings to find the stay that matches your dream.
          </p>
          <Link href={"/properties"} className={`bg-[#7c5cff] hover:scale-105 transition-transform} px-3 py-3 rounded-lg hover:scale-105 transition-transform `}>Browse properties</Link>
          <div className="mt-4 md:mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:justify-items-center">
    <Card text={"Happy customers"} heading={"200+"} img={null} theme={theme} height={"auto"} width={"100%"} />
    <Card text={"Properties for Client"} heading={"10k"} img={null} theme={theme} height={"auto"} width={"100%"} />
    <Card text={"Years of Experience"} heading={"16+"} img={null}  theme={theme} height={"auto"} width={"100%"} />
</div>

        </motion.div>
        <motion.div id="right" className=" md:order-2 order-1 w-full md:w-[50%]"
         initial={{
          opacity:0,
          x:25
        }}
        whileInView={{
          opacity:1,
          x:0
        }}
        transition={{
          duration:0.3
        }}
        >
          <Image src={home} alt="Image" className="h-[300px]   md:h-[600px]" />
        </motion.div>
      </div>
      {/* big cards */}
      <div className={`w-full   border-b-4 ${theme=="dark"?"border-[#14141466]" : "border-[#141414]"}  md:h-auto py-20 flex gap-11 justify-center flex-wrap border-t-4 p-3`}>
      <motion.div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg"
        initial={{
          opacity:0,
          y:75
        }}
        whileInView={{
          opacity:1,
          y:0
        }}
        transition={{
          duration:0.3
        }}
      
      >
        <Card text={"Happy customers"} heading={null} img={homeIcon} theme={theme} height={"auto"} width={"100%"} />
        <Card text={"Find your Dream Pg"} heading={null} img={homeIcon} theme={theme} height={"auto"} width={"100%"} />
        <Card text={"Effortlessly property Management"} heading={null} img={propertyIcon} theme={theme} height={"auto"} width={"100%"} />
        <Card text={"Regular Notifications"} heading={null} img={propertyIcon} theme={theme} height={"auto"} width={"100%"} />
    </motion.div>
      </div>

      {/* featured properties */}
      <div className="py-4 px-5 md:px-20 mt-20">
        <Image  src={stars} alt="featured stars" className={` ${theme=="dark" ? " md:opacity-50 " : "opacity-5"} ` } />
        <motion.h1 className="font-bold text-3xl my-2 md:m-2"
         initial={{
          opacity:0,
          x:-45
        }}
        whileInView={{
          opacity:1,
          x:0
        }}
        transition={{
          duration:0.3
        }}
        viewport={{
          once:true
        }}
        >Featured Properties</motion.h1>
        <div className=" md:flex md:justify-between ">
          <p className={`${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}>Explore our handpicked selection of featured properties.Each listings offeres a glimpse info exceptional PGs available throug PgAdda.Click view details for more Info</p>
          <button className={`${theme=="dark"?"darkTheme":"pbutton"} border  py-2 my-2 px-2 rounded-lg border-slate-500 hover:scale-105 transition-transform`}>view All properties</button>
        </div>
        <div className="flex flex-wrap gap-6 my-10">
              <Swiper
               effect={'coverflow'}
               grabCursor={true}
               centeredSlides={false}
               slidesPerView={3}
               coverflowEffect={{
                 rotate: 50,
                 stretch: 0,
                 depth: 100,
                 modifier: 1,
                 slideShadows: true,
                 
               }}
               pagination={true}
               modules={[EffectCoverflow, Pagination]}
               className="mySwiper"
               breakpoints={{
                320: {
                  slidesPerView: 1, // 1 slide per view on small screens
                  centeredSlides: true,
                },
                640: {
                  slidesPerView: 2, // 2 slides per view on small tablets
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3, // 3 slides per view on larger screens
                  centeredSlides: false,
                },
              }}

              >
              {
                properties?.map((item,index)=>(
                  <SwiperSlide key={index} >
                    <PropertyCard item={item} name={item.name} coverImg={item.images[0]} desc={item.desc} price={item.price}/>
                  </SwiperSlide>
                ))
              }
              </Swiper>
          </div>
      </div>

      {/* reviews */}
      <div className=" py-4 px-10 md:px-20 mt-24 border-y-4 border-[#141414]">
      <Image  src={stars} alt="featured stars" className={` ${theme=="dark" ? " md:opacity-50 " : "opacity-5"} ` }  />
            
            <motion.div
            initial={{
              opacity:0,
              x:-45
            }}
            whileInView={{
              opacity:1,
              x:0
            }}
            transition={{
              duration:0.3
            }}
            viewport={{
              once:true
            }}
            >
              <h1 className="font-bold text-3xl m-2">Our our Clients say</h1>
              <p className={`${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}>Read the happy stories of our valued clients.Discover why they choose PgAdda for finding the perfect PGs</p>
            </motion.div>

            <motion.div className="my-20"
            initial={{
              opacity:0,

            }}
            whileInView={{
              opacity:1
            }}
            transition={{
              duration:0.75
            }}
            >
              <Swiper
                   spaceBetween={50}
                   slidesPerView={3}
                   breakpoints={{
                    320: {
                      slidesPerView: 1, // 1 slide per view on small screens
                      centeredSlides: true,
                    },
                    640: {
                      slidesPerView: 2, // 2 slides per view on small tablets
                      centeredSlides: false,
                    },
                    1024: {
                      slidesPerView: 3, // 3 slides per view on larger screens
                      centeredSlides: false,
                    },
                  }}
              >
                {
                  reviews.map((item,index)=>(
                    <SwiperSlide key={index}>
                      <ReviewCard item={item}/>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </motion.div>
      </div>
               
          <div className="px-2 md:px-32 border-b-4 md:py-10 relative  border-[#141414] " style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Image src={backgroundPattern} alt="hii" className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"></Image>
                <div className="text-center" >
                  
                  <motion.h1  className="md:text-3xl my-3"
                  initial={{
                    opacity:1,
                    y:25
                  }}
                  whileInView={{
                    opacity:1,
                    y:0
                  }}
                  transition={{
                    duration:0.3
                  }}
                  >Start Your pg finding journey Today</motion.h1>
                  <p className={`${theme == "dark" ? " text-gray-500" : "text-gray-800"} pb-10`}>Start your PG-finding journey today with PgAdda! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PgAdda, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you’re a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget. Say goodbye to the hassle of endless searches and let PgAdda guide you to the perfect spot. Begin your journey with us today and find your next home with ease and confidence!</p>
                  {/* <div className="m-20 cursor-pointer hover:scale-105"><Link href={"/properties"} className="rounded-lg px-3 py-3 cursor-pointer pbutton  ">Explore properties</Link></div> */}
                </div>
          </div>

        <Footer theme={theme}/>
    </div>
  );
}
