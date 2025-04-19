import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building, Edit, Landmark, MapPin, Navigation } from 'lucide-react';
import React, { FC } from 'react'
import { FaCity } from 'react-icons/fa';

type Props = {
    pharmacyInfo:any;
    handleSetRoute:any
}

const AddressSection:FC<Props> = ({pharmacyInfo,handleSetRoute}) => {
  return (
    <Card className="w-full bg-white shadow-lg p-6 rounded-xl">
    <div className="flex pb-2 gap-3">
      <h2 className="text-2xl font-semibold mb-4">Address</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSetRoute("Address")}
      >
        <Edit className="w-5 text-gray-500 h-5" />
      </Button>
    </div>

    <div className="space-y-2">
      {pharmacyInfo.address.shopBuildingInfo && (
        <div className="flex items-start space-x-3">
          <Building className="h-5 w-5 text-blue-500 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              Building
            </p>
            <p className="text-base">
              {pharmacyInfo.address.shopBuildingInfo}
            </p>
          </div>
        </div>
      )}

      {pharmacyInfo.address.floorOrTower && (
        <div className="flex items-start space-x-3">
          <Building className="h-5 w-5 text-blue-500 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              Floor/Tower
            </p>
            <p className="text-base">
              {pharmacyInfo.address.floorOrTower}
            </p>
          </div>
        </div>
      )}

      {pharmacyInfo.address.areaOrLocality && (
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 text-blue-500 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              Area/Locality
            </p>
            <p className="text-base font-semibold">
              {pharmacyInfo.address.areaOrLocality}
              <span className="text-red-500 ml-1">*</span>
            </p>
          </div>
        </div>
      )}

      {pharmacyInfo.address.landmark && (
        <div className="flex items-start space-x-3">
          <Landmark className="h-5 w-5 text-blue-500 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              Landmark
            </p>
            <p className="text-base">{pharmacyInfo.address.landmark}</p>
          </div>
        </div>
      )}

      {pharmacyInfo.address.city && (
        <div className="flex items-start space-x-3">
          <FaCity className="h-5 w-5 text-blue-500 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              City
            </p>
            <p className="text-base font-semibold">
              {pharmacyInfo.address.city}
              <span className="text-red-500 ml-1">*</span>
            </p>
          </div>
        </div>
      )}

      {pharmacyInfo.address.state && (
        <div className="flex items-start space-x-3">
          <Navigation className="h-5 w-5 text-blue-500 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground">
              State / Province
            </p>
            <p className="text-base font-semibold">
              {pharmacyInfo.address.state}
              <span className="text-red-500 ml-1">*</span>
            </p>
          </div>
        </div>
      )}
    </div>
  </Card>

  )
}

export default AddressSection