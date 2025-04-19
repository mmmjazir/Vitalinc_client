"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Package2, Pill, Info, Package } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MedicineData {
  _id: string;
  name: string;
  slug:string;
  genericName: string;
  description: string;
  haveVariant: boolean;
  prescriptionRequired: boolean;
  productForm: string;
  container: string;
  category: string;
  marketer: string;
  images: {
    mainImage: { url: string };
    additionalImages: { url: string }[];
  };
  packSize?: Array<{
    quantity: string;
    listPrice: number;
    sellingPrice:number;
    isAvailable: boolean;
  }>;
  shopId: string;
  shopSlug:string;
  shopName: string;
  coordinates: [number, number];
  distance?: number;
  listPrice?: number;
  sellingPrice?:number;
  quantity?: string;
  isFavorite: boolean;
  selectedPackSize:any;
  packSizeAvailable:number;
}

interface MedicineCardProps {
  data: MedicineData;
  className?: string;
  handleToggleFavorite?:any;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ data, className, handleToggleFavorite }) => {
  const [imageError, setImageError] = useState(false);


  const getPriceAndPackageInfo = () => {
    if (data.haveVariant && data.selectedPackSize) {
      const selectedVariant = data.selectedPackSize;
      return {
        listPrice: selectedVariant.listPrice,
        sellingPrice:selectedVariant.sellingPrice,
        packageInfo: `${data.container} of ${selectedVariant.quantity} ${data.productForm}s`,
        availableVariantsCount: data.packSizeAvailable - 1
      };
    }
    
    return {
      listPrice: data.listPrice,
      sellingPrice:data.sellingPrice,
      packageInfo: data.quantity
        ? `${data.container} of ${data.quantity} ${data.productForm}s`
        : 'Package information unavailable',
      availableVariantsCount: 0
    };
  };
  const { listPrice,sellingPrice, packageInfo, availableVariantsCount } = getPriceAndPackageInfo() as any;
 

  const calculateDiscountPercentage = Math.round(((listPrice - sellingPrice) / listPrice) * 100);

  
  return (
    <div
      className={cn(
        "md:w-[250px] max-md:w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300",
        "flex flex-col"
      )}
    >
      <div className="relative h-[150px] rounded-t-lg overflow-hidden bg-gray-50">
        {data.prescriptionRequired && (
          <div
            className="absolute top-2 left-0 z-10 bg-red-500/90 backdrop-blur-sm text-white 
                         px-2 py-1 rounded-r-md text-[11px] font-medium flex items-center gap-1"
          >
            <Pill size={12} />
            Rx Required
          </div>
        )}

        <button
          className="absolute top-2 right-2 z-10 p-1.5 group bg-white/80 backdrop-blur-sm rounded-full
                     hover:bg-white transition-colors shadow-sm"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavorite({ medicineId: data._id });
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors group-hover:text-red-500 ${
              data.isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>

        <Link href={`/medicines/${data.slug}`} className="block h-full">
          {data.images?.mainImage?.url && !imageError ? (
            <div className="relative rounded-md w-full h-full transition-transform duration-300">
              <Image
                src={data.images.mainImage.url}
                alt={data.name}
                fill
                className="object-cover"
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
        </Link>
      </div>

      <div className={cn("flex flex-col gap-2 p-2", className)}>
        {data?.shopName && (
          <Link
            href={`/pharmacy/${data.shopSlug}`}
            className="flex items-center hover:scale-105 transition-all duration-300 justify-between py-1 px-2 bg-teal-50/50 rounded-md 
                 hover:bg-teal-50 "
          >
            <span
              className={`text-sm font-medium text-teal-700 truncate ${
                data.distance && "max-w-[140px]"
              } `}
            >
              {data.shopName}
            </span>
            {data.distance && (
              <span className="text-[13px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                {data.distance > 500
                  ? `${(data.distance / 1000).toFixed(1)}km`
                  : `${data.distance}m`}
              </span>
            )}
          </Link>
        )}

        <Link href={`/medicines/${data.slug}`} className="" title={data.name}>
          <h3 className="font-medium min-h-[2.6em] text-gray-900 text-md leading-tight hover:text-teal-600 transition-colors line-clamp-2">
            {data.name}
          </h3>
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Package2 size={12} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-600 truncate">
                {packageInfo}
              </span>
            </div>
            {data.haveVariant && availableVariantsCount > 0 && (
              <div className="flex items-center gap-1">
                <Package size={12} className="text-teal-500 flex-shrink-0" />
                <span className="text-xs text-teal-600">
                  {`+${availableVariantsCount} more sizes available`}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-xs text-muted-foreground">MRP:</span>
          <span className="text-lg font-semibold text-foreground">
            ₹{sellingPrice}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{listPrice}
          </span>
          <span className="text-[0.72rem] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {calculateDiscountPercentage}% OFF
          </span>
        </div>

        <div className="flex gap-2 mt-2">
          <Link
            href={`/medicines/${data.slug}`}
            className="flex-1 bg-teal-600 text-white py-1.5 px-3 rounded-md text-sm font-medium 
                        text-center hover:bg-teal-700 transition-colors"
          >
            View Details
          </Link>

          {data.coordinates?.length === 2 && (
            <a
              href={`https://www.google.com/maps?q=${data.coordinates[1]},${data.coordinates[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
              aria-label="View on Google Maps"
            >
              <MapPin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;

