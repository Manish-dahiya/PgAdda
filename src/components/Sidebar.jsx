// "use client"
// import Link from 'next/link'
// import React from 'react'

// function Sidebar({isSidebar,setIsSideBar,theme}) {
//   return (
//     <div className={`h-full w-40 ${theme=="dark"?"bg-[#262626]":"#FFFFFF"} p-2 rounded-s-lg fixed right-0 top-0`}>
//         <div className='flex justify-between'>
//             <h1>PgHub</h1>
//             <button onClick={()=>setIsSideBar(false)}>X</button>
//         </div>
//         <div className='flex flex-col my-10 gap-6  text-center'>
//             <Link href={"/"} className='border-b' >Home</Link>
//             <Link href={"/properties"} className='border-b'>Properties</Link>
//             <Link href={"/about"} className='border-b'>About us</Link>
//         </div>
//     </div>
//   )
// }

// export default Sidebar

"use client";
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun, faUser } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '@/redux/themeSlice';
import { configTheme } from '@/helper/helper';

function Sidebar({ isSidebar, setIsSideBar, theme }) {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.userData.user.data);

  const handleChangeTheme = (newTheme) => {
    dispatch(changeTheme(newTheme));
    configTheme(newTheme);
  };

  return (
    <div
      className={`h-full w-52 ${
        theme == "dark" ? "bg-[#262626] text-white" : "bg-white text-black"
      } p-4 rounded-s-lg fixed right-0 top-0 shadow-lg z-50 transition-all duration-300`}
    >
      {/* Top */}
      <div className='flex justify-between items-center border-b pb-3'>
        <h1 className='font-bold text-lg'>PgHub</h1>
        <button
          onClick={() => setIsSideBar(false)}
          className='text-xl font-bold cursor-pointer'
        >
          X
        </button>
      </div>

      {/* Links */}
      <div className='flex flex-col my-8 gap-6 text-center'>
        <Link href={"/"} className='border-b pb-2' onClick={() => setIsSideBar(false)}>
          Home
        </Link>

        <Link href={"/properties"} className='border-b pb-2' onClick={() => setIsSideBar(false)}>
          Properties
        </Link>

        <Link href={"/about"} className='border-b pb-2' onClick={() => setIsSideBar(false)}>
          About Us
        </Link>
        <Link href={"/about"} className='border-b pb-2' onClick={() => setIsSideBar(false)}>
          About Us
        </Link>
        <Link href={"/contactUs"} className='border-b pb-2' onClick={() => setIsSideBar(false)}>
          Contact US
        </Link>
      </div>

      {/* Bottom actions */}
      <div className='flex flex-col gap-5 mt-10'>
        
        {/* Theme Toggle */}
        <button
          onClick={() => handleChangeTheme(theme === "dark" ? "light" : "dark")}
          className='flex items-center justify-center gap-3 border rounded-md py-2 cursor-pointer hover:scale-[1.02] transition'
        >
          {theme === "dark" ? (
            <>
              <FontAwesomeIcon icon={faSun} className='h-4' />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faMoon} className='h-4' />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Profile / Owner / User */}
        <Link
          href={`${
            userFromStore
              ? userFromStore.role == "owner"
                ? "/owner"
                : "/user/profile"
              : "/login"
          }`}
          onClick={() => setIsSideBar(false)}
          className='flex items-center justify-center gap-3 border rounded-md py-2 cursor-pointer hover:scale-[1.02] transition'
        >
          <FontAwesomeIcon icon={faUser} className='h-4' />
          <span>
            {userFromStore
              ? userFromStore.role == "owner"
                ? "Owner Page"
                : "Profile"
              : "Login"}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
