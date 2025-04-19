import { cn } from '@/lib/utils';
import { Heart, MapPin, Package2, Pill, Info } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

type StaticMedicineCardProps = {
  data: any;
  handleToggleFavorite?:any;
}

const StaticMedicineCard: React.FC<StaticMedicineCardProps> = ({ data, handleToggleFavorite }) => {
   const [imageError, setImageError] = useState(false);
 
 
  return (
    <div
      className={cn(
        "md:w-[235px] max-md:w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300",
        "flex flex-col",
      )}
    >
      <div className="relative h-[180px] rounded-t-lg overflow-hidden bg-gray-50">
        {data.prescriptionRequired && (
          <div className="absolute top-2 left-0 z-10 bg-red-500/90 backdrop-blur-sm text-white 
                         px-2 py-1 rounded-r-md text-[11px] font-medium flex items-center gap-1">
            <Pill size={12} />
            Rx Required
          </div>
        )}

        <button
          className="absolute top-2 right-2 z-10 p-1.5 group bg-white/80 backdrop-blur-sm rounded-full
                     hover:bg-white transition-colors shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart
           className={`w-4 h-4 transition-colors group-hover:text-red-500 ${
            data.isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
          />
        </button>

        <div className="block h-full">
          {data.image_Url && !imageError ? (
            <div className="relative rounded-md w-full h-full transition-transform duration-300">
              <Image
                src={data.image_Url.primary || data.image_Url.secondary}
                alt={data.name} 
                fill
                className="object-contain"
                sizes="280px"
                priority={false}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package2 className="w-10 h-10 text-gray-300" />
            </div>
          )}
        </div>
      </div>

      <div className={cn("flex flex-col gap-2 p-3")}>
        {data?.shopName && (
          <div
            className="flex items-center hover:scale-105 transition-all duration-300 justify-between py-1 px-2 bg-teal-50/50 rounded-md 
                 hover:bg-teal-50 "
          >
            <span className={`text-sm font-medium text-teal-700 truncate ${data.distance && 'max-w-[140px]'} `}>
              {data.shopName}
            </span>
            {data.distance && (
              <span className="text-[13px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                {data.distance > 500
                  ? `${(data.distance / 1000).toFixed(1)}km`
                  : `${data.distance}m`}
              </span>
            )}
          </div>
        )}

        <div  className="" title={data.name}>
          <h3 className="font-medium text-gray-900 text-md leading-tight hover:text-teal-600 transition-colors line-clamp-2">
            {data.name}
          </h3>
        </div>

        
         <div className="space-y-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-gray-500">MRP:</span>
              <span className="text-sm text-gray-500 line-through">
                ₹{data.price}
              </span>
              <span className="text-xs font-semibold text-green-600">
                15% OFF
              </span>
            </div>
            <div className="text-lg font-bold text-gray-600">
              ₹{data.price - 10}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <div
              className="flex-1 cursor-pointer bg-teal-600 text-white py-1.5 px-3 rounded-md text-sm font-medium 
                        text-center hover:bg-teal-700 transition-colors"
            >
              View Details
            </div>

              <div
                className="p-1.5 cursor-pointer bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                aria-label="View on Google Maps"
              >
                <MapPin size={18} />
              </div>
            
          </div>
      </div>
    </div>
  )
}

export default StaticMedicineCard