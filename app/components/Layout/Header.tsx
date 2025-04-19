"use client";
import Link from "next/link";
import { styles } from "../../styles/styles";
import { FC, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Image from "next/image";
import avatar from '../../../public/assets/avatar.png'
import { IconButton } from "@mui/material";
import CustomModal from "@/app/utils/CustomModal";
import Login from "../Auth/Login";
import AcceptOtpReset from "../Auth/AcceptOtpReset";
import PasswordForReset from "../Auth/PasswordForReset";
import ForgotPassword from "../Auth/ForgotPassword";
import Verification from "../Auth/Verification";
import SignUp from "../Auth/SignUp";
import { useLogOutMutation, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SubHeader from "./SubHeader";
import { LoaderCircle, LogOut, Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoutDialog } from "../Profile/LogoutDialog";

type Props = {
  activeHeading?: number;
  navbarOnly: boolean;
};



const Header: FC<Props> = ({ activeHeading, navbarOnly }) => {

  const { user } = useSelector((state: any) => state.auth);
  const { isLoading,isFetching, refetch } = useLoadUserQuery(undefined, {});
  const [modifiedUser, setModifiedUser] = useState<any>()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const [socialAuth, { isSuccess, error,isLoading:isSocialAuthLoading }] = useSocialAuthMutation();
  const { data,status } = useSession();



  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const searchParams:any = useSearchParams()
  const router = useRouter()


  const redirectRoute = searchParams.get("redirect")
  const login = searchParams.get("loginAuthRequired")
  

  useEffect(() => {
    if (!user && !isLoading && !isFetching && login === "true" && status !== "loading" && !isSocialAuthLoading) {
      setRoute("Login");
      setOpen(true);
    }
  }, [login,user,isLoading,status,isSocialAuthLoading,isFetching]);



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

  const handleUserLoginCheck = (e:any,routeLink:string)=>{
    if(!user){
      e.preventDefault()
      if(routeLink !== null || undefined){
        router.push(`/?loginAuthRequired=true&redirect=${routeLink}`)
      }
      setRoute("Login")
      setOpen(true)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (!user && !error) {
        if (data) {
          setOpen(false)
           socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
        }
      }
    }
  }, [data,isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");      

      setOpen(false)
      refetch();
      if(redirectRoute !== null || undefined){
          router.push(`${redirectRoute}`)  
      }

    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(()=>{
    setModifiedUser(user)
   },[user])
   

  return (


    <div className={`${navbarOnly ? "mb-[70px]" : "mb-[136px] max-md:mb-[190px]"}`}>
    <div
      className={`block shadow-sm fixed top-0 z-50 left-0 transition 800px:flex items-center justify-between max-md:w-full md:w-[100vw] bg-navbar h-[70px]`}
    >
      <div className={`${styles.section} relative ${styles.normalFlex} justify-between px-4`}>
        <div className="max-md:flex max-md:h-[70px] max-md:w-full max-md:items-center max-md:justify-between">
          {isMobile && (
            <button className="p-1 text-white" onClick={toggleMobileMenu}>
              <Menu size={20} />
            </button>
          )}
          {isMobile && (
            <div
              className={`fixed top-0 left-0 h-full w-[70%] max-w-[300px] z-50 transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <MobileSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
          )}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
          )}

          <Link href="/">
            <Image className="w-[140px] h-[100px]" src="/assets/vitalinc_white.png" alt="" width={140} height={100} />
          </Link>
        </div>
        {/* navitems */}
        <div className={`${styles.normalFlex} hidden md:flex`}>
          <Navbar active={activeHeading} handleUserLoginCheck={handleUserLoginCheck} />
          <div className={`${styles.normalFlex} ml-[60px]`}>
            <div className="relative cursor-pointer mr-[15px]">
              {isLoading || isFetching ? (
                <div className="flex items-center gap-2 bg-gray-300 px-2 h-10 rounded-xl min-w-[200px]">
                  <Skeleton className="bg-gray-100 rounded-full h-9 w-9" />
                  <Skeleton className="bg-gray-100 h-4 w-32" />
                </div>
              ) : user ? (
                <Link
                  href="/profile"
                  className="flex items-center font-Josefin gap-2 bg-gray-300 px-2 h-10 rounded-xl min-w-[200px]"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar.url || "/placeholder.svg"}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="w-9 h-9 object-cover shadow-lg rounded-full cursor-pointer"
                    />
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center bg-myPrimary font-Arimo text-white font-semibold text-md rounded-full shadow-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-gray-700 text-xs font-medium">{user.name}</span>
                    <span className="text-gray-700 text-xs truncate max-w-[150px]">{user.email}</span>
                  </div>
                </Link>
              ) : (
                <div onClick={() => setOpen(true)} className="min-w-[40px]">
                  <IconButton sx={{ color: "white", ":hover": { color: "#269E83" } }}>
                    <CgProfile size={30} />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:gap-3 md:items-center">
          <div className="font-Outfit w-[180px] shadow-inner text-[16px] py-2 px-3 rounded-lg">
            {isLoading || isFetching ? (
              <Button disabled className="text-white flex items-center justify-center gap-2 w-full">
                <Skeleton className="h-6 w-28 rounded-lg bg-gray-300" />
                <IoIosArrowForward className="ml-1 text-gray-400" />
              </Button>
            ) : (
              <Link
                href={`${user?.role === "seller" ? "/seller/shop" : "/shop-create"}`}
                onClick={(e: any) => {
                  const routeLink = "/shop-create"
                  const encodedRedirect = encodeURIComponent(routeLink)
                  handleUserLoginCheck(e, encodedRedirect)
                }}
              >
                <Button className="text-[#fff] flex items-center w-full">
                  {user?.role === "seller" ? "Dashboard" : "Become Seller"}
                  <IoIosArrowForward className="ml-1" />
                </Button>
              </Link>
            )}
          </div>
          {user && <LogoutDialog componentUsed={"Header"} open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen} />}
        </div>
      </div>
    </div>
    {!navbarOnly && <SubHeader />}

    {route === "Login" && (
      <>
        {open && (
          <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={Login} refetch={refetch} />
        )}
      </>
    )}

    {route === "Sign-Up" && (
      <>
        {open && (
          <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={SignUp} refetch={refetch} />
        )}
      </>
    )}

    {route === "Verification" && (
      <>{open && <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={Verification} />}</>
    )}

    {route === "Forgot-Password" && (
      <>{open && <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={ForgotPassword} />}</>
    )}

    {route === "Accept-Password-Otp" && (
      <>{open && <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={AcceptOtpReset} />}</>
    )}

    {route === "Password-For-Reset" && (
      <>{open && <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} component={PasswordForReset} />}</>
    )}
  </div>
  );
};

export default Header;

