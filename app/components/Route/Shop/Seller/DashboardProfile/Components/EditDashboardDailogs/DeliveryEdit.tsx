'use client'

import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, CreditCard, Clock } from "lucide-react"
import { useUpdatePharmacyDeliveryMutation } from '@/redux/features/pharmacy/pharmacyApi'
import toast from 'react-hot-toast'

type Props = {
  setOpen: (open: boolean) => void;
  refetch: () => void;
  pharmacyInfo: {
    id:string,
    delivery: {
      available: boolean;
      distance?: number;
      charge?: number;
      time?: number;
    };
  };
}

const DeliveryEdit =({ setOpen, refetch, pharmacyInfo }: Props)=> {
  const [updatePharmacyDelivery, {isSuccess,error,data,isLoading}] = useUpdatePharmacyDeliveryMutation();

  const [available, setAvailable] = useState(pharmacyInfo.delivery.available)
  const [distance, setDistance] = useState(pharmacyInfo.delivery.distance || 0)
  const [charge, setCharge] = useState(pharmacyInfo.delivery.charge || 0)
  const [time, setTime] = useState(pharmacyInfo.delivery.time || 0)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    let delivery;
    if (available) {
      delivery = { available, distance, charge, time };
    } else {
      delivery = { available };
    }
    await updatePharmacyDelivery({id:pharmacyInfo.id,data:delivery})
  }


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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="delivery-toggle" className="text-lg">Delivery Available</Label>
        <Switch 
          id="delivery-toggle" 
          checked={available} 
          onCheckedChange={setAvailable}
          className='bg-gray-400'
        />
      </div>

      {available && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <Label htmlFor="distance" className="flex-grow">Max Distance (km)</Label>
            <Input 
              id="distance" 
              type="number" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-24"
            />
          </div>

          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-green-500" />
            <Label htmlFor="charge" className="flex-grow">Delivery Charge (₹)</Label>
            <Input 
              id="charge" 
              type="number" 
              value={charge} 
              onChange={(e) => setCharge(Number(e.target.value))}
              className="w-24"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <Label htmlFor="time" className="flex-grow">Estimated Time (minutes)</Label>
            <Input 
              id="time" 
              type="number" 
              value={time} 
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button className='text-white' type="submit">Save Changes</Button>
      </div>
    </form>
  )
}


export default DeliveryEdit