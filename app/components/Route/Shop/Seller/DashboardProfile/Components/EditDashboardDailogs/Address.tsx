import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUpdatePharmacyAddressMutation } from "@/redux/features/pharmacy/pharmacyApi";
import { useFormik } from "formik";
import { CircleHelp } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  setOpen: (open: boolean) => void;
  refetch: any;
  pharmacyInfo: any;
};

const validationSchema = Yup.object().shape({
  areaOrLocality: Yup.string().required("Area / Sector / Locality is required"),
});

const Address: FC<Props> = ({ setOpen, refetch, pharmacyInfo }) => {
   const [updatePharmacyAddress,{isSuccess,error,data,isLoading}] = useUpdatePharmacyAddressMutation();

  const [addressInfo, setAddressInfo] = useState({
    shopBuildingInfo: pharmacyInfo.address.shopBuildingInfo,
    floorOrTower: pharmacyInfo.address.floorOrTower,
    areaOrLocality: pharmacyInfo.address.areaOrLocality,
    landmark: pharmacyInfo.address.landmark
  });

  const handleAddressChange = (e: any) => {
    const { value, name } = e.target;
    setAddressInfo((prev: any) => ({
      ...prev,
     [name]: value,
    }));
  };


  const handleSubmit= async()=>{
 
    const touchedFields = {
      areaOrLocality:true
    }
    setTouched(touchedFields,true);
  
    if(isValid && dirty){
      await updatePharmacyAddress({id:pharmacyInfo.id,data:addressInfo})
    }
    
  }

  useEffect(()=>{
    if(isSuccess){  
     const message = data?.message
     toast.success(message);
     refetch();    
     setOpen(false);
    }
    if(error){
     if("data" in error){
       const errorData = error as any;
       toast.error(errorData.data.message);
       setOpen(false);
     }
    }
 
   },[isSuccess,error])
 

  const formik = useFormik({
    initialValues: {
      shopBuildingInfo: pharmacyInfo.address.shopBuildingInfo,
      areaOrLocality: pharmacyInfo.address.areaOrLocality,
      floorOrTower: pharmacyInfo.address.floorOrTower,
      landmark: pharmacyInfo.address.landmark
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: () => {},
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    dirty,
    setFieldValue,
    setTouched,
    setFieldTouched,
    validateForm,
    setFieldError,
  } = formik;

  return (
    <div>
      <h1 className="text-3xl pb-2 font-medium flex justify-center font-Outfit">
        Address
      </h1>
      <div className="py-2">
        <Label
          htmlFor="shopBuildingInfo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Shop no. / building no. (optional)
        </Label>
        <Input
          name="shopBuildingInfo"
          id="shopBuildingInfo"
          value={addressInfo.shopBuildingInfo}
          onChange={(e: any) => {
            handleChange(e);
            handleAddressChange(e);
          }}
          onBlur={handleBlur}
          placeholder="Shop no. / building no. (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="py-2">
        <Label
          htmlFor="floorOrTower"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Floor / tower (optional)
        </Label>
        <Input
          name="floorOrTower"
          value={addressInfo.floorOrTower}
          onChange={(e: any) => {
            handleChange(e);
            handleAddressChange(e);
          }}
          onBlur={handleBlur}
          id="floorOrTower"
          placeholder="LFloor / tower (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="py-2">
        <Label
          htmlFor="areaOrLocality"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Area / Sector / Locality*
        </Label>
        <Input
          name="areaOrLocality"
          id="areaOrLocality"
          value={addressInfo.areaOrLocality}
          onChange={(e: any) => {
            handleChange(e);
            handleAddressChange(e);
          }}
          onBlur={handleBlur}
          placeholder="Area / Sector / Locality*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
        />

        {errors.areaOrLocality && touched.areaOrLocality && (
          <span className="text-red-500">
            {errors.areaOrLocality as string}
          </span>
        )}
      </div>

      <div className="py-2">
        <Label
          htmlFor="landmark"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Add any nearby landmark (optional)
        </Label>
        <Input
          name="landmark"
          id="landmark"
          value={addressInfo.landmark}
          onChange={(e: any) => {
            handleChange(e);
            handleAddressChange(e);
          }}
          onBlur={handleBlur}
          placeholder="Add any nearby landmark (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="py-2">
        <Label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City
        </Label>

        <div className="relative w-fit min-w-[15rem] max-w-[20rem]">
          <Input
            name="city"
            value={pharmacyInfo.address.city}
            readOnly
            placeholder="Located City"
            className="w-full bg-gray-200 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
          />

          <div className="absolute right-3 bottom-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp size={16} className="mb-1 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>
                    You can only update this field by updating the location
                    coordinates{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          State / Province
        </Label>
        <div className="relative w-fit min-w-[15rem] max-w-[20rem]">
          <Input
            name="city"
            value={pharmacyInfo.address.state}
            readOnly
            placeholder="Located State"
            className="w-full bg-gray-200 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
          />
          <div className="absolute right-3 bottom-2 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp size={16} className="mb-1 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>
                    You can only update this field by updating the location
                    coordinates{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center pt-3">
        <Button
          onClick={handleSubmit}
          className="bg-myPrimary w-[70%] text-md font-Outfit text-white px-8 py-3"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default Address;
