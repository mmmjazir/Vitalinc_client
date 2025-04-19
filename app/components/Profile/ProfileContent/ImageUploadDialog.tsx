"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"

interface ImageUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImage: string
  onImageChange: (imageUrl: string) => void
}

export function ImageUploadDialog({ open, onOpenChange, currentImage, onImageChange }: ImageUploadDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string>(currentImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [updateAvatar, {isSuccess,error,isLoading}] = useUpdateAvatarMutation();
  const {refetch} = useLoadUserQuery(undefined,{})
  

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        setSelectedImage(avatar);
        setPreviewImage(avatar)
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
    
    // const file = e.target.files?.[0]
    // if (file) {
    //   // Create a preview URL for the selected image
    //   const imageUrl = URL.createObjectURL(file)
    //   setSelectedImage(file)
    //   setPreviewImage(imageUrl)
    // }
  }

  const handleUpload = async() => {
    if (selectedImage) {
      await updateAvatar({avatar:selectedImage})
   
    }
  }

  const handleCancel = () => {
    // Reset the selected image and preview
    setSelectedImage(null)
    setPreviewImage(currentImage)
    onOpenChange(false)
  }

useEffect(()=>{
  if(isSuccess){
    toast.success("Profile picture updated successfully");
    refetch();
    setSelectedImage(null)
    onOpenChange(false)
  }
  if(error){
    const errorData = error as any;
    toast.error(errorData.data.message);
    }
},[isSuccess,error])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Select a new profile picture from your device.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <Image src={previewImage || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
          </div>

          {selectedImage && (
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => {
                setSelectedImage(null)
                setPreviewImage(currentImage)
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Remove selection
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleFileSelect}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Select Image
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedImage}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          >
             {isLoading ? 'Uploading..' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

