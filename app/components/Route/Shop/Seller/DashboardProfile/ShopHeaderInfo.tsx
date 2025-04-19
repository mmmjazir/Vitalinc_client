// import React, { useEffect, useState } from "react";
// import ImageUploadDialog from "./Components/ImageUploadDialog";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Edit,
//   Heart,
//   ImageIcon,
//   Star,
//   X,
// } from "lucide-react";
// import { useUpdatePharmacyNameMutation } from "@/redux/features/pharmacy/pharmacyApi";
// import toast from "react-hot-toast";
// import { Input } from "@/components/ui/input";

// type Props = {
//   images: any[];
//   shopName: string;
//   pharmacyInfo: any;
//   refetch: () => void;
//   shop: any;
//   setPharmacyInfo: any;
// };

// const ShopHeaderInfo = ({
//   images,
//   shopName,
//   shop,
//   pharmacyInfo,
//   setPharmacyInfo,
//   refetch,
// }: Props) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [
//     updatePharmacyName,
//     { isSuccess, isLoading: pharmacyNameUpdating, data, error },
//   ] = useUpdatePharmacyNameMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       const message = data?.message;
//       toast.success(message);
//       refetch();
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   useEffect(() => {
//     // Reset current index if images change
//     if (images.length > 0 && currentIndex >= images.length) {
//       setCurrentIndex(0);
//     }
//   }, [images, currentIndex]);

//   const goToPrevious = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = () => {
//     const isLastSlide = currentIndex === images.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToSlide = (slideIndex: number) => {
//     setCurrentIndex(slideIndex);
//   };

//   const formatNumber = (num: number) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
//     }
//     return num;
//   };

//   const handleUpdatePharmacyName = async () => {
//     const shopName = pharmacyInfo.shopName;
//     await updatePharmacyName({ id: pharmacyInfo.id, data: { shopName } });
//     setIsEditing(false);
//   };
//   const handleEditName = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className={`relative mb-8 w-full h-[400px] ${
//         images.length > 0 ? "md:h-[500px] " : "md:h-[350px]"
//       }  rounded-xl overflow-hidden`}
//     >
//       {/* Main carousel image */}
//       <div className="relative w-full h-full">
//         {images && images.length > 0 ? (
//           <Image
//             src={images[currentIndex]?.url || "/placeholder.svg"}
//             alt={`Shop Image ${currentIndex + 1}`}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
//             className={`transition-opacity duration-500 ${
//               isLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               objectFit: "contain",
//               objectPosition: "center",
//               backgroundColor: "rgba(0,0,0,0.7)",
//             }}
//             onLoad={() => setIsLoaded(true)}
//             priority
//           />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
//             <ImageIcon
//               strokeWidth={1}
//               className="h-32 w-32 text-gray-400 mb-4"
//             />
//             <p className="text-gray-300 text-lg font-medium">
//               No images available
//             </p>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gray-700 bg-opacity-30"></div>

//         {/* Navigation arrows */}
//         {images && images.length > 1 && (
//           <div className="absolute inset-0 flex items-center justify-between p-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50"
//               onClick={goToPrevious}
//             >
//               <ChevronLeft className="h-8 w-8" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50"
//               onClick={goToNext}
//             >
//               <ChevronRight className="h-8 w-8" />
//             </Button>
//           </div>
//         )}
//         {/* Shop name overlay */}

//         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center justify-between">
//               {/* <h1 className="max-md:text-2xl md:text-4xl font-bold text-white">
//                 {shopName}
//               </h1> */}

//               <div className="flex items-center gap-4 mb-2">
//                 {isEditing ? (
//                   <div className="flex items-center gap-2">
//                     <Input
//                       value={pharmacyInfo.shopName}
//                       onChange={(e) =>
//                         setPharmacyInfo((previous: any) => ({
//                           ...previous,
//                           shopName: e.target.value,
//                         }))
//                       }
//                       className="text-3xl h-10 outline-none border border-b-2 ring-offset-transparent ring-transparent font-bold bg-transparent text-white"
//                     />
//                     <Button
//                       disabled={!pharmacyInfo.shopName}
//                       size="sm"
//                       className="bg-myPrimarys hover:bg-myPrimary"
//                       onClick={handleUpdatePharmacyName}
//                     >
//                       <Check className="w-4 h-4 text-white" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="bg-red-500 hover:bg-red-600"
//                       onClick={handleCancelEdit}
//                     >
//                       <X className="w-4 h-4 text-white" />
//                     </Button>
//                   </div>
//                 ) : (
//                   <h1 className="text-3xl text-gray-100 h-10 font-bold">
//                     {pharmacyInfo.shopName}
//                   </h1>
//                 )}
//                 {!isEditing && (
//                   <Button variant="ghost" size="sm" onClick={handleEditName}>
//                     <Edit className="w-5 h-5 text-white" />
//                   </Button>
//                 )}
//               </div>

//               <div
//                 className={`flex items-center cursor-pointer py-1.5 gap-1.5 rounded-full px-4 max-md:px-3 max-md:py-1 max-md:gap-1 transition-all ${
//                   shop?.favoritesCount > 0
//                     ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
//                     : "bg-gray-400/20 text-gray-500 hover:bg-gray-400/30"
//                 }`}
//               >
//                 <Heart
//                   className={`h-5 w-5 max-md:h-4 max-md:w-4 ${
//                     shop?.favoritesCount > 0 ? "fill-red-500" : "fill-gray-500"
//                   }`}
//                 />
//                 <span className="font-medium text-sm md:tracking-wider max-md:text-xs font-Outfit whitespace-nowrap">
//                   {formatNumber(shop?.favoritesCount)}{" "}
//                   {shop?.favoritesCount === 1 ? "Favorite" : "Favorites"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
//               <div className="flex items-center gap-1.5">
//                 <div className="flex">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       className={`h-4 w-4 ${
//                         star <= shop?.averageRating
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-white font-medium">
//                   {shop?.averageRating}
//                 </span>
//                 <span className="text-white/70 text-sm">
//                   ({shop?.reviewCount} reviews)
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dots navigation */}

//         <div className="absolute bottom-24 left-0 right-0">
//           <div className="flex justify-center gap-2">
//             {images.map((_, slideIndex) => (
//               <div
//                 key={slideIndex}
//                 onClick={() => goToSlide(slideIndex)}
//                 className={`cursor-pointer w-3 h-3 rounded-full ${
//                   slideIndex === currentIndex ? "bg-white" : "bg-white/50"
//                 }`}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopHeaderInfo;


import React, { useEffect, useState } from "react";
import ImageUploadDialog from "./Components/ImageUploadDialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  Heart,
  ImageIcon,
  Star,
  X,
} from "lucide-react";
import { useUpdatePharmacyNameMutation } from "@/redux/features/pharmacy/pharmacyApi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

type Props = {
  images: any[];
  shopName: string;
  pharmacyInfo: any;
  refetch: () => void;
  shop: any;
  setPharmacyInfo: any;
};

const ShopHeaderInfo = ({
  images,
  shopName,
  shop,
  pharmacyInfo,
  setPharmacyInfo,
  refetch,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [
    updatePharmacyName,
    { isSuccess, isLoading: pharmacyNameUpdating, data, error },
  ] = useUpdatePharmacyNameMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    // Reset current index if images change
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  const handleUpdatePharmacyName = async () => {
    const shopName = pharmacyInfo.shopName;
    await updatePharmacyName({ id: pharmacyInfo.id, data: { shopName } });
    setIsEditing(false);
  };
  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`relative mb-8 w-full h-[400px] ${
        images.length > 0 ? "md:h-[500px] " : "md:h-[350px]"
      }  rounded-xl overflow-hidden`}
    >
      {/* Main carousel image */}
      <div className="relative w-full h-full">
        {images && images.length > 0 ? (
          <Image
            src={images[currentIndex]?.url || "/placeholder.svg"}
            alt={`Shop Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className={`transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
            onLoad={() => setIsLoaded(true)}
            priority
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
            <ImageIcon
              strokeWidth={1}
              className="h-32 w-32 text-gray-400 mb-4"
            />
            <p className="text-gray-300 text-lg font-medium">
              No images available
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gray-700 bg-opacity-30"></div>

        {/* Navigation arrows */}
        {images && images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        )}
        
        {/* Shop name overlay with improved responsiveness */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex flex-col gap-2">
            {/* Shop name and favorite section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
              {/* Shop name with edit functionality */}
              <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
                {isEditing ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Input
                      value={pharmacyInfo.shopName}
                      onChange={(e) =>
                        setPharmacyInfo((previous: any) => ({
                          ...previous,
                          shopName: e.target.value,
                        }))
                      }
                      className="text-xl sm:text-2xl md:text-3xl h-10 outline-none border border-b-2 ring-offset-transparent ring-transparent font-bold bg-transparent text-white w-full sm:w-auto"
                    />
                    <div className="flex flex-shrink-0">
                      <Button
                        disabled={!pharmacyInfo.shopName}
                        size="sm"
                        className="bg-myPrimarys hover:bg-myPrimary"
                        onClick={handleUpdatePharmacyName}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 ml-1"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-bold break-words">
                      {pharmacyInfo.shopName}
                    </h1>
                    {!isEditing && (
                      <Button variant="ghost" size="sm" onClick={handleEditName} className="flex-shrink-0">
                        <Edit className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Favorites counter */}
              <div
                className={`flex items-center cursor-pointer py-1.5 gap-1.5 rounded-full px-4 max-md:px-3 max-md:py-1 max-md:gap-1 transition-all flex-shrink-0 self-start sm:self-center mt-1 sm:mt-0 ${
                  shop?.favoritesCount > 0
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                    : "bg-gray-400/20 text-gray-500 hover:bg-gray-400/30"
                }`}
              >
                <Heart
                  className={`h-4 w-4 md:h-5 md:w-5 ${
                    shop?.favoritesCount > 0 ? "fill-red-500" : "fill-gray-500"
                  }`}
                />
                <span className="font-medium text-xs sm:text-sm md:tracking-wider font-Outfit whitespace-nowrap">
                  {formatNumber(shop?.favoritesCount)}{" "}
                  {shop?.favoritesCount === 1 ? "Favorite" : "Favorites"}
                </span>
              </div>
            </div>

            {/* Rating section with better responsiveness */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        star <= shop?.averageRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white text-sm sm:text-base font-medium">
                  {shop?.averageRating}
                </span>
                <span className="text-white/70 text-xs sm:text-sm">
                  ({shop?.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots navigation - moved up slightly for better visibility on mobile */}
        <div className="absolute bottom-20 sm:bottom-24 left-0 right-0">
          <div className="flex justify-center gap-2">
            {images.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`cursor-pointer w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  slideIndex === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeaderInfo;

