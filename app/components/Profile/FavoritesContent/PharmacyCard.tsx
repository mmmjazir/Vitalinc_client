// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// interface PharmacyCardProps {
//   pharmacy: {
//     id: number
//     name: string
//     address: string
//     image: string
//     rating: number
//   }
// }

// export function PharmacyCard({ pharmacy }: PharmacyCardProps) {
//   return (
//     <Card className="transition-all hover:shadow-md">
//       <CardHeader className="pb-2">
//         <div className="flex items-start gap-3">
//           <div className="h-16 w-16 overflow-hidden rounded-md">
//             <Image
//               src={pharmacy.image || "/placeholder.svg"}
//               alt={pharmacy.name}
//               width={80}
//               height={80}
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div>
//             <CardTitle className="text-base">{pharmacy.name}</CardTitle>
//             <CardDescription className="mt-1 text-xs">{pharmacy.address}</CardDescription>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pb-2">
//         <div className="flex items-center gap-1">
//           <span className="text-sm font-medium text-amber-500">★</span>
//           <span className="text-sm">{pharmacy.rating}</span>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button variant="outline" size="sm" className="w-full">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }



"use client"

import { Heart, MapPin, Clock, ChevronRight, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getBusinessHoursInfo } from "@/app/utils/BusinessHourStatus"
import Image from "next/image"

interface PharmacyCardProps {
  shopName: string
  address: {
    city: string
    areaOrLocality: string
  }
  averageRating: number
  reviewCount: number
  isFavorite?: boolean
  images?:{
    public_id:string
    url:string
  }
  onToggleFavorite?: () => void
  onViewDetails?: () => void
  slug:string
  todayHours:{
    isOpen:boolean;
    startTime?:string;
    endTime?:string;
  }
}

export default function PharmacyCard({
  shopName,
  address,
  averageRating,
  reviewCount,
  onToggleFavorite,
  slug,
  images,
  todayHours
}: PharmacyCardProps) {
  

  const { isCurrentlyOpen, displayStatus, closingSoon, fullTimeString } = getBusinessHoursInfo(todayHours);


  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 >= 0.3 && averageRating % 1 < 0.8
  const hasFullStar = averageRating % 1 >= 0.8

  return (
    <Card className="max-w-[17rem] overflow-hidden transition-all hover:shadow-md border border-gray-100 rounded-xl hover:-translate-y-1 duration-300 font-sans">
      <div className="relative">
        {/* Modern Pharmacy Illustration */}
      {images?.url ? (
          <div className="aspect-[18/10]">
            <Image
            src={images.url}
            alt={shopName}
            fill
            className="object-cover rounded-t-xl"
            />
          </div>
      ): (
         <div className="h-40 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center overflow-hidden">
          <div className="relative">
            {/* Abstract pharmacy symbol */}
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-white/10"></div>

            <div className="relative z-10 bg-white/20 w-24 h-24 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <div className="w-16 h-16 rounded-lg bg-white/90 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#166534" strokeWidth="2" />
                  <path d="M12 7V17" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 12H17" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
       

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          aria-label={"Remove from favorites"}
        >
          <Heart className={`h-4 w-4 fill-red-500 text-red-500`} />
        </button>
      </div>

      <CardContent className="pt-5">
        <div className="space-y-4">
          {/* Pharmacy Name */}
          <h3 className="font-bold text-xl tracking-tight">{shopName}</h3>

          {/* Modern Rating Display with Stars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex">
                {/* Render stars based on rating */}
                {[...Array(5)].map((_, i) => {
                  if (i < fullStars) {
                    return <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  } else if (i === fullStars && hasHalfStar) {
                    // Custom half-star SVG
                    return (
                      <div key={i} className="w-4 h-4 relative">
                        <Star className="absolute w-4 h-4 text-gray-300" />
                        <div className="absolute w-2 h-4 overflow-hidden">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                    )
                  } else if (i === fullStars && hasFullStar) {
                    return <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  } else {
                    return <Star key={i} className="w-4 h-4 text-gray-300" />
                  }
                })}
              </div>
              <span className="font-semibold text-sm">{averageRating}</span>
            </div>
            <Badge variant="secondary" className="font-medium text-xs bg-gray-100 hover:bg-gray-100">
              {reviewCount} reviews
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span className="text-sm font-medium">
              {address.areaOrLocality}, {address.city}
            </span>
          </div>

          {/* Open/Closed Status */}
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <div className="flex flex-col">
              {isCurrentlyOpen ? (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 rounded-full px-3">
                  Open Now
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 rounded-full px-3">
                  Closed
                </Badge>
              )}
              
              {/* User-friendly status display */}
              <span 
                className={`text-xs mt-1 ${closingSoon ? 'text-red-500 font-medium' : 'text-gray-500'}`}
              >
                {displayStatus}
              </span>
              
              {/* Full hours display on hover */}
              <span className="text-xs text-gray-400 hidden group-hover:block">{fullTimeString}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link
        className="w-full"
        href={`pharmacy/${slug}`}
        >
        <Button
          className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <span>More Details</span>
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Button> 
        </Link>
      </CardFooter>
    </Card>
  )
}

