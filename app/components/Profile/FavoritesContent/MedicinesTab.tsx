import React, { useEffect, useState } from 'react'
import MedicineCard from './MedicineCard'
import { useGetUserMedicineFavoritesQuery, useToggleMedicineFavoriteMutation } from '@/redux/features/user/userApi'

type Props = {}

const MedicinesTab = (props: Props) => {

const {data:medicineData,isLoading,refetch} = useGetUserMedicineFavoritesQuery({})
const [toggleMedicineFavorite,{isSuccess,error}] = useToggleMedicineFavoriteMutation();

    
      const handleToggleFavorite = async(id: string) => {
        await toggleMedicineFavorite({medicineId:id})
      }
    
   useEffect(() => {
     if (isSuccess) {
       refetch();
     }
   }, [isSuccess]);
    
      return (
        <div className="p-6 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
           
          {isLoading ? (
            <div>
              loading...
            </div>
           ) : (
            medicineData.medicines?.map((medicine:any)=>(
               <MedicineCard
                 key={medicine._id}
                 {...medicine}
                 onToggleFavorite={() => handleToggleFavorite(medicine._id)}
               />
            ))
           
           )}
           
           
          </div>
        </div>
      )
}

export default MedicinesTab