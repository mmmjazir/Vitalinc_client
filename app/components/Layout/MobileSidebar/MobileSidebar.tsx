
"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "../Dashboard.module.css"
import avatar from "../../../../public/assets/avatar.png"

import {
  ChevronLeft,
  ChevronRight,
  Cross,
  House,
} from "lucide-react"
import React, { type FC, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileSidebarItems } from "./MobileSidebarItems"
import { CgProfile } from "react-icons/cg"
import { useSelector } from "react-redux"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import CustomModal from "@/app/utils/CustomModal"
import Login from "../../Auth/Login"
import SignUp from "../../Auth/SignUp"
import Verification from "../../Auth/Verification"
import ForgotPassword from "../../Auth/ForgotPassword"
import AcceptOtpReset from "../../Auth/AcceptOtpReset"
import PasswordForReset from "../../Auth/PasswordForReset"
import { IoIosArrowForward } from "react-icons/io"
import { LogoutDialog } from "../../Profile/LogoutDialog"

type Props = {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void
  activeItem?: string
}

const MobileSidebar: FC<Props> = ({ isMobileMenuOpen, setIsMobileMenuOpen,activeItem }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

 const {user} = useSelector((state:any)=> state.auth)
 const { isLoading, refetch } = useLoadUserQuery(undefined, {})
 
 const [authOpen, setAuthOpen] = useState(false)
 const [route, setRoute] = useState("Login")

   const handleAuthClick = (routeName: string) => {
    setRoute(routeName)
    setAuthOpen(true)
    setIsMobileMenuOpen(false)
  }


  return (
    <div
      className={`relative rounded-r-lg z-50 shadow-md bg-navbar h-full flex flex-col`}
    >
      <div className="flex justify-center items-center px-1 py-[0.35rem] border-b border-white/15 mb-3">
        <div className={`transition-all duration-300 ease-in-out w-[7.3rem] `}>
          {/* <Link href="/">
            <img src={"/assets/vitalinc_white.png"} alt="Logo" className="w-full h-auto" />
          </Link> */}
          <div className="relative w-full h-auto aspect-[1.5/1]">
            {" "}
            {/* aspect ratio can be adjusted */}
            <Image
              src="/assets/vitalinc_white.png"
              alt="Vitalinc_Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-white/10">
        {user && !isLoading ? (
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <Image
                src={user.avatar?.url || avatar}
                alt={user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm text-white">{user.name}</p>
              <p className="text-xs text-white/70">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-2">
            <button
              className="w-full py-2 px-4 rounded-md border border-white/20 text-white text-sm font-medium flex items-center justify-center hover:bg-white/10 transition-colors"
              onClick={() => handleAuthClick("Login")}
            >
              <CgProfile className="mr-2 h-4 w-4" />
              Login
            </button>
            <button
              className="w-full py-2 px-4 rounded-md border border-white/20 text-white text-sm font-medium flex items-center justify-center hover:bg-white/10 transition-colors"
              onClick={() => handleAuthClick("Sign-Up")}
            >
              <CgProfile className="mr-2 h-4 w-4" />
              Sign Up
            </button>
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <MobileSidebarItems
          navItems={[
            {
              title: "Home",
              icon: House,
              href: "/",
              variant: "ghost",
            },
            {
              title: "Medicines",
              icon: Cross,
              href: "/medicines",
              variant: "ghost",
            },
            // {
            //   title: "Medicine Inventory",
            //   icon: BriefcaseMedical,
            //   href: "/seller/medicine-inventory",
            //   variant: "ghost",
            // },
          ]}
        />
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 space-y-2 border-t border-white/10">
        {user && user.role === "seller" ? (
          <Link href="/seller/shop">
            <button className="w-full py-2 px-4 rounded-lg bg-myPrimary hover:bg-myPrimary/90 text-white text-sm font-medium flex items-center justify-center">
              Go to Dashboard
              <IoIosArrowForward className="ml-1" />
            </button>
          </Link>
        ) : (
          <Link href="/shop-create">
            <button className="w-full py-2 px-4 rounded-lg bg-myPrimary hover:bg-myPrimary/90 text-white text-sm font-medium flex items-center justify-center">
              Become Seller
              <IoIosArrowForward className="ml-1" />
            </button>
          </Link>
        )}

        {user && (
          <LogoutDialog
            componentUsed={"MobileSidebar"}
            open={logoutDialogOpen}
            onOpenChange={setLogoutDialogOpen}
          />
        )}
      </div>

      {/* Auth Modals */}
      {route === "Login" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={Login}
          refetch={refetch}
        />
      )}

      {route === "Sign-Up" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={SignUp}
          refetch={refetch}
        />
      )}

      {route === "Verification" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={Verification}
        />
      )}

      {route === "Forgot-Password" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={ForgotPassword}
        />
      )}

      {route === "Accept-Password-Otp" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={AcceptOtpReset}
        />
      )}

      {route === "Password-For-Reset" && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          setRoute={setRoute}
          component={PasswordForReset}
        />
      )}
    </div>
  );
}

export default MobileSidebar;



