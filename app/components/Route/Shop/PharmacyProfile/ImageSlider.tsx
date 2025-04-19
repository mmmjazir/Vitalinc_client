


// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight, Star, Heart, Maximize2 } from "lucide-react"
// import { cn } from "@/lib/utils"

// type ImageSliderProps = {
//   images: Array<{
//     public_id: string
//     url: string
//     _id: string
//   }>
//   shopName: string
//   averageRating: string
//   reviewCount: number
//   isFavorite: boolean
// }

// const ImageSlider = ({ images, shopName, averageRating, reviewCount, isFavorite }: ImageSliderProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
//   const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

//   // Calculate how many images to show per slide based on screen size
//   const imagesPerSlide = 3
//   const totalSlides = Math.ceil(images.length / imagesPerSlide)

//   useEffect(() => {
//     // Reset current index if images change or if current index is out of bounds
//     if (images.length > 0 && currentIndex >= totalSlides) {
//       setCurrentIndex(0)
//     }
//   }, [images, currentIndex, totalSlides])

//   const goToPrevious = () => {
//     const isFirstSlide = currentIndex === 0
//     const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1
//     setCurrentIndex(newIndex)
//   }

//   const goToNext = () => {
//     const isLastSlide = currentIndex === totalSlides - 1
//     const newIndex = isLastSlide ? 0 : currentIndex + 1
//     setCurrentIndex(newIndex)
//   }

//   const goToSlide = (slideIndex: number) => {
//     setCurrentIndex(slideIndex)
//   }

//   const handleImageLoad = (imageId: string) => {
//     setLoadedImages(prev => new Set(prev).add(imageId))
//   }

//   const openFullscreen = (imageUrl: string) => {
//     setFullscreenImage(imageUrl)
//   }

//   const closeFullscreen = () => {
//     setFullscreenImage(null)
//   }

//   // Get current slide images
//   const getCurrentSlideImages = () => {
//     const startIdx = currentIndex * imagesPerSlide
//     return images.slice(startIdx, Math.min(startIdx + imagesPerSlide, images.length))
//   }

//   // Preload the next slide's images
//   useEffect(() => {
//     const nextSlideIndex = (currentIndex + 1) % totalSlides
//     const startIdx = nextSlideIndex * imagesPerSlide
//     const nextSlideImages = images.slice(startIdx, Math.min(startIdx + imagesPerSlide, images.length))
    
//     // Use the browser's HTMLImageElement instead of "new Image()"
//     nextSlideImages.forEach(image => {
//       const imgElement = document.createElement("img")
//       imgElement.src = image.url
//       imgElement.onload = () => handleImageLoad(image._id)
//     })
//   }, [currentIndex, images, imagesPerSlide, totalSlides])

//   return (
//     <>
//       <div className="relative w-full h-[300px] md:h-[400px] rounded-t-xl overflow-hidden bg-gray-100">
//         {/* Main carousel grid */}
//         <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-3 gap-1 p-1">
//           {getCurrentSlideImages().map((image, idx) => {
//             const isImageLoaded = loadedImages.has(image._id)
//             return (
//               <div
//                 key={image._id}
//                 className={cn(
//                   "relative overflow-hidden rounded-lg cursor-pointer group",
//                   idx === 0 && getCurrentSlideImages().length < 3 ? "md:col-span-3" : "",
//                   idx === 0 && getCurrentSlideImages().length === 2 ? "md:col-span-2" : "",
//                   getCurrentSlideImages().length === 1 ? "col-span-full" : "",
//                 )}
//                 onClick={() => openFullscreen(image.url)}
//               >
//                 <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
//                 <Image
//                   src={image.url}
//                   alt={`Pharmacy Image ${idx + 1}`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
//                   className={`transition-all duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"} object-cover group-hover:scale-105`}
//                   onLoad={() => handleImageLoad(image._id)}
//                   unoptimized={false}
//                   priority={idx === 0} // Load the first image with priority
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
//                   <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Navigation arrows */}
//         {totalSlides > 1 && (
//           <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 pointer-events-auto"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToPrevious();
//               }}
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 pointer-events-auto"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToNext();
//               }}
//             >
//               <ChevronRight className="h-6 w-6" />
//             </Button>
//           </div>
//         )}

//         {/* Shop info overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center justify-between">
//               <h1 className="text-xl md:text-2xl font-bold text-white">{shopName}</h1>

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/20 text-white hover:bg-white/30 rounded-full"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   // Handle favorite toggle here
//                 }}
//               >
//                 <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-white" : ""}`} />
//                 <span className="font-medium text-xs md:text-sm whitespace-nowrap">
//                   {isFavorite ? "Favorited" : "Add to Favorites"}
//                 </span>
//               </Button>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="flex">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     className={`h-3 w-3 md:h-4 md:w-4 ${
//                       star <= Number.parseFloat(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-white text-xs md:text-sm font-medium">{averageRating}</span>
//               <span className="text-white/70 text-xs">({reviewCount} reviews)</span>
//             </div>
//           </div>
//         </div>

//         {/* Dots navigation */}
//         {totalSlides > 1 && (
//           <div className="absolute bottom-20 left-0 right-0">
//             <div className="flex justify-center gap-2">
//               {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                 <div
//                   key={slideIndex}
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     goToSlide(slideIndex)
//                   }}
//                   className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full ${
//                     slideIndex === currentIndex ? "bg-white" : "bg-white/50"
//                   }`}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Fullscreen image modal */}
//       {fullscreenImage && (
//         <div
//           className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
//           onClick={closeFullscreen}
//         >
//           <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-auto">
//             <Image
//               src={fullscreenImage}
//               alt="Fullscreen pharmacy image"
//               fill
//               className="object-contain"
//               unoptimized={false}
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
//               onClick={closeFullscreen}
//             >
//               <ChevronLeft className="h-6 w-6 rotate-45" />
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default ImageSlider


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Heart, Maximize2, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ImageSliderProps = {
  images: Array<{
    public_id: string
    url: string
    _id: string
  }>
  shopName: string
  averageRating: string
  reviewCount: number
  isFavorite: boolean
}

const ImageSlider = ({ images, shopName, averageRating, reviewCount, isFavorite }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  // Calculate how many images to show per slide based on screen size
  const imagesPerSlide = 3
  const totalSlides = Math.ceil(images.length / imagesPerSlide)

  useEffect(() => {
    // Reset current index if images change or if current index is out of bounds
    if (images.length > 0 && currentIndex >= totalSlides) {
      setCurrentIndex(0)
    }
  }, [images, currentIndex, totalSlides])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === totalSlides - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId))
  }

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIdx = currentIndex * imagesPerSlide
    return images.slice(startIdx, Math.min(startIdx + imagesPerSlide, images.length))
  }

  // Preload the next slide's images
  useEffect(() => {
    const nextSlideIndex = (currentIndex + 1) % totalSlides
    const startIdx = nextSlideIndex * imagesPerSlide
    const nextSlideImages = images.slice(startIdx, Math.min(startIdx + imagesPerSlide, images.length))
    
    // Use the browser's HTMLImageElement instead of "new Image()"
    nextSlideImages.forEach(image => {
      const imgElement = document.createElement("img")
      imgElement.src = image.url
      imgElement.onload = () => handleImageLoad(image._id)
    })
  }, [currentIndex, images, imagesPerSlide, totalSlides])

  const currentSlideImages = getCurrentSlideImages()
  const isSingleImage = currentSlideImages.length === 1

  return (
    <>
      <div className={cn(
        "relative w-full h-[300px] md:h-[400px] rounded-t-xl overflow-hidden",
        isSingleImage ? "bg-gray-700" : "bg-gray-100"
      )}>
        {/* Main carousel grid */}
        <div className={cn(
          "relative w-full h-full",
          isSingleImage ? "flex items-center justify-center" : "grid grid-cols-1 md:grid-cols-3 gap-1 p-1"
        )}>
          {currentSlideImages.map((image, idx) => {
            const isImageLoaded = loadedImages.has(image._id)
            return (
              <div
                key={image._id}
                className={cn(
                  "relative overflow-hidden rounded-lg cursor-pointer group",
                  !isSingleImage && idx === 0 && currentSlideImages.length < 3 ? "md:col-span-3" : "",
                  !isSingleImage && idx === 0 && currentSlideImages.length === 2 ? "md:col-span-2" : "",
                  isSingleImage ? "w-full h-full flex items-center justify-center" : "",
                )}
                onClick={() => openFullscreen(image.url)}
              >
                {/* Loading placeholder */}
                <div className={cn(
                  "absolute", 
                  isSingleImage ? "inset-0 bg-gray-800" : "inset-0 bg-gray-200 animate-pulse"
                )}></div>
                
                <Image
                  src={image.url}
                  alt={`Pharmacy Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className={cn(
                    "transition-all duration-500",
                    isImageLoaded ? "opacity-100" : "opacity-0",
                    isSingleImage ? "object-contain" : "object-cover group-hover:scale-105"
                  )}
                  onLoad={() => handleImageLoad(image._id)}
                  unoptimized={false}
                  priority={idx === 0} // Load the first image with priority
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        {totalSlides > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}



        {/* Dots navigation */}
        {totalSlides > 1 && (
          <div className="absolute bottom-20 left-0 right-0">
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToSlide(slideIndex)
                  }}
                  className={`cursor-pointer shadow-md w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    slideIndex === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen image modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-auto">
            <Image
              src={fullscreenImage}
              alt="Fullscreen pharmacy image"
              fill
              className="object-contain"
              unoptimized={false}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageSlider