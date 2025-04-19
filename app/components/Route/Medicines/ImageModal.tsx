"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageModalProps {
  images: string[];
  currentImage: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  images,
  currentImage,
  isOpen,
  onClose,
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center p-4 border-b">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="ml-2">Back</span>
            </button>
          </div>

          {/* Main Image */}
          {/* <div className="flex-1 flex items-center justify-center bg-white p-4">
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Product view"
              className="max-h-full max-w-full object-contain"
            />
          </div> */}

          <div className="flex-1 flex items-center justify-center bg-white p-4">
            <div className="relative w-full h-full max-h-[500px] max-w-full">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt="Product view"
                fill
                className="object-contain"
                sizes="100vw"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden",
                    currentImage === image
                      ? "border-primary"
                      : "border-gray-200"
                  )}
                >
                  {/* <img
                    src={image || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  /> */}

                  <div className="relative w-full h-full">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
