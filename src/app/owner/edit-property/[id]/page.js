
"use client"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import backgroundPattern from "../../../../../public/backgroundPattern.png"
import Image from 'next/image'
import { editProperty } from '@/redux/propertySlice'
import { motion } from "framer-motion"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
})

function Page() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.getTheme.theme)

  const [propertyImages, setPropertyImages] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [markers, setMarkers] = useState([])
  const [currentPageProperties,setCurrentPageProperties]=useState([{location:{ latitude: 30.7848005, longitude: 76.923568 },propertyName:"property",propertyDesc:"premium Properties"}])

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyDesc: "",
    propertyRent: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnishedType: "",
    kitchen: false,
    hall: false,
    balcony: false,
    parking: false,
    laundary: false,
    extraRequirements: "",
    owner: "",
    status: "listed",
  })

  

  // Load property from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("editProperty")
    if (stored) {
      const p = JSON.parse(stored)
      

      setFormData({
        _id:p._id || "",
        propertyName: p.propertyName || "",
        propertyDesc: p.propertyDesc || "",
        propertyRent: p.propertyRent || "",
        propertyType: p.propertyType || "",
        bedrooms: p.bedrooms || "",
        bathrooms: p.bathrooms || "",
        furnishedType: p.furnishedType || "",
        kitchen: p.kitchen || false,
        hall: p.hall || false,
        balcony: p.balcony || false,
        parking: p.parking || false,
        laundary: p.laundary || false,
        extraRequirements: p.extraRequirements || "",
        owner: p.owner || "",
        status: p.status || "listed",

      })

      // preload location
      if (p.location?.latitude && p.location?.longitude) {
        const locationObj = {
          latitude: p.location.latitude,
          longitude: p.location.longitude,
        }
        setSelectedLocation(locationObj)
        setMarkers([locationObj])

        currentPageProperties[0]={location:{ latitude: p.location.latitude, longitude: p.location.longitude },propertyName:p.propertyName,propertyDesc:p.propertyDesc,_id:p._id};//<------------------------------
       
      }
    } else {
      toast.error("Property data not found")
      router.push("/owner")
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImages = (e) => {
    setPropertyImages(Array.from(e.target.files))
  }

  const handleLocationSelected = (location) => {
    setSelectedLocation(location)
    setMarkers([location])
    console.log("Updated location:", location)

    currentPageProperties[0]={location:{ latitude: location.latitude, longitude: location.longitude },propertyName:formData.propertyName,propertyDesc:formData.propertyDesc,_id:formData._id};//<------------------------------

  }

  const handleUpdate = () => {
    if (
      !formData.propertyName ||
      !formData.propertyDesc ||
      !formData.propertyRent ||
      !formData.propertyType ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      !formData.furnishedType
    ) {
      toast.error("Please fill all required fields")
      return
    }

    if (!selectedLocation) {
      toast.error("Please select property location")
      return
    }

    const data = new FormData()
    data.append("propertyName", formData.propertyName)
    data.append("propertyDesc", formData.propertyDesc)
    data.append("propertyRent", formData.propertyRent)
    data.append("propertyType", formData.propertyType)
    data.append("bedrooms", formData.bedrooms)
    data.append("bathrooms", formData.bathrooms)
    data.append("furnishedType", formData.furnishedType)
    data.append("kitchen", formData.kitchen)
    data.append("hall", formData.hall)
    data.append("balcony", formData.balcony)
    data.append("parking", formData.parking)
    data.append("laundary", formData.laundary)
    data.append("extraRequirements", formData.extraRequirements)
    data.append("status", formData.status)
    data.append("owner", formData.owner)

    // updated location
    data.append("latitude", selectedLocation.latitude)
    data.append("longitude", selectedLocation.longitude)

    if (propertyImages) {
      propertyImages.forEach((file) => data.append("images", file))
    }

    dispatch(editProperty({ propertyId: id, formData: data }))
      .then((res) => {
        if (res.payload?.success) {
          toast.success("Property updated successfully")
          sessionStorage.removeItem("editProperty")
          router.push("/owner")
        } else {
          toast.error(res.payload?.response || "Update failed")
        }
      })
  }
  useEffect(()=>{console.log(selectedLocation)},[selectedLocation])

  const inputClass = `border bg-transparent w-full border-slate-500 rounded-lg h-10 md:h-16 p-2 md:p-3 md:text-xl outline-none ${theme == "dark"
      ? "text-white placeholder:text-gray-400"
      : "text-black placeholder:text-gray-600"
    }`

  const textareaClass = `border bg-transparent w-full border-slate-500 rounded-lg p-2 md:p-3 md:text-xl outline-none ${theme == "dark"
      ? "text-white placeholder:text-gray-400"
      : "text-black placeholder:text-gray-600"
    }`

  const selectClass = `${theme == "dark"
      ? "text-white bg-[#14141466] border-slate-500"
      : "bg-transparent text-black border-gray-400"
    } md:h-16 h-10 border rounded-lg px-3 outline-none`

  return (
    <div className={`min-h-screen w-full ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}>
      <Navbar theme={theme} />

      {/* HERO / HEADER */}
      <div
        className='relative mt-16 md:mt-20 py-14 md:py-20 border-b border-[#141414]'
        style={{
          backgroundImage: `url(${backgroundPattern.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Image
          src={backgroundPattern}
          alt="backgroundPattern"
          className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className='relative z-10 text-center px-5'>
          <h1 className='text-3xl md:text-5xl font-bold'>Edit Property</h1>
          <p className={`mt-3 ${theme == "dark" ? "text-gray-400" : "text-gray-700"} text-sm md:text-base`}>
            Update your property details, images and location.
          </p>
        </div>
      </div>

      {/* FORM + MAP */}
      <div className='md:px-10 px-5 py-10 md:py-16'>
        <div className='flex flex-col md:flex-row gap-8 md:gap-10 items-start'>

          {/* MAP */}
          <div className='w-full md:w-1/2'>
            <h2 className='text-xl md:text-2xl font-bold mb-4'>Edit Location</h2>
            <div className='rounded-xl overflow-hidden border border-slate-700'>
              <LeafletMap onLocationSelected={handleLocationSelected} markers={markers} properties={currentPageProperties} />
            </div>

            {selectedLocation && (
              <p className={`mt-3 text-sm ${theme == "dark" ? "text-gray-400" : "text-gray-700"}`}>
                Selected Coordinates: {selectedLocation.latitude}, {selectedLocation.longitude}
              </p>
            )}
          </div>

          {/* FORM */}
          <div className='w-full md:w-1/2 pb-10'>
            <div className='flex flex-col gap-4'>

              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Property name"
                className={inputClass}
              />

              <textarea
                name="propertyDesc"
                value={formData.propertyDesc}
                onChange={handleChange}
                rows={8}
                placeholder="Description"
                className={textareaClass}
              />

              <input
                type="text"
                name="propertyRent"
                value={formData.propertyRent}
                onChange={handleChange}
                placeholder="$ Rent"
                className={inputClass}
              />

              <div className="flex flex-wrap gap-3">
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={selectClass}>
                  <option value="" hidden>Property type</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </select>

                <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className={selectClass}>
                  <option value="" hidden>No of bedrooms</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                </select>

                <select name="furnishedType" value={formData.furnishedType} onChange={handleChange} className={selectClass}>
                  <option value="" hidden>Furnished type</option>
                  <option value="fullFurnished">Full furnished</option>
                  <option value="halfFurnished">Half furnished</option>
                  <option value="unFurnished">Unfurnished</option>
                </select>

                <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} className={selectClass}>
                  <option value="" hidden>Number of bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                {["kitchen", "hall", "balcony", "parking", "laundary"].map((field) => (
                  <div key={field} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={field}
                      id={field}
                      checked={formData[field]}
                      onChange={handleChange}
                      className="checkbox-custom"
                    />
                    <label htmlFor={field} className="capitalize">
                      {field === "laundary" ? "Laundry Facilities" : field}
                    </label>
                  </div>
                ))}
              </div>

              <textarea
                name="extraRequirements"
                value={formData.extraRequirements}
                onChange={handleChange}
                rows={4}
                placeholder="Extra requirements"
                className={textareaClass}
              />

              <div className="mt-2">
                <p className="pb-1 text-sm text-slate-400">
                  Leave empty to keep existing images. Upload new ones to replace them.
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleImages}
                  className={`${theme == "dark" ? "text-white bg-[#14141466]" : "bg-transparent text-black"} border border-slate-500 rounded-lg p-2 w-full`}
                />
              </div>

              <motion.button
                onClick={handleUpdate}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg w-fit mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, rotate: "-2deg" }}
              >
                Update Property
              </motion.button>

            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default Page