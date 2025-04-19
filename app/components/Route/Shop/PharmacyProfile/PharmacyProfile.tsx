"use client"

import { useGetPharmacyDetailsQuery } from "@/redux/features/pharmacy/pharmacyApi"
import { useTogglePharmacyFavoriteMutation } from "@/redux/features/user/userApi"
import { notFound, useParams } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Heart, MapPin, Star, Phone, Clock, Info, Dot, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hours, HoursTodayStatus } from "./Sections/Hours"
import ServiceSection from "./Sections/ServiceSection"
import DeliverySection from "./Sections/DeliverySection"
import ContactSection from "./Sections/ContactSection"
import LocationSection from "./Sections/LocationSection"
import ReviewSection from "./Sections/ReviewSection/ReviewSection"
import MedicinesTab from "./Sections/MedicinesTab/MedicinesTab"
import ImageSlider from "./ImageSlider"

const PharmacyProfile = () => {
  const { pharmacySlug }: any = useParams()
  const { data, isSuccess,isLoading,isError,error } = useGetPharmacyDetailsQuery({ pharmacySlug })
  const [activeTab, setActiveTab] = useState("overview")
  const [togglePharmacyFavorite] = useTogglePharmacyFavoriteMutation()


  const handleToggleFavorite = async () => {
    await togglePharmacyFavorite({ pharmacyId: data?.pharmacy._id, pharmacySlug, type:"getPharmacyDetails" })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isError || !isLoading && !data) {
    notFound(); 
  }
  

  return (
    <div className="md:max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-gray-50 to-white">
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-4">
        <a href="#" className="hover:text-primary transition-colors duration-200">
          Home
        </a>
        <ChevronRight className="h-4 w-4 mx-2" />
        <a href="#" className="hover:text-primary transition-colors duration-200">
          Pharmacies
        </a>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-primary">{data?.pharmacy.shopName}</span>
      </nav>
      {data?.pharmacy.images && data.pharmacy.images.length > 0 && (
        <ImageSlider
          images={data.pharmacy.images}
          shopName={data.pharmacy.shopName}
          averageRating={data.pharmacy.averageRating}
          reviewCount={data.pharmacy.reviewCount}
          isFavorite={data.pharmacy.isFavorite}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white ${data.pharmacy.images.length > 0 ? 'rounded-b-xl' : 'rounded-xl'} shadow-lg p-6 mb-8`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.pharmacy.shopName}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{data?.pharmacy.averageRating}</span>
                <span className="ml-1">({data?.pharmacy.reviewCount} reviews)</span>
              </div>
              <HoursTodayStatus data={data} />
            </div>
          </div>
          <Button
            variant={data?.pharmacy.isFavorite ? "default" : "outline"}
            size="sm"
            onClick={handleToggleFavorite}
            className={`mt-4 md:mt-0 ${data?.pharmacy.isFavorite ? "bg-red-500 text-white hover:bg-red-600" : "text-gray-600"}`}
          >
            <Heart className={`mr-2 h-4 w-4 ${data?.pharmacy.isFavorite ? "fill-current" : ""}`} />
            {data?.pharmacy.isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <span>
              {data?.pharmacy.address
                ? `${data.pharmacy.address.shopBuildingInfo || data.pharmacy.address.areaOrLocality}, ${data.pharmacy.address.city}, ${data.pharmacy.address.state}`
                : "Address not available"}
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-2" />
            <span>{data?.pharmacy.mobileNumber}</span>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white rounded-lg shadow-md p-1">
          <TabsTrigger value="overview" className="flex-1">
            Overview
          </TabsTrigger>
          <TabsTrigger value="medicines" className="flex-1">
            Medicines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Hours hours={data?.pharmacy.hours} />
              {data?.pharmacy.services.length > 0 && <ServiceSection services={data?.pharmacy.services} />}
              {data?.pharmacy.delivery.available && <DeliverySection delivery={data?.pharmacy.delivery} />}
              <div className="max-md:hidden md:block">
              {isSuccess && <ReviewSection pharmacyId={data?.pharmacy._id} />}
              </div>
            </div>
            <div className="space-y-8">
             <ContactSection data={data?.pharmacy} />
              <LocationSection
                latitude={data?.pharmacy?.coordinates?.coordinates[1]}
                longitude={data?.pharmacy?.coordinates?.coordinates[0]}
                address={data?.pharmacy?.address}
              />
            </div>
            <div className="max-md:block md:hidden">
              {isSuccess && <ReviewSection pharmacyId={data?.pharmacy._id} />}
              </div>
          </div>
        </TabsContent>

        <TabsContent value="medicines">
          <MedicinesTab pharmacyId={data?.pharmacy._id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PharmacyProfile

