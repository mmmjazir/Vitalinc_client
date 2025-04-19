import React from "react";

const MedicineCardSkeleton: React.FC = ({ shopDetails }: any) => {
  return (
    <div className="w-[250px] bg-white rounded-lg shadow-md animate-pulse">
      {/* Image Container */}
      <div className="relative h-[180px] rounded-t-lg bg-gray-200">
        {/* Prescription Badge Placeholder */}
        <div className="absolute top-2 left-0 w-20 h-5 bg-gray-300 rounded-r-md"></div>
        {/* Wishlist Button Placeholder */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-2 p-3">
        {/* Shop Info */}
        {shopDetails && (
          <div className="flex items-center justify-between py-1 px-2 bg-gray-200 rounded-md">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        )}

        {/* Medicine Name */}
        <div className="h-10 bg-gray-200 rounded w-full"></div>

        <div className="flex-1 flex flex-col justify-between">
          {/* Package Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            {/* Variant Info (optional) */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1.5">
            <div className="h-3 bg-gray-200 rounded w-8"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-8 bg-gray-200 rounded-md"></div>
         {shopDetails && <div className="w-8 h-8 bg-gray-200 rounded-md"></div>}
        </div>
      </div>
    </div>
  );
};

export default MedicineCardSkeleton;
