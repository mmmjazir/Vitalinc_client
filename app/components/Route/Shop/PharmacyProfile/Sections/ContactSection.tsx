// import React from "react";
// import {
//   AccessAlarm,
//   Business,
//   ContactMail,
//   Contacts,
//   DateRange,
//   DeliveryDining,
//   DeliveryDiningOutlined,
//   Directions,
//   DirectionsOutlined,
//   EventBusy,
//   InventoryOutlined,
//   LocationOn,
//   Phone,
//   PhoneAndroid,
//   PinDrop,
//   Search,
//   Verified,
//   WhatsApp,
// } from "@mui/icons-material";
// import { Send } from "lucide-react";

// type Props = {
//   data: any;
// };

// const ContactSection = ({ data }: Props) => {
//   return (
//    <div className="">
//      <div className="border-b pb-4 px-6 py-4">
//       <h1 className="flex items-center gap-3 text-lg font-semibold text-gray-800">
//         Contact Info
//       </h1>

//       <div className="mt-4">
//         {/* Phone Number */}
//         <div className="flex gap-3 items-center hover:bg-gray-100 p-3 rounded-lg transition-all duration-200">
//           <PhoneAndroid className="text-myPrimary w-5 h-5" />
//           <div className="flex text-sm justify-between pr-5 w-full">
//             <p className="text-sm text-gray-600">Mobile No:</p>

//             <p className="font-medium text-gray-800">{data?.mobileNumber}</p>
//           </div>
//         </div>
//         {data?.telephoneNumber.areaCode && data?.telephoneNumber.number && (
//           <div className="flex gap-3 items-center hover:bg-gray-100 p-3 rounded-lg transition-all duration-200">
//             <Phone className="text-myPrimary w-5 h-5" />
//             <div className="flex text-sm justify-between pr-5 w-full">
//               <p className=" text-gray-600">Telephone No:</p>
//               <p className="font-medium text-gray-800">
//                 {data?.telephoneNumbe.areaCode} - {data?.telephoneNumbe.number}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Email */}
//         <div className="flex gap-3 items-center hover:bg-gray-100 py-2 px-2 mt-1 rounded-lg transition-all duration-200">
//           <Send className="text-myPrimary w-5 h-5" />
//           <div className="text-sm">
//             <p className="text-gray-600">Email</p>
//             <p className="font-medium text-gray-800">{data?.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="px-6 py-4 pb-6">
//                   <h1 className="flex items-center gap-3 text-md font-semibold text-gray-800">
//                     Location Address
//                   </h1>

//                   <p className="mt-4 flex text-sm items-center gap-3 text-gray-800">
//                     <Business className="w-5 h-5 text-myPrimary" />
//                     {data?.address?.shopBuildingInfo}, {data?.address?.floorOrTower},
//                     {data?.address?.areaOrLocality}, {data?.address?.city},
//                     {data?.address?.state}
//                   </p>
//                   <p className="text-sm py-2">Landmark: {data?.address?.landmark}</p>
//                 </div>
//    </div>

//   );
// };

// export default ContactSection;

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Smartphone,
} from "lucide-react";

type Props = {
  data: any;
};

const ContactSection: React.FC<Props> = ({ data }) => {
  return (
    <Card className="overflow-hidden w-full border-none shadow-lg p-0">
      <CardTitle className="text-xl p-4 text-myPrimary font-semibold flex items-center">
        Contact Information
      </CardTitle>
      <CardContent className="p-6 space-y-4">
        {data?.mobileNumber && (
          <div className="flex items-center p-3 bg-green-50  transition-all hover:bg-green-100 rounded-lg duration-200 ">
            <Smartphone className="w-5 h-5 mr-3 text-green-600" />
            <div className="flex text-sm justify-between pr-5 w-full">
              <p className="text-sm text-[#4b5563]">Mobile No:</p>
              <p className="font-medium text-[#111827]">+91 - {data.mobileNumber}</p>
            </div>
          </div>
        )}

{data?.additionalMobileNumbers > 0 && data.additionalMobileNumbers.map((additionalNumber,index)=> {
  return (
     <div key={index} className="flex items-center p-3 bg-green-50  transition-all hover:bg-green-100 rounded-lg duration-200 ">
           <div className="flex items-center gap-1.5 mr-3">
    <Smartphone className="w-5 h-5 text-gray-800" />
    <span className="text-gray-600 font-medium">+</span>
  </div>
            <div className="flex text-sm justify-between pr-5 w-full">
              <p className="text-sm text-[#4b5563]">Mobile No:</p>
              <p className="font-medium text-[#111827]">+91 - {additionalNumber}</p>
            </div>
          </div>
  )
}

)
           
       
        }


        {data?.telephoneNumber?.areaCode && data?.telephoneNumber?.number && (
          <div className="flex items-center p-3 bg-green-50  transition-all hover:bg-green-100 rounded-lg duration-200">
            <Phone className="w-5 h-5 mr-3 text-green-600" />
            <div className="flex text-sm justify-between pr-5 w-full">
              <p className="text-sm text-[#4b5563]">Telephone No:</p>
              <p className="font-medium text-[#111827]">
                {data.telephoneNumber.areaCode} - {data.telephoneNumber.number}
              </p>
            </div>
          </div>
        )}
        {data?.email && (
          <div className="flex items-center p-3 bg-green-50  transition-all hover:bg-green-100 rounded-lg duration-200 ">
            <Mail className="w-5 h-5 mr-3 text-green-600" />
            <div className="text-sm">
              <p className="text-[#4b5563]">Email</p>
              <p className="font-medium text-[#111827]">{data.email}</p>
            </div>
          </div>
        )}
        
        {data?.whatsappNumber && (
          <div className="flex items-center p-3  bg-green-50  transition-all hover:bg-green-100 rounded-lg duration-200 ">
            <MessageCircle className="w-5 h-5 mr-3 text-green-600" />
            <div className="text-sm">
            <p className="text-[#4b5563]">Whatsapp</p>
              <span className="font-medium text-[#111827]">+91 - {data.whatsappNumber}</span>
            </div>
            
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSection;
