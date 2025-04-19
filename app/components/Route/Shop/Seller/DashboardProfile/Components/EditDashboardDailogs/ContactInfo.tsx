import { IndianFlagIcon } from "@/app/static/svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatePharmacyContactInfoMutation } from "@/redux/features/pharmacy/pharmacyApi";
import { useFormik } from "formik";
import { PlusCircle, X } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  setOpen: (open: boolean) => void;
  refetch: any;
  pharmacyInfo: any;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  contactPersonName: Yup.string().required("Contact person name is required!"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
    .required("Mobile number is required!"),
  additionalMobileNumbers: Yup.array().of(
    Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
      .required("Either add a valid phone number or remove this field")
  ),
  whatsappNumber: Yup.string().matches(
    /^[0-9]{10}$/,
    "whatsapp number must be exactly 10 digits!"
  ),

  telephoneNumber: Yup.object().shape({
    areaCode: Yup.string()
      .matches(/^[0-9]{2,5}$/, "Area code must be between 2 and 5 digits")
      .test(
        "area-code-dependency",
        "Area code is required when number is provided",
        function (value) {
          return !this.parent.number || (!!this.parent.number && !!value);
        }
      ),
    number: Yup.string()
      .matches(/^[0-9]{6,8}$/, "Landline number must be between 6 and 8 digits")
      .test(
        "number-dependency",
        "Number is required when area code is provided",
        function (value) {
          return !this.parent.areaCode || (!!this.parent.areaCode && !!value);
        }
      ),
  }),
});

const ContactInfo: FC<Props> = ({
  setOpen,
  refetch,
  pharmacyInfo,
}) => {
  
 const [updatePharmacyContactInfo,{isSuccess,isLoading,data,error}] = useUpdatePharmacyContactInfoMutation()


  const [contactInfo, setContactInfo] = useState({
    email: pharmacyInfo.email,
    contactPersonName: {
      title: pharmacyInfo.contactPersonName.title,
      name: pharmacyInfo.contactPersonName.name,
    },
    mobileNumber: pharmacyInfo.mobileNumber,
    additionalMobileNumbers: pharmacyInfo.additionalMobileNumbers,
    whatsappNumber: pharmacyInfo.whatsappNumber,
    telephoneNumber: {
      areaCode: pharmacyInfo.telephoneNumber.areaCode,
      number: pharmacyInfo.telephoneNumber.number,
    },
  });

  const addPhoneNumber = () => {
    setFieldValue("additionalMobileNumbers", [...values.additionalMobileNumbers,""])
    setContactInfo((previous: any) => {
      if (previous.additionalMobileNumbers?.length < 2) {
        return {
          ...previous,
          additionalMobileNumbers: [...previous.additionalMobileNumbers, ""],
        };
      }
      return previous;
    });
  };

  const removePhoneNumber = (index: number) => {
    const newAdditionalNumbers = values.additionalMobileNumbers.filter((_, i) => i !== index);
    setFieldValue("additionalMobileNumbers", newAdditionalNumbers);
    setContactInfo((previous: any) => {
      const newPhones = previous.additionalMobileNumbers?.filter(
        (_, i) => i !== index
      );
      return {
        ...previous,
        additionalMobileNumbers: newPhones,
      };
    });
  };
  const updatePhoneNumber = (index: number, value: string) => {
    const newPhones = [...values.additionalMobileNumbers];
    newPhones[index] = value;
    setFieldValue("additionalMobileNumbers",newPhones)
   
    setContactInfo((previous: any) => {
      const newPhones = [...previous.additionalMobileNumbers];
      newPhones[index] = value;
      return {
        ...previous,
        additionalMobileNumbers: newPhones,
      };
    });
  };

  const handleSubmit= async()=>{
 
    const touchedFields = {
      email:true,
      contactPersonName:true,
      mobileNumber:true,
      additionalMobileNumbers: values.additionalMobileNumbers.map(() => true),
      whatsappNumber:true,
      telephoneNumber:{
        areaCode:true,
        number:true
      }
    }
    setTouched(touchedFields,true);
  
    if(isValid && dirty){
      await updatePharmacyContactInfo({id:pharmacyInfo.id,data:contactInfo})
    }
    
  }

  const formik = useFormik({
    initialValues: {
      email: contactInfo.email ,
      contactPersonName: contactInfo.contactPersonName.name ,
      mobileNumber: contactInfo.mobileNumber,
      additionalMobileNumbers: contactInfo.additionalMobileNumbers,
      whatsappNumber: contactInfo.whatsappNumber,
      telephoneNumber: {
        areaCode: contactInfo.telephoneNumber?.areaCode ,
        number: contactInfo.telephoneNumber?.number
      }
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount:true,
    onSubmit: ()=> {},
  });

  const {errors,touched,values,handleChange,handleBlur,isValid,setTouched,setFieldValue,dirty} = formik


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
      <h1 className="text-3xl font-medium flex justify-center font-Outfit">Contact Info</h1>
      <div className="py-3 space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="bg-white ring-transparent border-none shadow-none"
            placeholder="Enter Your Business Email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => {
              handleChange(e);
              setContactInfo((previous: any) => ({
                ...previous,
                email: e.target.value,
              }));
            }}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 font-Outfit">
              {errors.email as string}
            </span>
          )}
        </div>

        <div className="flex w-full gap-2">
          <div className="space-y-2 w-fit">
            <Label htmlFor="title">Title</Label>
            <Select
              onValueChange={(value: any) =>
                setContactInfo((previous: any) => ({
                  ...previous,
                  contactPersonName: {
                    ...previous.contactPersonName,
                    title: value,
                  },
                }))
              }
              value={contactInfo.contactPersonName?.title}
              defaultValue="mr"
            >
              <SelectTrigger
                className="w-[5rem] ring-transparent bg-white"
                id="title"
              >
                <SelectValue
                  placeholder={contactInfo.contactPersonName?.title}
                />
              </SelectTrigger>
              <SelectContent className="w-[5rem] bg-white">
                <SelectItem className="hover:bg-gray-100" value="mr">
                  Mr
                </SelectItem>
                <SelectItem className="hover:bg-gray-100" value="mrs">
                  Mrs
                </SelectItem>
                <SelectItem className="hover:bg-gray-100" value="ms">
                  Ms
                </SelectItem>
                <SelectItem className="hover:bg-gray-100" value="dr">
                  Dr
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2  w-full">
            <Label htmlFor="contact-person">Contact Person</Label>
            <Input
              className="bg-white ring-transparent border-none"
              id="contactPersonName"
              placeholder="Contact Person's Name"
              value={contactInfo.contactPersonName?.name}
              onChange={(e) => {
                handleChange(e);
                setContactInfo((previous: any) => ({
                  ...previous,
                  contactPersonName: {
                    ...previous.contactPersonName,
                    name: e.target.value,
                  },
                }));
              }}
              onBlur={handleBlur}
            />
            {errors.contactPersonName && touched.contactPersonName && (
              <span className="text-red-500">
                {errors.contactPersonName as string}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="flex space-x-2">
                    <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
                      <IndianFlagIcon />
                      +91
                    </div>
                    <Input
                      id="mobileNumber"
                      type="number"
                      placeholder="Mobile Number"
                      className="flex-1 ring-transparent"
                      value={contactInfo.mobileNumber}
                      maxLength={10}
                      onChange={(e) => {
                        handleChange(e);
                        setContactInfo((previous: any) => ({
                          ...previous,
                          mobileNumber: e.target.value,
                        }));
                      }}
                      onBlur={handleBlur}
                    />
                  
                  </div>    
                  {errors.mobileNumber && touched.mobileNumber && (
                      <span className="text-red-500 flex justify-center">{errors.mobileNumber as string}</span>
                    )}
                </div>
                {contactInfo.additionalMobileNumbers?.map((phone:any, index:number) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`mobile-${index + 1}`}>
                      Additional Mobile Number {index + 1}
                    </Label>
                    <div className="flex space-x-2">
                      <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
                        <IndianFlagIcon />
                        +91
                      </div>
                      <Input
                        id={`additionalMobileNumbers[${index}]`}
                        name={`additionalMobileNumbers[${index}]`}
                        placeholder="Additional Mobile Number"
                        className="flex-1 ring-transparent"
                        value={phone}
                        type="number"
                        maxLength={10}
                        onChange={(e) =>{
                          updatePhoneNumber(index, e.target.value)
                        }}
                        onBlur={handleBlur}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removePhoneNumber(index)}
                        aria-label="Remove phone number"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {(errors.additionalMobileNumbers && errors.additionalMobileNumbers[index] as any)  && (touched.additionalMobileNumbers && touched.additionalMobileNumbers[index])&& (
                      <span className="text-red-500 py-1 flex justify-center">{errors.additionalMobileNumbers[index] as string}</span>
                    )}
                  </div>
                ))}
                {contactInfo.additionalMobileNumbers?.length < 2 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={addPhoneNumber}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Mobile Number
                  </Button>
                )}
              
             
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                  <div className="flex space-x-2">
                    <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
                      <IndianFlagIcon />
                      +91
                    </div>
                    <Input
                      id="whatsapp"
                      name="whatsappNumber"
                      placeholder="WhatsApp Number"
                      className="flex-1 ring-transparent"
                      maxLength={10}
                      type="number"
                      value={contactInfo.whatsappNumber}
                      onChange={(e: any) => {
                        handleChange(e)
                        setContactInfo((previous: any) => ({
                          ...previous,
                          whatsappNumber: e.target.value,
                        }));
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.whatsappNumber && touched.whatsappNumber && (
                      <span className="text-red-500 flex justify-center">{errors.whatsappNumber as string}</span>
                    )}
                </div>
                

             
                <div className="space-y-2">
                  <Label htmlFor="landline">Landline Number (optional)</Label>
                  <div className="flex space-x-2">
                    <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
                      <IndianFlagIcon />
                      +91
                    </div>
                    <Input
                      id="area-code"
                      name="telephoneNumber.areaCode"
                      placeholder="Area code"
                      className="w-24 ring-transparent"
                      type="number"
                      maxLength={5}
                      value={contactInfo.telephoneNumber.areaCode}
                      onChange={(e: any) => {
                        handleChange(e)
                        setContactInfo((previous: any) => ({
                          ...previous,
                          telephoneNumber: {
                            ...previous.telephoneNumber,
                            areaCode: e.target.value,
                          },
                        }));
                      }}
                      onBlur={handleBlur}
                    />
                    <Input
                      id="landline"
                      name="telephoneNumber.number"
                      placeholder="Landline No:"
                      className="flex-1 ring-transparent"
                      maxLength={8}
                      type="number"
                      value={contactInfo.telephoneNumber.number}
                      onChange={(e: any) => {
                        handleChange(e)
                        setContactInfo((previous: any) => ({
                          ...previous,
                          telephoneNumber: {
                            ...previous.telephoneNumber,
                            number: e.target.value,
                          },
                        }));
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.telephoneNumber?.areaCode && errors.telephoneNumber?.areaCode && (
                <span className="text-red-500 py-1 flex justify-center">
                  {errors.telephoneNumber.areaCode as string}
                </span>
              )}
              {touched.telephoneNumber?.number && errors.telephoneNumber?.number && (
                <span className="text-red-500 py-1 flex justify-center">
                  {errors.telephoneNumber.number as string}
                </span>
              )}
                </div>
              
              </div>
      </div>
   
   <div className="w-full flex justify-center pt-3">
      <Button onClick={handleSubmit} className="bg-myPrimary w-[70%] text-md font-Outfit text-white px-8 py-3">
        Update 
      </Button> 
   </div>
     
      
    </div>
  );
};

export default ContactInfo;
