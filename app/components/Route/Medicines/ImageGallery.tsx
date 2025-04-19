"use client";

import type React from "react";
import { useState, useRef, type MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageModal } from "./ImageModal";
import Image from "next/image";

interface ImageGalleryProps {
  images: { url: string; alt: string }[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomDetails, setZoomDetails] = useState<{
    isZoomed: boolean;
    x: number;
    y: number;
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemsPerPage = 4;
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);
  
  const handleImageHover = (e: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomDetails({
      isZoomed: true,
      x,
      y,
    });
  };

  const handleImageLeave = () => {
    setZoomDetails(null);
  };

  const handleScroll = (direction: "up" | "down") => {
    const newPosition =
      direction === "up"
        ? Math.max(0, scrollPosition - 1)
        : Math.min(images.length - itemsPerPage, scrollPosition + 1);
    setScrollPosition(newPosition);
  };

  const handleMobileScroll = (index: number) => {
    setSelectedIndex(index);
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const imageElement = scrollContainer.children[index] as HTMLElement;
      if (imageElement) {
        imageElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Product Images Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[calc(100vw-2rem)] snap-center"
              onClick={() => setIsModalOpen(true)}
            >
              {/* <div className=" aspect-video rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden p-4">
                <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-contain" />
              </div> */}
              <div className="aspect-video rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Navigation Dots */}
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleMobileScroll(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                selectedIndex === index ? "bg-primary w-4" : "bg-gray-300"
              )}
            />
          ))}
        </div>

        {/* Mobile Modal */}
        <ImageModal
          images={images.map((img) => img.url)}
          currentImage={images[selectedIndex]?.url}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  // Desktop view (original implementation)
  return (
    <div className="flex gap-4 p-4">
      {/* Thumbnails */}
      <div className="flex max-h-80 flex-col">
        <Button
          variant="outline"
          size="icon"
          className="mb-2"
          onClick={() => handleScroll("up")}
          disabled={scrollPosition === 0}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>

        <div
          className="flex flex-col border px-[1px] rounded-md gap-2 overflow-hidden"
          style={{ height: "400px" }}
        >
          {images
            .slice(scrollPosition, scrollPosition + itemsPerPage)
            .map((image, idx) => (
              <motion.div
                key={scrollPosition + idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2",
                  selectedIndex === scrollPosition + idx
                    ? "border-primary"
                    : "border-transparent"
                )}
                onClick={() => setSelectedIndex(scrollPosition + idx)}
              >
                {/* <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                /> */}

                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.div>
            ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="mt-2"
          onClick={() => handleScroll("down")}
          disabled={scrollPosition >= images.length - itemsPerPage}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Image with Zoom */}
      <div className="flex-grow relative group">
        <motion.img
          ref={imageRef}
          src={images[selectedIndex]?.url}
          alt={images[selectedIndex]?.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-80 object-contain rounded-lg"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
        />

        {/* Zoom Overlay */}
        <AnimatePresence>
          {zoomDetails?.isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bg-gray-100 top-0 left-0 w-full h-[22rem] pointer-events-none overflow-hidden"
              style={{
                backgroundImage: `url(${images[selectedIndex]?.url})`,
                backgroundPosition: `${zoomDetails.x}% ${zoomDetails.y}%`,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
