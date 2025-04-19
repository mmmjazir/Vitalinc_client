// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// interface MedicineCardProps {
//   medicine: {
//     id: number
//     name: string
//     brand: string
//     image: string
//     price: string
//   }
// }

// export function MedicineCard({ medicine }: MedicineCardProps) {
//   return (
//     <Card className="transition-all hover:shadow-md">
//       <CardHeader className="pb-2">
//         <div className="flex items-start gap-3">
//           <div className="h-16 w-16 overflow-hidden rounded-md">
//             <Image
//               src={medicine.image || "/placeholder.svg"}
//               alt={medicine.name}
//               width={80}
//               height={80}
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div>
//             <CardTitle className="text-base">{medicine.name}</CardTitle>
//             <CardDescription className="mt-1 text-xs">{medicine.brand}</CardDescription>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pb-2">
//         <div className="text-sm font-medium">{medicine.price}</div>
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

import { Heart, Info, Pill, Package } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

interface PackSize {
  id: string
  size: string
  sellingPrice: number
  listPrice: number
  inStock: boolean
}

interface MedicineCardProps {
  _id: string
  name: string
  genericName: string
  haveVariant: boolean
  prescriptionRequired: boolean
  container: string
  productForm: string
  images:{
    mainImage:{
      public_id:string
      url:string
    }
  }
 quantity?: string
 sellingPrice?: number
 listPrice?: number
 isAvailable?: boolean
 selectedPackSize?: {
  quantity: string
  sellingPrice: number
  listPrice: number
  isAvailable: boolean
}
packSizeAvailable?: number
slug: string
  packSizes: PackSize[]
  imageUrl?: string
  onToggleFavorite: (id: string) => void
  onMoreInfo: (id: string) => void
}

export default function MedicineCard({
  _id,
  name,
  genericName,
  packSizes,
  haveVariant,
  container,
  productForm,
  images,
  quantity,
  sellingPrice,
  listPrice,
  prescriptionRequired,
  isAvailable,
  selectedPackSize,
  packSizeAvailable,
  imageUrl,
  onToggleFavorite,
  slug
}: MedicineCardProps) {
  // Always display the first pack size, even if it's out of stock
  // const firstPackSize = packSizes[0]

  // Check if there are any in-stock pack sizes
  // const anyInStock = packSizes.some((pack) => pack.inStock)

  // // Only show multiple pack sizes if there are more than one AND at least one is in stock
  // // (or if the only in-stock one is not the first one)
  // const shouldShowMoreSizes =
  //   packSizes.length > 1 && anyInStock && (!firstPackSize.inStock || packSizes.filter((p) => p.inStock).length > 1)

  // // The product is in stock if any pack size is in stock
  // const isInStock = anyInStock

const packSizeLabel = haveVariant ? 
`${container} of ${selectedPackSize?.quantity} ${productForm}` :
 `${container} of ${quantity} ${productForm}`
  
 const calculateDiscountPercentage = haveVariant ? Math.round(((selectedPackSize.listPrice - selectedPackSize.sellingPrice) / selectedPackSize.listPrice) * 100)  : Math.round(((listPrice - sellingPrice) / listPrice) * 100);


  return (
    <Card className="overflow-hidden border border-gray-50 transition-all hover:shadow-md shadow-sm rounded-xl h-[345px] flex flex-col">
      <div className="relative">
        <div className="aspect-[18/10] max-md:aspect-[18/10] border-b-2 relative bg-gray-50">
          {images.mainImage.url ? (
            <Image
              src={images.mainImage.url}
              alt={name}
              fill
              className={`object-cover rounded-t-xl ${
                (haveVariant ? !selectedPackSize?.isAvailable : !isAvailable)
                  ? "grayscale opacity-70"
                  : ""
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                (haveVariant ? selectedPackSize?.isAvailable : isAvailable)
                  ? "bg-blue-50"
                  : "bg-gray-100"
              }`}
            >
              <Pill
                className={`h-12 w-12 ${
                  (haveVariant ? selectedPackSize?.isAvailable : isAvailable)
                    ? "text-blue-300"
                    : "text-gray-300"
                }`}
              />
            </div>
          )}

          <button
            onClick={() => onToggleFavorite(_id)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
            aria-label={"Remove from favorites"}
          >
            <Heart className={`h-4 w-4 fill-rose-500 text-rose-500`} />
          </button>

          {prescriptionRequired && (
            <Badge
              variant="outline"
              className="absolute top-3 left-3 text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 rounded-full"
            >
              Rx
            </Badge>
          )}

          {(haveVariant ? selectedPackSize?.isAvailable : isAvailable) ? (
            <Badge className="absolute bottom-3 left-3 bg-green-500 hover:bg-green-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
              In Stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="absolute bottom-3 left-3 bg-white text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded-full border-gray-200"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-3 flex-grow flex flex-col">
        {/* Product name and generic name - always visible */}
        <div className="mb-3">
          <h3 className="font-semibold text-sm line-clamp-1 text-gray-800">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{genericName}</p>
        </div>

        {/* Pack size section - fixed height */}
        <div className="mb-auto">
          {/* Pack size - always visible */}
          <div className="text-xs font-semibold text-gray-600 mb-1.5">{packSizeLabel}</div>
         
        </div>

        {/* Price section - always at the bottom of content */}
        <div className="mt-auto mb-1">
          {/* <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-gray-900">
              ₹{haveVariant ? selectedPackSize?.sellingPrice : sellingPrice}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ₹{haveVariant ? selectedPackSize?.listPrice : listPrice}
            </span>
          </div>  */}
  <div className="h-6">
            {packSizeAvailable && packSizeAvailable > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 rounded-full flex items-center gap-1 w-fit"
              >
                <Package className="h-2.5 w-2.5" />
                {packSizeAvailable === 2
                  ? "+1 more size available"
                  : packSizeAvailable > 2 &&
                    `+${packSizeAvailable - 1} more sizes available`
                }
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-xs text-muted-foreground">MRP:</span>
          <span className="text-lg font-semibold text-foreground">
          ₹{haveVariant ? selectedPackSize?.sellingPrice : sellingPrice}
          </span>
          <span className="text-sm text-muted-foreground line-through">
          ₹{haveVariant ? selectedPackSize?.listPrice : listPrice}
          </span>
          <span className="text-[0.72rem] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {calculateDiscountPercentage}% OFF
          </span>
        </div>
        
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Link href={`/medicines/${slug}`} className="w-full">
          <Button className="w-full h-8 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all flex items-center justify-center gap-1.5">
            <Info className="h-3 w-3" />
            More Info
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

