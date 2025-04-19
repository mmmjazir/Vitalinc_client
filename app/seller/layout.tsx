// 'use client'
// import React, { useState } from 'react'
// import DashboardSideBar from '../components/Route/Shop/Seller/Layout/DashboardSidebar/DashboardSidebar';
// import DashboardHeader from '../components/Route/Shop/Seller/Layout/DashboardHeader';

// const SellerLayout = ({children}:any) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     return (
//       <div className="flex min-h-[100vh] bg-gray-50">
//         <div className={`${isCollapsed ? 'md:w-[6.5rem] max-md:hidden' : 'md:w-[16.5rem] max-md:hidden'} fixed z-30  transition-all duration-200 ease-in-out`}>
//          <DashboardSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//         </div>
        
//         <div className={`w-full ${isCollapsed ? "md:ml-[6.5rem]" : "md:ml-[16.5rem]"} transition-all duration-300 ease-in-out`}>
//           <div className='mb-[60px] z-20 bg-white sticky top-0'>
//           <DashboardHeader />   
//           </div>
//           <div className={`z-10 max-md:px-[1rem] px-10`}>
//            {children} 
//           </div>
          
//         </div>
//       </div>
//   )
// }

// export default SellerLayout;


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import DashboardSideBar from "../components/Route/Shop/Seller/Layout/DashboardSidebar/DashboardSidebar"
import DashboardHeader from "../components/Route/Shop/Seller/Layout/DashboardHeader"
import socketIO from "socket.io-client"
import { useSelector } from "react-redux"
import SellerProtected from "../hooks/sellerProtected"
import UserAuthProtected from "../hooks/userAuthProtected"

interface SellerLayoutProps {
  children: React.ReactNode;
  params:string
}


const SellerLayout: React.FC<SellerLayoutProps> = ({ children,params }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <UserAuthProtected>
    
    <SellerProtected>

    <div className="flex flex-col bg-gray-50">
      
      <DashboardHeader toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />

      <div className="flex flex-1">
        {!isMobile && (
          <div
            className={`fixed top-0 left-0 h-full z-50 transition-all duration-200 ease-in-out 
              ${isCollapsed ? 'md:w-[7rem]' : 'md:w-[17rem]'} 
            `}
          >
            <DashboardSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
        )}

        {isMobile && (
          <div
            className={`fixed top-0 left-0 h-full w-[70%] max-w-[300px] z-50 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <DashboardSideBar isCollapsed={false} setIsCollapsed={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {isMobile && isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <main
          className={`flex-1 transition-all overflow-x-hidden duration-300 ease-in-out ${
            !isMobile && (isCollapsed ? "ml-[7rem]" : "ml-[17rem]")
          }`}
        >
          <div className="mt-[60px] md:px-7 md:py-2 px-3 min-h-screen">{children}</div>
        </main>
      </div>
    </div>
    
    </SellerProtected>
    </UserAuthProtected>
  )
}

export default SellerLayout

