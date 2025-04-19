import React from 'react'
import ShopCreate from '../components/Route/Shop/ShopCreate/ShopCreate'
import ShopCreateRedirect from '../hooks/shopCreateRedirect'
import UserAuthProtected from '../hooks/userAuthProtected'

type Props = {}

const page = (props: Props) => {
  return (
    <UserAuthProtected>
    <ShopCreateRedirect>
    <div>
        <ShopCreate/>
    </div>      
    </ShopCreateRedirect>
    </UserAuthProtected>
  )
}

export default page