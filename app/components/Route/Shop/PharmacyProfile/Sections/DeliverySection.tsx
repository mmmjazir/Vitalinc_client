// import { FaClock, FaMapMarkerAlt, FaRupeeSign, FaTruck } from "react-icons/fa";
// import { MdDeliveryDining } from "react-icons/md";

// type Props = {
//     delivery:any
// }

// const DeliverySection = ({delivery}: Props) => {


//     return (
//     <div className="pt-5 pb-8 p-3 px-6 w-full border-b">
//                   <h3 className="text-lg flex items-center gap-2 text-gray-600 font-medium mb-5">
//                     Delivery Options
//                   </h3>
//                   <div className="space-y-4">
//                     {/* Redesigned Delivery Option Card */}
//                     <div className="flex items-center w-fit px-[3rem] bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
//                       <div className="flex items-center gap-6">
//                         <div className="flex items-center justify-center bg-myPrimary text-white w-10 h-10 rounded-full">
//                           <MdDeliveryDining size={20} />
//                         </div>
//                         <div>
//                           <h4 className="text-base font-semibold text-gray-800 mb-2">
//                             Home Delivery
//                           </h4>
//                           <div className="space-y-2 text-md text-gray-600">
//                             <p className="flex items-center gap-2">
//                               <span className="flex items-center gap-1">
//                                 <FaMapMarkerAlt className="text-gray-500" />
//                                 Distance:
//                               </span>
//                               {delivery?.distance} kms
//                             </p>
//                             <p className="flex items-center gap-2">
//                               <span className="flex items-center gap-1">
//                                 <FaRupeeSign className="text-gray-500" />
//                                 Charge:
//                               </span>
//                               ₹{delivery?.charge}
//                             </p>
//                             <p className="flex items-center gap-2">
//                               <span className="flex items-center gap-1">
//                                 <FaClock className="text-gray-500" />
//                                 Time:
//                               </span>
//                               {delivery?.time} minutes
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//   )
// }

// export default DeliverySection



// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Truck, Clock, DollarSign } from "lucide-react"

// const DeliverySection = ({ delivery }) => {
//   if (!delivery.available) return null

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Truck className="w-5 h-5 mr-2" />
//           Delivery Information
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex items-center">
//           <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
//           <span>Delivery Charge: ${delivery.charge.toFixed(2)}</span>
//         </div>
//         <div className="flex items-center">
//           <Clock className="w-5 h-5 mr-2 text-gray-500" />
//           <span>Estimated Delivery Time: {delivery.time} minutes</span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default DeliverySection
import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, DollarSign, MapPin } from "lucide-react"

type DeliveryData = {
  available: boolean
  charge: number
  time: number
  distance: number
}

type Props = {
  delivery: DeliveryData
}

const DeliverySection: React.FC<Props> = ({ delivery }) => {
  if (!delivery.available) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden shadow-lg">
          <CardTitle className="text-xl p-4 font-semibold text-myPrimary font-Arimo flex items-center">
            Delivery Info
          </CardTitle>
          <CardContent className="p-6 grid grid-cols-3 max-md:grid-cols-2 gap-4">
  <div className="flex items-center p-3 rounded-lg bg-green-50  transition-all duration-200 hover:bg-green-100">
    <DollarSign className="w-5 h-5 mr-3 text-green-600" />
    <div className="flex-1">
      <p className="text-sm text-gray-600">Delivery Charge</p>
      <p className="font-medium text-gray-800">₹{delivery.charge.toFixed(2)}</p>
    </div>
  </div>
  <div className="flex items-center p-3 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100">
    <Clock className="w-5 h-5 mr-3 text-green-600" />
    <div className="flex-1">
      <p className="text-sm text-gray-600">Estimated Time</p>
      <p className="font-medium text-gray-800">{delivery.time} minutes</p>
    </div>
  </div>
  <div className="flex items-center p-3 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100">
    <MapPin className="w-5 h-5 mr-3 text-green-600" />
    <div className="flex-1">
      <p className="text-sm text-gray-600">Distance</p>
      <p className="font-medium text-gray-800">{delivery.distance} km</p>
    </div>
  </div>
</CardContent>

      </Card>
    </motion.div>
  )
}

export default DeliverySection

