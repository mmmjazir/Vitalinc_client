"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MedicinesTab from "./MedicinesTab"
import PharmaciesTab from "./PharmaciesTab"


interface FavoritesContentProps {
  favoritesData: {
    pharmacies: Array<{
      id: number
      name: string
      address: string
      image: string
      rating: number
    }>
    medicines: Array<{
      id: number
      name: string
      brand: string
      image: string
      price: string
    }>
  }
}

export function FavoritesContent({ favoritesData }: FavoritesContentProps) {
  const [activeFavTab, setActiveFavTab] = useState("pharmacy")

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-white z-10 pt-4 pb-3 px-4 border-b">

     
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>

      <Tabs value={activeFavTab} onValueChange={setActiveFavTab}>
        <TabsList className="grid w-[20rem] shadow-md grid-cols-2 rounded-lg bg-gray-100">
          <TabsTrigger 
            value="pharmacy"
            className={`${
              activeFavTab === "pharmacy"
                ? "!bg-white shadow-md rounded-lg text-gray-900"
                : "text-gray-600"
            }`}
          >Pharmacies</TabsTrigger>
          <TabsTrigger 
             value="medicine"
             className={`${
              activeFavTab === "medicine"
                ? "!bg-white shadow-md rounded-lg text-gray-900"
                : "text-gray-600"
            }`}
            >Medicines</TabsTrigger>
        </TabsList>
     </Tabs> 
     
     </div>
        {/* Pharmacies Tab */}
        {/* <TabsContent value="pharmacy" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoritesData.pharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        </TabsContent> */}

        {/* Medicines Tab */}
        {/* <TabsContent value="medicine" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoritesData.medicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </TabsContent> */}
    
    {activeFavTab === "pharmacy" && (
        <div className="mt-6">
          <PharmaciesTab/>
        </div>
       )}

     {activeFavTab === "medicine" && (
        <div className="mt-6">
          <MedicinesTab/>
        </div>
       )}
 
    

     
    </div>
  )
}

