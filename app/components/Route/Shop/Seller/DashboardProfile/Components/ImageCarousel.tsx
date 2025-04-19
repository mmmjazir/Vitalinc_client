"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageUploadDialog from "./ImageUploadDialog"

type Props = {
  images: any[]
  shopName: string
  id: string
  refetch: () => void
}

export default function ImageCarousel({ images, shopName, id, refetch }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset current index if images change
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0)
    }
  }, [images, currentIndex])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]  rounded-xl overflow-hidden">
      {/* Main carousel image */}
      {images && images.length > 0 ? (
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]?.url || "/placeholder.svg"}
            alt={`Shop Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ 
              objectFit: "contain",
              objectPosition: "center",
              backgroundColor: "rgba(0,0,0,0.7)"
            }}
            onLoad={() => setIsLoaded(true)}
            priority
          />
          <div className="absolute inset-0 bg-opacity-30"></div>

          {/* Navigation arrows */}
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

          {/* Shop name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{shopName}</h1>
            <p className="text-white/80 mt-2">Manage your shop&apos;s appearance</p>
          </div>

          {/* Dots navigation */}
          <div className="absolute bottom-24 left-0 right-0">
            <div className="flex justify-center gap-2">
              {images.map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`cursor-pointer w-3 h-3 rounded-full ${
                    slideIndex === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p className="text-xl font-medium mb-4">No images available</p>
          <ImageUploadDialog refetch={refetch} id={id} variant="primary" />
        </div>
      )}
    </div>
  )
}
