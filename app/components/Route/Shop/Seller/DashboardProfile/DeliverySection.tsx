import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, CreditCard, Edit, MapPin } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    pharmacyInfo:any;
    handleSetRoute:any
}

const DeliverySection:FC<Props> = ({pharmacyInfo,handleSetRoute}) => {
  return (
      <Card className="p-6 h-fit bg-white shadow-lg rounded-xl">
                 <div className="flex justify-between items-center mb-4">
                   <h2 className="text-2xl font-semibold">Delivery Options</h2>
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => handleSetRoute("delivery")}
                   >
                     <Edit className="w-5 h-5 text-gray-500" />
                   </Button>
                 </div>
                 {pharmacyInfo.delivery.available ? (
                   <div className="space-y-4">
                     {pharmacyInfo.delivery.distance && (
                       <div className="flex items-center">
                         <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                         <span className="font-medium">Max Distance:</span>
                         <span className="ml-2">
                           {pharmacyInfo.delivery.distance} km
                         </span>
                       </div>
                     )}
                     {pharmacyInfo.delivery.charge && (
                       <div className="flex items-center">
                         <CreditCard className="w-5 h-5 text-green-500 mr-2" />
                         <span className="font-medium">Delivery Charge:</span>
                         <span className="ml-2">
                           ₹{pharmacyInfo.delivery.charge}
                         </span>
                       </div>
                     )}
                     {pharmacyInfo.delivery.time && (
                       <div className="flex items-center">
                         <Clock className="w-5 h-5 text-orange-500 mr-2" />
                         <span className="font-medium">Estimated Time:</span>
                         <span className="ml-2">
                           {pharmacyInfo.delivery.time} minutes
                         </span>
                       </div>
                     )}
                   </div>
                 ) : (
                   <div className="text-center py-4">
                     <p className="text-gray-600">
                       Delivery service is currently not offered.
                     </p>
                   </div>
                 )}
               </Card>
  )
}

export default DeliverySection