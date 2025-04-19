"use client";
import { Suspense } from "react";
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"
import Medicines from "../components/Route/Medicines/Medicines"
import UserAuthProtected from "../hooks/userAuthProtected"
import HeaderSkeleton from "../components/Layout/HeaderSkeleton";

type Props = {}

const page = (props: Props) => {
  return (
    <div>     
      <Suspense fallback={<HeaderSkeleton navbarOnly={false} />}>

        <Header navbarOnly={false} activeHeading={2}/>   
      </Suspense>
        <UserAuthProtected>
        <div className="bg-gray-50 ">
          <Medicines/>
        </div>
      </UserAuthProtected>  
     <Footer/> 

    </div>
  )
}

export default page