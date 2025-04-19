import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import {HomeOutlined, VaccinesOutlined, CategoryOutlined, StoreOutlined, AccountCircleOutlined} from '@mui/icons-material';
import avatar from '../../public/assets/avatar.png'


import Link from 'next/link';
import React,{FC} from 'react'
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const navItemsData =[
  {
    name: "Home",
    url: '/',
    icon:<HomeOutlined />,
},
{
  name: "Medicines",
  url: "/medicines",
  icon:<VaccinesOutlined />,
},
{
    name: 'Categories',
    url: '/categories',
    icon:<CategoryOutlined />,
},
{
    name: 'Shops',
    url: '/shops',
    icon:<StoreOutlined/>,
},
]

interface Props{
  activeItem: number;
  isMobile: boolean;
  setOpen: (open:boolean) => void;
}

const NavItems: FC<Props> = ({activeItem,isMobile,setOpen}) => {
  const {user} = useSelector((state:any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined,{});
  const{data} = useSession();


  return (
    <>
        <div className='max-md:hidden flex'>
           {
            navItemsData && navItemsData.map((i,index)=> (
                <Link href={i.url} key={index} passHref>
                   <span className={`${activeItem === index ? 'text-[#37a39a]' : 'dark:text-white text-black'} hover:text-[#37a39a] text-[20px] px-6 font-Poppins font-[500]`}>
                    {i.name}
                   </span>
                </Link>
            ))
           }
        </div>
        { 
        isMobile && (
 
 <div className='md:hidden mt-5'>
           <div className='w-full text-center flex flex-col py-6'>
           <Link href={'/'} className='text-2xl font-Poppins font-[500] text-black dark:text-white '>
             <Image width={120} height={80} src='/assets/vitalinc.png' alt='Vitalinc' />
              </Link>
              <br />
        <List>
        {navItemsData && navItemsData.map((i, index) => (
          <ListItem key={index} > 
          <Link href={i.url} className='dark:hover:bg-slate-800 rounded-lg w-full'>
            <ListItemButton className='rounded-lg '>
               <ListItemIcon className='text-black dark:text-white'>
                {i.icon}
              </ListItemIcon>
           
           
              <span className={`${
                activeItem === index
                 ? "text-[#37a39a]" 
                 : "dark:text-white text-black"
                 } block py-3 text-[18px] font-Poppins font-[400]`} >{i.name}</span>

            </ListItemButton> 
             </Link>
          </ListItem>
        ))}
  {user ? (
   
 <ListItem> 
   <Link href="/profile" className='dark:hover:bg-slate-800 rounded-lg w-full'>
  
     <ListItemButton className='rounded-lg'>
     <ListItemIcon className='text-black dark:text-white'>
     <Image
            src={userData?.user.avatar ? userData.user.avatar.url : avatar}
            alt=""
            width={120}
            height={120}
            className="w-[30px] h-[30px] rounded-full cursor-pointer"
            style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
      />
      </ListItemIcon>  
      <span className={`${
                activeItem === 5
                 ? "text-[#37a39a]" 
                 : "dark:text-white text-black"
                 } block py-3 text-[18px] font-Poppins font-[400]`} >
                  {user.name}
                  </span>  
      </ListItemButton>
    </Link>
   </ListItem> 
     
    
    ) : (
        <ListItem>
          <div onClick={()=>setOpen(true)}  className='dark:hover:bg-slate-800 rounded-lg w-full'>
        <ListItemButton className='rounded-lg'>
        <ListItemIcon className='text-black dark:text-white'>
          {isLoading ? (
      <Skeleton className='dark:bg-white' variant="circular" width={25} height={25} />
    ) : (
       <AccountCircleOutlined/>
     )}

         </ListItemIcon>    
            <span className='py-3 text-[18px] font-Poppins font-[400]' >Login</span>
        </ListItemButton>
        </div>
        </ListItem>
      
      ) }
      </List>
   </div>
   </div>
        )
        }
    </>
  )
}

export default NavItems