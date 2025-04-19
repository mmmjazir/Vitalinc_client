import React, { useEffect, useState } from 'react'
import PharmacyCard from './PharmacyCard'
import { useGetUserPharmacyFavoritesQuery, useTogglePharmacyFavoriteMutation } from '@/redux/features/user/userApi'

type Props = {}

const PharmaciesTab = (props: Props) => {
  const {data:pharmacyData,isLoading,error,refetch} = useGetUserPharmacyFavoritesQuery({})
const [togglePharmacyFavorite,{isSuccess}] = useTogglePharmacyFavoriteMutation();
  

useEffect(() => {
  if (isSuccess) {
    refetch();
  }
}, [isSuccess]);

    
      const toggleFavorite = async(id: string) => {
        await togglePharmacyFavorite(
            {
              pharmacyId:id,
           }
        )
      }


    
      
    
      return (
        <div className="p-6 min-h-screen font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {isLoading ? (
            <div>
              loading...
            </div>
           ) : (
            pharmacyData.pharmacies?.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy._id}
                {...pharmacy}
                onToggleFavorite={() => toggleFavorite(pharmacy._id)}
              />
            ))
           )}
           
          </div>
        </div>
      )
}

export default PharmaciesTab