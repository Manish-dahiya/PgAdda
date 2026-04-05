import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer({theme}) {
  return (
    <div className=''>
      <div className='text-center mb-8 pt-10'>
        <h1 className='text-2xl font-bold'>PgAdda</h1>
        <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Find the best PGs with ease
        </p>
      </div>

      {/* Main Footer Links */}
      <div className='px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm'>
        
        {/* Home */}
        <div>
          <h1 className={`mb-3 font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
            Home
          </h1>
          <div className='flex flex-col gap-2'>
            <p>Hero Section</p>
            <p>Featured Properties</p>
            <p>FAQs</p>
          </div>
        </div>

        {/* About */}
        <div>
          <h1 className={`mb-3 font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
            About
          </h1>
          <div className='flex flex-col gap-2'>
            <p>Our Story</p>
            <p>Contact</p>
          </div>
        </div>

        {/* Properties */}
        <div>
          <h1 className={`mb-3 font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
            Properties
          </h1>
          <div className='flex flex-col gap-2'>
            <p>Browse PGs</p>
            <p>Top Rated</p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h1 className={`mb-3 font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
            Services
          </h1>
          <div className='flex flex-col gap-2'>
            <p>PG Listings</p>
            <p>PG Ratings</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`my-8 mx-6 md:mx-10 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}></div>

      {/* Bottom Footer */}
      <div
        className={`px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          theme === "dark" ? "bg-[#14141466]" : "bg-[#ebe7e7]"
        }`}
      >
        {/* Left */}
        <div className='text-center md:text-left'>
          <p>© 2026 PgAdda. All rights reserved.</p>
          <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Terms & Conditions
          </p>
        </div>

        {/* Socials */}
        <div className='flex gap-5 text-lg cursor-pointer'>
          <FontAwesomeIcon icon={faTwitter} className='hover:scale-110 transition' />
          <FontAwesomeIcon icon={faLinkedin} className='hover:scale-110 transition' />
          <FontAwesomeIcon icon={faGithub} className='hover:scale-110 transition' />
        </div>
      </div>
    </div>
  )
}

export default Footer
