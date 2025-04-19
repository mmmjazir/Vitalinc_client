import Timepicker from "@/app/components/TimePicker/Timepicker";
import { Button } from "@/components/ui/button";
import { useUpdatePharmacyHoursMutation } from "@/redux/features/pharmacy/pharmacyApi";
import { HourglassDisabledOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { FC,useEffect,useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  setOpen: (open: boolean) => void;
  refetch: any;
  pharmacyInfo: any;
};

const validationSchema = Yup.object().shape({
  hours: Yup.object()
    .test(
      "at-least-3-days",
      "At least 3 working days are required",
      (value: any) => {
        const openDays = Object.keys(value).filter((day) => value[day]?.isOpen);
        return openDays.length >= 3;
      }
    )
    .test(
      "valid-times",
      "All selected working days must have valid start and end times",
      (value: any) => {
        const openDays = Object.keys(value).filter((day) => value[day]?.isOpen);
        const validTimes = openDays.every(
          (day) => value[day].startTime && value[day].endTime
        );
        return validTimes;
      }
    ),
});

const HoursEdit: FC<Props> = ({ setOpen, refetch, pharmacyInfo }) => {
    const [updatePharmacyHours,{isSuccess,error,data,isLoading}] = useUpdatePharmacyHoursMutation();
   
    //  const [hours,setHours] = useState({
    //         Monday: pharmacyInfo.hours.Monday,
    //         Tuesday: { isOpen: false },
    //         Wednesday: { isOpen: false },
    //         Thursday: { isOpen: false },
    //         Friday: { isOpen: false },
    //         Saturday: { isOpen: false },
    //         Sunday: { isOpen: false },
    //  })
    const [hours,setHours] = useState({
        hours: pharmacyInfo.hours
    })


    const handleSubmit =async(e:any)=>{
      e.preventDefault()
      const touchedFields = {
        hours: true
      };
    
      // Set all touched fields before validation
      setTouched(touchedFields, true);
        if(isValid && dirty){
           await updatePharmacyHours({id:pharmacyInfo.id,data:hours})
        }
      }
    
      const formik = useFormik({
        initialValues: {
          hours: pharmacyInfo.hours
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: ()=> {},
      });
      
      const { values, errors, touched, handleChange, handleBlur, isValid, dirty,setFieldValue,setTouched,setFieldTouched,validateForm,setFieldError } = formik ;
    
      useEffect(()=>{
        if(isSuccess){  
         const message = data?.message
         toast.success(message);
         setOpen(false);
         refetch();
        }
        if(error){
         if("data" in error){
           const errorData = error as any;
           toast.error(errorData.data.message);
           setOpen(false);
         }
        }
     
       },[isSuccess,error])

    return (
    <div>
      <h1 className="text-3xl font-medium flex justify-center font-Outfit">
        Operating Hours
      </h1>
       <Timepicker state={hours} setState={setHours} setFieldValue={setFieldValue} />
       {errors.hours && touched.hours && (
            <span className="text-red-500">{errors.hours as string}</span>
       )}
       <div className="w-full flex justify-center pt-3">
      <Button onClick={handleSubmit} className="bg-myPrimary w-[70%] text-md font-Outfit text-white px-8 py-3">
        Update 
      </Button> 
   </div>
    </div>
  );
};

export default HoursEdit;
