import React, { FC, useEffect, useState } from 'react'
import * as Yup from "yup";
import LocationSelector from '../../../../ShopCreate/Steps/StepTwo/Location';
import { useFormik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdatePharmacyLocationMutation } from '@/redux/features/pharmacy/pharmacyApi';
import toast from 'react-hot-toast';

type Props = {
    setOpen: (open: boolean) => void;
    refetch: any;
    pharmacyInfo: any;
}

const validationSchema = Yup.object().shape({
    city: Yup.string().required("city is required, location error!"),
    state: Yup.string().required("state/province is required, location error!"),
    coordinates: Yup.object().shape({
      error:Yup.string(),
      lat: Yup.number().required("Lat is required"),
      lng:Yup.number().required("Lng is required")
    }).test('is-valid-location', 'Invalid location', function(value) {
      if (value.error) {
        return this.createError({ path: 'coordinates.error', message: value.error });
      }
      return true;
    }),
    })
   
const LocationEdit:FC<Props> = ({setOpen, refetch, pharmacyInfo}) => {
  
  const [updatePharmacyLocation,{isSuccess,error,data,isLoading}] = useUpdatePharmacyLocationMutation();

    const [locationInfo,setLocationInfo] = useState({
       coordinates:{
        lat: pharmacyInfo.coordinates.lat,
        lng: pharmacyInfo.coordinates.lng
       },
       address: {
        city:pharmacyInfo.address.city,
        state: pharmacyInfo.address.state
       }
    });


    const handleSubmit= async()=>{
 
        const touchedFields = {
          city:true,
          state:true,
          coordinates:{
            error:true,
            lat:true,
            lng:true
          },
        }
        setTouched(touchedFields,true);
      
        if(isValid && dirty){
          await updatePharmacyLocation({id:pharmacyInfo.id,data:locationInfo})
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
          city: pharmacyInfo.address.city,
          state: pharmacyInfo.address.state,
          coordinates:{
            error:'',
            lat:pharmacyInfo.coordinates.lat,
            lng:pharmacyInfo.coordinates.lng
          },
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: ()=> {},
      });
      
  const { values, errors, touched, handleChange, handleBlur, isValid, dirty,setFieldValue,setTouched,setFieldTouched,validateForm,setFieldError } = formik ;
    
      

return (
    <div>
       <LocationSelector 
         handleChange={handleChange}
         setFieldError={setFieldError}
         setFieldValue={setFieldValue}
         errors={errors}
         touched={touched}
         setFieldTouched={setFieldTouched}
         onBlur={handleBlur}
         state={locationInfo} 
         setState={setLocationInfo} 
       />
        <div className='space-y-3 py-2'>

      
         <div>
                <Label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </Label>
                <Input
                  name="city"
                  value={locationInfo.address.city}
                  readOnly
                  placeholder="Located City"
                  className="w-full bg-gray-300 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
                />
              </div> 

              <div>
                <Label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State / Province
                </Label>
                <Input
                  name="state"
                  value={locationInfo.address.state}
                  readOnly
                  placeholder="Located State"
                  className="w-full bg-gray-300 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
                />
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
  )
}

export default LocationEdit;