import Footer from '@/app/components/Layout/Footer'
import Header from '@/app/components/Layout/Header'
import PharmacyProfile from '@/app/components/Route/Shop/PharmacyProfile/PharmacyProfile'
import UserAuthProtected from '@/app/hooks/userAuthProtected'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Header navbarOnly={false} activeHeading={2}/>
      <UserAuthProtected>
      <div>
          <PharmacyProfile/>    
      </div>
      </UserAuthProtected>
      <Footer/>
    </div>
  )
}

export default page