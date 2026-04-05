"use client"
import Navbar from '@/components/Navbar'
import { getPropertiesByPagination } from '@/redux/propertySlice'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
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
    const params = useParams();
    const { id } = params

    const [mounted, setMounted] = useState(false)

    const init = {
        propertyName: "",
        furnishedType: "",
        bedrooms: "",
        propertyRent: "",
        propertyType: "",
        id: id
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getPropertiesByPagination({ pgNo: 1, filters: init }))
        }
    }, [id])

    useEffect(() => {
        console.log(currentProperty)
    }, [currentProperty])

    if (!mounted) return null

    return (
        <div className={`min-h-screen w-full ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}>
            <Navbar theme={theme} />

            {/* PROPERTY SECTION */}
            <div className='md:px-20 px-5 py-6 mt-20 md:mt-24 border-b-4 border-gray-800'>
                <div className='flex md:flex-row flex-col gap-8 md:gap-10 md:justify-between items-start'>

                    {/* LEFT CONTENT */}
                    <div className='w-full md:w-1/2 md:text-2xl text-base'>
                        <h1 className='md:text-2xl text-xl font-bold'>About Property</h1>
                        <h1 className='md:text-4xl text-2xl font-bold md:mb-4 mb-3 break-words'>
                            {currentProperty && currentProperty[0]?.propertyName}
                        </h1>

                        <p className='md:my-4 my-3 text-gray-400 text-sm md:text-base leading-relaxed'>
                            {currentProperty && currentProperty[0]?.propertyDesc}
                        </p>

                        <p className='md:my-4 my-3 text-sm md:text-base'>
                            Price:
                            <span className='font-bold bg-gray-500 rounded py-2 px-3 inline-block ml-2 text-center'>
                                ${currentProperty && currentProperty[0]?.propertyRent}
                            </span>
                        </p>

                        <p className='md:my-4 my-2 text-sm md:text-base'>
                            Property-Type:
                            <span className='text-gray-300 ml-2'>
                                {currentProperty && currentProperty[0]?.propertyType}
                            </span>
                        </p>

                        <p className='md:my-4 my-2 text-sm md:text-base'>
                            Furnished-Type:
                            <span className='text-gray-300 ml-2'>
                                {currentProperty && currentProperty[0]?.furnishedType}
                            </span>
                        </p>

                        {/* ADVANTAGES */}
                        <div className="advants grid grid-cols-3 gap-3 border border-gray-300 p-3 rounded-lg md:my-4 my-5 text-center text-sm md:text-base">
                            <div>
                                <span className='block font-medium'>Bedrooms</span>
                                <div className='mt-1'>
                                    <FontAwesomeIcon icon={faSquare} />{" "}
                                    {currentProperty && currentProperty[0]?.bedrooms}
                                </div>
                            </div>

                            <div>
                                <span className='block font-medium'>Bathrooms</span>
                                <div className='mt-1'>
                                    <FontAwesomeIcon icon={faShower} />{" "}
                                    {currentProperty && currentProperty[0]?.bathrooms}
                                </div>
                            </div>

                            <div>
                                <span className='block font-medium'>Parking</span>
                                <div className='mt-1'>
                                    {currentProperty && currentProperty[0]?.parking ? (
                                        <FontAwesomeIcon icon={faBiking} />
                                    ) : (
                                        <FontAwesomeIcon icon={faX} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* OWNER */}
                        <h1 className='mt-8 md:mt-10 text-xl md:text-2xl font-bold'>About owner</h1>
                        <p className='text-sm md:text-base my-2'>
                            Owner:
                            <span className='text-gray-300 ml-2'>
                                {currentProperty && currentProperty[0]?.owner?.username}
                            </span>
                        </p>
                        <p className='text-sm md:text-base my-2 break-all'>
                            Email:
                            <span className='text-gray-300 ml-2'>
                                {currentProperty && currentProperty[0]?.owner?.email}
                            </span>
                        </p>
                        <p className='text-sm md:text-base my-2'>
                            Contact:
                            <span className='text-gray-300 ml-2'>
                                {currentProperty && currentProperty[0]?.owner?.contact}
                            </span>
                        </p>
                    </div>

                    {/* IMAGE SWIPER */}
                    <div className='w-full md:w-1/2'>
                        <Swiper
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper w-full h-[260px] sm:h-[320px] md:h-[500px] rounded-xl overflow-hidden"
                        >
                            {
                                currentProperty && currentProperty[0]?.images?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={img.url}
                                            width={800}
                                            height={600}
                                            alt="propertyImg"
                                            className='h-full w-full object-cover'
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* INQUIRY SECTION */}
            <div className='md:px-20 md:my-20 px-5 py-10 flex md:flex-row flex-col gap-10 md:gap-12 md:justify-between items-start'>
                <div className='w-full md:w-1/2'>
                    <h1 className='font-bold md:text-4xl text-2xl leading-snug'>
                        Inquire about the property
                    </h1>

                    <p className={`my-3 md:my-4 ${theme == "dark" ? "text-gray-500" : "text-gray-800"} md:text-xl text-base leading-relaxed`}>
                        Interested in this property? Contact the owner via email. Our owner will get back to you as soon as possible.
                    </p>
                </div>

                <div className='w-full md:w-1/2'>
                    {currentProperty && <SendEmailForm ownerEmail={currentProperty[0]?.owner?.email} />}
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="px-5 md:px-32 border-b-4 md:py-10 py-10 relative border-[#141414] overflow-hidden">
                <Image
                    src={backgroundPattern}
                    alt="backgroundPattern"
                    className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"
                />

                <div className="text-center relative z-10">
                    <h1 className="md:text-3xl text-2xl my-3 font-bold">
                        Start Your PG Finding Journey Today
                    </h1>

                    <p className={`${theme == "dark" ? "text-gray-500" : "text-gray-800"} text-sm md:text-base leading-relaxed pb-10`}>
                        Start your PG-finding journey today with PgAdda! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PgAdda, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you’re a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget.
                    </p>

                    {/* <div className="mt-8 md:mt-10">
                        <Link href={"/properties"} className="rounded-lg px-5 py-3 inline-block pbutton">
                            Explore properties
                        </Link>
                    </div> */}
                </div>
            </div>

            <Footer theme={theme} />
        </div>
    )
}

export default Page