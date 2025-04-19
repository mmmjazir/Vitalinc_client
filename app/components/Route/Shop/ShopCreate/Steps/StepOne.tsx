// "use client";
// import { IndianFlagIcon } from "@/app/static/svg";
// import { FC, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { PlusCircle, X } from "lucide-react";
// import Image from "next/image";
// import * as Yup from "yup";
// import { useFormik } from "formik";

// type Props = {
//   shopDetails: any;
//   setShopDetails: (shopDetails: any) => void;
//   handleNext: any;
// };

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email!")
//     .required("Please enter your email!"),
//   contactPersonName: Yup.string().required("Contact person name is required!"),
//   mobileNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
//     .required("Mobile number is required!"),
//   additionalMobileNumbers: Yup.array()
//     .of(
//       Yup.string()
//         .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
//         .required("Either add a valid phone number or remove this field")
//     ),
//   whatsappNumber: Yup.string() 
//     .matches(/^[0-9]{10}$/, "whatsapp number must be exactly 10 digits!"),
  
//   telephoneNumber:  Yup.object().shape({
//     AreaCode: Yup.string()
//       .matches(/^[0-9]{2,5}$/, "Area code must be between 2 and 5 digits")
//       .test('area-code-dependency', 'Area code is required when number is provided', function(value) {
//         return !this.parent.Number || (!!this.parent.Number && !!value);
//       }),
//     Number: Yup.string()
//       .matches(/^[0-9]{6,8}$/, "Landline number must be between 6 and 8 digits")
//       .test('number-dependency', 'Number is required when area code is provided', function(value) {
//         return !this.parent.AreaCode || (!!this.parent.AreaCode && !!value);
//       })
//   })
// });

// const StepOne: FC<Props> = ({ shopDetails, setShopDetails, handleNext:next }) => {
  
//   const addPhoneNumber = () => {
//     setFieldValue("additionalMobileNumbers", [...values.additionalMobileNumbers,""])
//     setShopDetails((previous: any) => {
//       if (previous.additionalMobileNumbers?.length < 2) {
//         return {
//           ...previous,
//           additionalMobileNumbers: [...previous.additionalMobileNumbers, ""],
//         };
//       }
//       return previous;
//     });
//   };

//   const removePhoneNumber = (index: number) => {
//     const newAdditionalNumbers = values.additionalMobileNumbers.filter((_, i) => i !== index);
//     setFieldValue("additionalMobileNumbers", newAdditionalNumbers);
//     setShopDetails((previous: any) => {
//       const newPhones = previous.additionalMobileNumbers?.filter(
//         (_, i) => i !== index
//       );
//       return {
//         ...previous,
//         additionalMobileNumbers: newPhones,
//       };
//     });
//   };

//   const updatePhoneNumber = (index: number, value: string) => {
//     const newPhones = [...values.additionalMobileNumbers];
//     newPhones[index] = value;
//     setFieldValue("additionalMobileNumbers",newPhones)
   
//     setShopDetails((previous: any) => {
//       const newPhones = [...previous.additionalMobileNumbers];
//       newPhones[index] = value;
//       return {
//         ...previous,
//         additionalMobileNumbers: newPhones,
//       };
//     });
//   };
  
// const handleNext=()=>{
 
//   const touchedFields = {
//     email:true,
//     contactPersonName:true,
//     mobileNumber:true,
//     additionalMobileNumbers: values.additionalMobileNumbers.map(() => true),
//     whatsappNumber:true,
//     telephoneNumber:{
//       AreaCode:true,
//       Number:true
//     }
//   }
//   setTouched(touchedFields,true);

//   if(isValid){
//     next()
//   }
// }

//   const formik = useFormik({
//     initialValues: {
//       email: shopDetails.email ,
//       contactPersonName: shopDetails.contactPersonName.name ,
//       mobileNumber: shopDetails.mobileNumber,
//       additionalMobileNumbers: shopDetails.additionalMobileNumbers,
//       whatsappNumber: shopDetails.whatsappNumber,
//       telephoneNumber: {
//         AreaCode: shopDetails.telephoneNumber?.AreaCode ,
//         Number: shopDetails.telephoneNumber?.Number
//       }
//     },
//     validationSchema,
//     validateOnChange: true,
//     validateOnBlur: true,
//     validateOnMount:true,
//     onSubmit: ()=> {},
//   });

//   const {errors,touched,values,handleChange,handleBlur,isValid,setTouched,setFieldValue} = formik
 

//   return (
//     <Card className="w-full max-w-5xl mx-auto">
//       <CardContent className="p-0">
//           <div className="flex flex-col md:flex-row">
//             <div className="md:w-1/2 bg-blue-100 p-6 flex flex-col justify-between">
//               <div>
//                 <h2 className="text-2xl text-gray-700 font-bold mb-6">
//                   Enter Contact Details
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       className="bg-white ring-transparent border-none shadow-none"
//                       placeholder="Enter Your Business Email"
//                       type="email"
//                       value={shopDetails.email}
//                       onChange={(e) => {
//                         handleChange(e);
//                         setShopDetails((previous: any) => ({
//                           ...previous,
//                           email: e.target.value,
//                         }));
//                       }}
//                       onBlur={handleBlur}
//                     />
//                      {errors.email && touched.email && (
//                       <span className="text-red-500">{errors.email as string}</span>
//                     )}
//                   </div>
//                   <div className="flex w-full gap-2">
//                     <div className="space-y-2 w-fit">
//                       <Label htmlFor="title">Title</Label>
//                       <Select
//                         onValueChange={(value: any) =>
//                           setShopDetails((previous: any) => ({
//                             ...previous,
//                             contactPersonName: {
//                               ...previous.contactPersonName,
//                               title: value,
//                             },
//                           }))
//                         }
//                         value={shopDetails.contactPersonName?.title} 
//                         defaultValue="mr"
//                       >
//                         <SelectTrigger
//                           className="w-[5rem] ring-transparent bg-white"
//                           id="title"
//                         >
//                           <SelectValue/>
//                         </SelectTrigger>
//                         <SelectContent className="w-[5rem] bg-white">
//                           <SelectItem className="hover:bg-gray-100" value="mr">
//                             Mr
//                           </SelectItem>
//                           <SelectItem className="hover:bg-gray-100" value="mrs">
//                             Mrs
//                           </SelectItem>
//                           <SelectItem className="hover:bg-gray-100" value="ms">
//                             Ms
//                           </SelectItem>
//                           <SelectItem className="hover:bg-gray-100" value="dr">
//                             Dr
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2  w-full">
//                       <Label htmlFor="contact-person">Contact Person</Label>
//                       <Input
//                         className="bg-white ring-transparent border-none"
//                         id="contactPersonName"
//                         placeholder="Contact Person's Name"
//                         value={shopDetails.contactPersonName?.name}
//                         onChange={(e) => {
//                           handleChange(e);
//                           setShopDetails((previous: any) => ({
//                             ...previous,
//                             contactPersonName: {
//                               ...previous.contactPersonName,
//                               name: e.target.value,
//                             },
//                           }));
//                         }}
//                         onBlur={handleBlur}
//                       />
//                        {errors.contactPersonName && touched.contactPersonName && (
//                       <span className="text-red-500">{errors.contactPersonName as string}</span>
//                     )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 h-[17rem]">
//                 <Image
//                   src="/assets/shop_create_form_image.png"
//                   alt="Contact illustration"
//                   width={600}
//                   height={700}
//                   className="max-w-full h-auto"
//                 />
//               </div>
//             </div>
//             <div className="md:w-1/2 p-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="mobile">Mobile Number</Label>
//                   <div className="flex space-x-2">
//                     <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
//                       <IndianFlagIcon />
//                       +91
//                     </div>
//                     <Input
//                       id="mobileNumber"
//                       type="number"
//                       placeholder="Mobile Number"
//                       className="flex-1 ring-transparent"
//                       value={shopDetails.mobileNumber}
//                       maxLength={10}
//                       onChange={(e) => {
//                         handleChange(e);
//                         setShopDetails((previous: any) => ({
//                           ...previous,
//                           mobileNumber: e.target.value,
//                         }));
//                       }}
//                       onBlur={handleBlur}
//                     />
                  
//                   </div>    
//                   {errors.mobileNumber && touched.mobileNumber && (
//                       <span className="text-red-500 flex justify-center">{errors.mobileNumber as string}</span>
//                     )}
//                 </div>
//                 {shopDetails.additionalMobileNumbers?.map((phone, index) => (
//                   <div key={index} className="space-y-2">
//                     <Label htmlFor={`mobile-${index + 1}`}>
//                       Additional Mobile Number {index + 1}
//                     </Label>
//                     <div className="flex space-x-2">
//                       <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
//                         <IndianFlagIcon />
//                         +91
//                       </div>
//                       <Input
//                         id={`additionalMobileNumbers[${index}]`}
//                         name={`additionalMobileNumbers[${index}]`}
//                         placeholder="Additional Mobile Number"
//                         className="flex-1 ring-transparent"
//                         value={phone}
//                         type="number"
//                         maxLength={10}
//                         onChange={(e) =>{
//                           updatePhoneNumber(index, e.target.value)
//                         }}
//                         onBlur={handleBlur}
//                       />
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => removePhoneNumber(index)}
//                         aria-label="Remove phone number"
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     {(errors.additionalMobileNumbers && errors.additionalMobileNumbers[index] as any)  && (touched.additionalMobileNumbers && touched.additionalMobileNumbers[index])&& (
//                       <span className="text-red-500 py-1 flex justify-center">{errors.additionalMobileNumbers[index] as string}</span>
//                     )}
//                   </div>
//                 ))}
//                 {shopDetails.additionalMobileNumbers?.length < 2 && (
//                   <Button
//                     variant="link"
//                     className="p-0 h-auto font-normal"
//                     onClick={addPhoneNumber}
//                   >
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     Add Another Mobile Number
//                   </Button>
//                 )}
//                 <div className="space-y-2">
//                   <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
//                   <div className="flex space-x-2">
//                     <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
//                       <IndianFlagIcon />
//                       +91
//                     </div>
//                     <Input
//                       id="whatsapp"
//                       name="whatsappNumber"
//                       placeholder="WhatsApp Number"
//                       className="flex-1 ring-transparent"
//                       maxLength={10}
//                       type="number"
//                       value={shopDetails.whatsappNumber}
//                       onChange={(e: any) => {
//                         handleChange(e)
//                         setShopDetails((previous: any) => ({
//                           ...previous,
//                           whatsappNumber: e.target.value,
//                         }));
//                       }}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   {errors.whatsappNumber && touched.whatsappNumber && (
//                       <span className="text-red-500 flex justify-center">{errors.whatsappNumber as string}</span>
//                     )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="landline">Landline Number (optional)</Label>
//                   <div className="flex space-x-2">
//                     <div className="border bg-gray-50 flex items-center gap-1 py-[6px] rounded-md px-3">
//                       <IndianFlagIcon />
//                       +91
//                     </div>
//                     <Input
//                       id="area-code"
//                       name="telephoneNumber.AreaCode"
//                       placeholder="Area code"
//                       className="w-24 ring-transparent"
//                       type="number"
//                       maxLength={5}
//                       value={shopDetails.telephoneNumber.AreaCode}
//                       onChange={(e: any) => {
//                         handleChange(e)
//                         setShopDetails((previous: any) => ({
//                           ...previous,
//                           telephoneNumber: {
//                             ...previous.telephoneNumber,
//                             AreaCode: e.target.value,
//                           },
//                         }));
//                       }}
//                       onBlur={handleBlur}
//                     />
//                     <Input
//                       id="landline"
//                       name="telephoneNumber.Number"
//                       placeholder="Landline No:"
//                       className="flex-1 ring-transparent"
//                       maxLength={8}
//                       type="number"
//                       value={shopDetails.telephoneNumber.Number}
//                       onChange={(e: any) => {
//                         handleChange(e)
//                         setShopDetails((previous: any) => ({
//                           ...previous,
//                           telephoneNumber: {
//                             ...previous.telephoneNumber,
//                             Number: e.target.value,
//                           },
//                         }));
//                       }}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   {touched.telephoneNumber?.AreaCode && errors.telephoneNumber?.AreaCode && (
//                 <span className="text-red-500 py-1 flex justify-center">
//                   {errors.telephoneNumber.AreaCode as string}
//                 </span>
//               )}
//               {touched.telephoneNumber?.Number && errors.telephoneNumber?.Number && (
//                 <span className="text-red-500 py-1 flex justify-center">
//                   {errors.telephoneNumber.Number as string}
//                 </span>
//               )}
//                 </div>
//                 <Button
//                   className="w-full !bg-myPrimary text-white text-md"
//                   onClick={handleNext}
//                   type="button" 
//                  >
//                   Continue
//                 </Button>
//               </div>
//             </div>
//           </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default StepOne;



"use client";
import { IndianFlagIcon } from "@/app/static/svg";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import {motion} from 'framer-motion'
import {Mail, Phone, X,PlusCircle,ChevronRight} from 'lucide-react'

type Props = {
  shopDetails: any;
  setShopDetails: (shopDetails: any) => void;
  handleNext: any;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  contactPersonName: Yup.string().required("Contact person name is required!"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
    .required("Mobile number is required!"),
  additionalMobileNumbers: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits!")
        .required("Either add a valid phone number or remove this field")
    ),
  whatsappNumber: Yup.string() 
    .matches(/^[0-9]{10}$/, "whatsapp number must be exactly 10 digits!"),
  
  telephoneNumber:  Yup.object().shape({
    AreaCode: Yup.string()
      .matches(/^[0-9]{2,5}$/, "Area code must be between 2 and 5 digits")
      .test('area-code-dependency', 'Area code is required when number is provided', function(value) {
        return !this.parent.Number || (!!this.parent.Number && !!value);
      }),
    Number: Yup.string()
      .matches(/^[0-9]{6,8}$/, "Landline number must be between 6 and 8 digits")
      .test('number-dependency', 'Number is required when area code is provided', function(value) {
        return !this.parent.AreaCode || (!!this.parent.AreaCode && !!value);
      })
  })
});

const StepOne: FC<Props> = ({ shopDetails, setShopDetails, handleNext:next }) => {
  
  const addPhoneNumber = () => {
    setFieldValue("additionalMobileNumbers", [...values.additionalMobileNumbers,""])
    setShopDetails((previous: any) => {
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
    setShopDetails((previous: any) => {
      const newPhones = previous.additionalMobileNumbers?.filter(
        (_:any, i:any) => i !== index
      );
      return {
        ...previous,
        additionalMobileNumbers: newPhones,
      };
    });
  };


// const handleAdditionalNumberChange = (index: number, e: any) => {
//   const newPhones = [...values.additionalMobileNumbers];
//   newPhones[index] = e.target.value;
//   setFieldValue("additionalMobileNumbers",newPhones)
//   setShopDetails((previous: any) => {
//     const newPhones = [...previous.additionalMobileNumbers];
//     newPhones[index] = e.target.value;
//     return {
//       ...previous,
//       additionalMobileNumbers: newPhones,
//     };
//   });
// }

  const updatePhoneNumber = (index: number, value: string) => {
    const newPhones = [...shopDetails.additionalMobileNumbers];
    newPhones[index] = value;
    setFieldValue("additionalMobileNumbers",newPhones)
   
    setShopDetails((previous: any) => {
      const newPhones = [...previous.additionalMobileNumbers];
      newPhones[index] = value;
      return {
        ...previous,
        additionalMobileNumbers: newPhones,
      };
    });
  };
  
const handleNext=()=>{
 
  const touchedFields = {
    email:true,
    contactPersonName:true,
    mobileNumber:true,
    additionalMobileNumbers: values.additionalMobileNumbers.map(() => true),
    whatsappNumber:true,
    telephoneNumber:{
      AreaCode:true,
      Number:true
    }
  }
  setTouched(touchedFields,true);

  if(isValid){
    next()
  }
}

  const formik = useFormik({
    initialValues: {
      email: shopDetails.email ,
      contactPersonName: shopDetails.contactPersonName.name ,
      mobileNumber: shopDetails.mobileNumber,
      additionalMobileNumbers: shopDetails.additionalMobileNumbers,
      whatsappNumber: shopDetails.whatsappNumber,
      telephoneNumber: {
        AreaCode: shopDetails.telephoneNumber?.AreaCode ,
        Number: shopDetails.telephoneNumber?.Number
      }
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount:true,
    onSubmit: ()=> {},
  });

  const {errors,touched,values,handleChange,handleBlur,isValid,setTouched,setFieldValue} = formik
 

  return (
    <div className="w-full">
      <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Column - Illustration and Benefits */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Join Our Healthcare Network
                </h2>
                <p className="text-gray-600 font-Arimo font-semibold">
                  Enter your contact details to get started. We&apos;ll use
                  these to keep you updated about your pharmacy&apos;s
                  performance.
                </p>

                {/* Benefits Section */}
                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Benefits of joining:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Reach more customers in your area",
                      "Manage orders efficiently",
                      "Get real-time analytics",
                      "24/7 customer support",
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex font-Poppins text-sm items-center gap-3 text-gray-600"
                      >
                        <div className="w-2 h-2 rounded-full bg-teal-500" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Illustration */}
              {/* <div className="mt-6 max-md:hidden">
              <img
                src="/assets/shop_create_form_image.png"
                alt="Pharmacy illustration"
                className="rounded-lg w-full h-auto"
              />
            </div> */}
              <div className="mt-6 max-md:hidden">
                <div className="relative w-full h-60 sm:h-72 lg:h-82">
                  <Image
                    src="/assets/shop_create_form_image.png"
                    alt="Pharmacy illustration"
                    fill
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-8 bg-white">
              <div className="space-y-8">
                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Contact Information
                    </h3>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-gray-50 border-gray-200 focus:border-teal-500 hover:border-gray-300 transition-colors"
                      placeholder="your@email.com"
                      value={shopDetails.email}
                      onChange={(e) => {
                        handleChange(e);
                        setShopDetails((previous: any) => ({
                          ...previous,
                          email: e.target.value,
                        }));
                      }}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email as any}
                      </motion.p>
                    )}
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Select
                        value={shopDetails.contactPersonName?.title}
                        onValueChange={(value: any) =>
                          setShopDetails((previous: any) => ({
                            ...previous,
                            contactPersonName: {
                              ...previous.contactPersonName,
                              title: value,
                            },
                          }))
                        }
                        defaultValue="mr"
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {["Mr", "Mrs", "Ms", "Dr"].map((title) => (
                            <SelectItem
                              key={title.toLowerCase()}
                              value={title.toLowerCase()}
                              className="hover:bg-gray-100"
                            >
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="contactPersonName">Full Name</Label>
                      <Input
                        id="contactPersonName"
                        className="bg-gray-50 border-gray-200"
                        placeholder="Enter your full name"
                        value={shopDetails.contactPersonName?.name}
                        onChange={(e) => {
                          handleChange(e);
                          setShopDetails((previous: any) => ({
                            ...previous,
                            contactPersonName: {
                              ...previous.contactPersonName,
                              name: e.target.value,
                            },
                          }));
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Numbers Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Phone Numbers
                    </h3>
                  </div>

                  {/* Primary Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Primary Mobile Number</Label>
                    <div className="flex gap-2">
                      <div className="bg-gray-100 px-3 py-2 rounded-md flex items-center gap-2">
                        <IndianFlagIcon />
                        <span className="text-gray-600">+91</span>
                      </div>
                      <Input
                        type="number"
                        id="mobileNumber"
                        className="flex-1 bg-gray-50 border-gray-200"
                        placeholder="Mobile number"
                        value={shopDetails.mobileNumber}
                        onChange={(e) => {
                          const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFieldValue("mobileNumber", numericOnly);
                          setShopDetails((previous: any) => ({
                            ...previous,
                            mobileNumber: numericOnly,
                          }));
                        }}
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Additional Numbers */}
                  {shopDetails.additionalMobileNumbers.map(
                    (phone: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <Label>Additional Number {index + 1}</Label>
                        <div className="flex gap-2">
                          <div className="bg-gray-100 px-3 py-2 rounded-md flex items-center gap-2">
                            <IndianFlagIcon />
                            <span className="text-gray-600">+91</span>
                          </div>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            id={`additionalMobileNumbers[${index}]`}
                            className="flex-1 bg-gray-50 border-gray-200"
                            placeholder="Additional number"
                            value={phone}
                            onChange={(e) => {
                              const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                              updatePhoneNumber(index, numericOnly);
                            }}
                            maxLength={10}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removePhoneNumber(index)}
                            className="border-red-200 hover:bg-red-50 text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )
                  )}

                  {shopDetails.additionalMobileNumbers.length < 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addPhoneNumber}
                      className="w-full border-dashed border-2"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Another Number
                    </Button>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="pt-6">
                  <Button
                    onClick={handleNext}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={!isValid}
                  >
                    Continue to Store Details
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepOne;



