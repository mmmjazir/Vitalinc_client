import React, { FC } from 'react'
import { navItems } from '../../static/data'
import { styles } from '@/app/styles/styles';
import Link from 'next/link';

type Props ={
    active?:number;
    handleUserLoginCheck: any;
}

const Navbar:FC<Props> = ({active,handleUserLoginCheck}) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div key={index} className="flex">
                    <Link 
                    onClick={
                      (e:any)=>{
                        if(i.url === '/medicines'){
                        const encodedRedirect = encodeURIComponent(i.url)
                        handleUserLoginCheck(e,encodedRedirect)
                        }
                      
                      }
                    }
                    href={i.url}
                    className={`${active === index + 1 ? "text-myPrimary" : "text-black 800px:text-[#fff]"} hover:text-primary pb-[30px] text-[18px] font-Poppins 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar