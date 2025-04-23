"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { styles } from "@/app/styles/styles";
import { Step, StepLabel, Stepper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo/StepTwo";
import { useCreatePharmacyMutation } from "@/redux/features/pharmacy/pharmacyApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Building2, MapPin, Phone } from "lucide-react";
import StepThree from "./Steps/StepThree";
import Image from "next/image";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const ShopCreate = () => {
  const [createPharmacy, { isLoading, error, isSuccess }] =
    useCreatePharmacyMutation();
  const { refetch } = useLoadUserQuery(undefined, {});


  const [shopDetails, setShopDetails] = useState({
    email: "",
    contactPersonName: {
      title: "mr",
      name: "",
    },
    mobileNumber: "",
    additionalMobileNumbers: [],
    whatsappNumber: "",
    telephoneNumber: {
      areaCode: "",
      number: "",
    },
    shopName: "",
    address: {
      shopBuildingInfo: "",
      floorOrTower: "",
      areaOrLocality: "",
      city: "",
      state: "",
      landmark: "",
    },
    coordinates: {
      lat: 28.6304,
      lng: 77.2177,
    },
    services: [],
    delivery: {
      available: false,
    },
    hours: {
      Monday: { isOpen: false },
      Tuesday: { isOpen: false },
      Wednesday: { isOpen: false },
      Thursday: { isOpen: false },
      Friday: { isOpen: false },
      Saturday: { isOpen: false },
      Sunday: { isOpen: false },
    },
  });
  const [placeName, setPlaceName] = useState({locality: "",city:""});

  useEffect(() => {
    if (isSuccess) {   
      toast.success("Pharmacy account created successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess]);

  const steps = [
    {
      title: "Contact Details",
      icon: Phone,
      description: "Basic information and contact details",
    },
    // { title: "Pharmacy Details", icon: Building2, description: "Store information and services" },
    {
      title: "Store Information",
      icon: Building2,
      description: "Store details and services",
    },
    {
      title: "Location & Hours",
      icon: MapPin,
      description: "Address and operating hours",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (e: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateAndSubmit = async () => {
    if (!isLoading) {
      await createPharmacy(shopDetails);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="">
              <div className="w-[7rem] h-[4rem] bg-teal-50 rounded-lg flex items-center justify-center">
                {/* <img src="/assets/vitalinc.png" alt="Vitalinc" className="w-full h-auto" /> */}
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/vitalinc.png"
                    alt="Vitalinc"
                    fill
                    className="object-contain"
                    sizes="112px"
                    priority
                  />
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Need help?</span>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Healthcare Network
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your pharmacy profile and reach thousands of customers in
            your area. Complete the registration in just a few steps.
          </p>
        </div>

        {/* Steps Progress */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    index <= activeStep
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index === activeStep ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Progress
            indicatorColor={"bg-myPrimary"}
            value={activeStep === 0 ? 33.33 : activeStep === 1 ? 66.66 : 100}
            className="h-2 bg-gray-100"
          />
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeStep === 0 && (
              <StepOne
                shopDetails={shopDetails}
                setShopDetails={setShopDetails}
                handleNext={handleNext}
              />
            )}

            {activeStep === 1 && (
              <StepTwo
                handleNext={handleNext}
                handleBack={handleBack}
                shopDetails={shopDetails}
                setShopDetails={setShopDetails}
              />
            )}

            {activeStep === 2 && (
              <StepThree
                shopDetails={shopDetails}
                setShopDetails={setShopDetails}
                handleBack={handleBack}
                handleCreateAndSubmit={handleCreateAndSubmit}
                isLoading={isLoading}
                setPlaceName={setPlaceName}
                placeName={placeName}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShopCreate;
