"use client"
import Navbar from '@/components/Navbar'
import { getPropertiesByPagination } from '@/redux/propertySlice'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBiking, faShower, faSquare, faX } from '@fortawesome/free-solid-svg-icons'
import Footer from '@/components/Footer'
import backgroundPattern from "../../../../public/backgroundPattern.png"
import Link from 'next/link'
import SendEmailForm from '@/components/SendEmailForm'

function Page() {

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.getTheme.theme)
    const currentProperty = useSelector((state) => state.propertyData.propertyInfo.data)
    const params = useParams(); // Use the Next.js hook to fetch params
    const { id } = params
    const init = {
        propertyName: "",
        furnishedType: "",
        bedrooms: "",
        propertyRent: "",
        propertyType: "",
        id: id
    }

    useEffect(() => {
        dispatch(getPropertiesByPagination({ pgNo: 1, filters: init }))
    }, [])
    useEffect(() => {
        console.log(currentProperty)
    }, [currentProperty])

    return (
        <div className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}>
            <Navbar theme={theme} />

            <div className='md:px-20 p-7 mt-24 border-b-4 border-gray-800'>

                <div className='flex md:flex-row flex-col  gap-10 md:justify-between' >
                    <div className='w-[50%] md:text-2xl text-xl'>
                        <h1 className='md:text-2xl text-xl font-bold'>About Property</h1>
                        <h1 className='md:text-4xl text-2xl md:mb-4 '>{currentProperty && currentProperty[0].propertyName}</h1>
                        <p className='md:my-4 text-gray-400'>{currentProperty && currentProperty[0].propertyDesc}</p>
                        <p className='md:my-4'>Price:  <span className='font-bold  bg-gray-500 rounded py-2 px-3 w-32 text-center'> ${currentProperty && currentProperty[0].propertyRent} </span></p>
                        <p className='md:my-4'>Property-Type:  <span className='text-gray-300'>{currentProperty && currentProperty[0].propertyType}</span> </p>
                        <p className='md:my-4'>furnished-Type : <span className='text-gray-300'>{currentProperty && currentProperty[0].furnishedType} </span>  </p>
                        <div className="advants grid grid-cols-3 border border-gray-300 p-2 rounded-lg md:my-2">
                            <div className=''>
                                <span>Bedrooms</span>
                                <div><i className="fas fa-th-large"></i><span> <FontAwesomeIcon icon={faSquare} />  {currentProperty && currentProperty[0].bedrooms}</span></div>
                            </div>
                            <div>
                                <span>Bathrooms</span>
                                <div><i className="fas fa-shower"></i><span> <FontAwesomeIcon icon={faShower} /> {currentProperty && currentProperty[0].bathrooms}</span></div>
                            </div>
                            <div>
                                <span>Parking</span>
                                <div>
                                    <i className="fas fa-vector-square"></i
                                    ><span>{currentProperty && currentProperty[0].parking ? <FontAwesomeIcon icon={faBiking} /> : <FontAwesomeIcon icon={faX} />}</span>
                                </div>
                            </div>
                        </div>

                        <h1 className='md: mt-10 text-2xl font-bold'>About owner</h1>
                        <p>Owner: <span className='text-gray-300'> {currentProperty && currentProperty[0].owner.username}</span>  </p>
                        <p>Email: <span className='text-gray-300'>{currentProperty && currentProperty[0].owner.email}</span>  </p>
                        <p>Contact: <span className='text-gray-300'>{currentProperty && currentProperty[0].owner.contact}</span> </p>
                    </div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper h-[70%] w-[50%]"

                    >
                        {
                            currentProperty && currentProperty[0]?.images?.map((img, index) => (
                                <SwiperSlide key={index}  >
                                    <Image src={img.url} width={300} height={300} alt="propertyImg" className='h-full w-full' />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>

            <div className='md:px-20  md:my-20 px-7 flex md:flex-row flex-wrap md:justify-between justify-center'>
                <div className='w-[50%]'>
                    <h1 className='font-bold md:text-4xl text-3xl '>Inquire about the property 
                    </h1>
                    <p className=  {   `{my-4 ${theme == "dark" ? " text-gray-500" : "text-gray-800"} md:text-2xl text-xl md:my-2 my-1`}> Interested in this Property?.Contact the owner via Email.Our owner will get back to you as soon as possible. </p>
                </div>

                <div className='w-[50%]'>
                  { currentProperty && <SendEmailForm ownerEmail={currentProperty[0]?.owner.email} />}
                </div>
            </div>

            {/* review */}
            <div className="px-2 md:px-32 border-b-4 md:py-10 relative  border-[#141414] " style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Image src={backgroundPattern} alt="hii" className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"></Image>
                <div className="text-center" >
                  
                  <h1  className="md:text-3xl my-3">Start Your pg finding journey Today</h1>
                  <p className={` ${theme == "dark" ? " text-gray-500" : "text-gray-800"}`}>Start your PG-finding journey today with PGHub! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PGHub, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you’re a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget. Say goodbye to the hassle of endless searches and let PGHub guide you to the perfect spot. Begin your journey with us today and find your next home with ease and confidence!</p>
                  <div className="m-20"><Link href={"/properties"} className="rounded-lg px-3 py-3 pbutton ">Explore properties</Link></div>
                </div>
          </div>

        <Footer theme={theme}/>

        </div>
    )
}

export default Page
