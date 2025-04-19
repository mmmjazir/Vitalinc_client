"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Camera, Pencil, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageUploadDialog } from "./ImageUploadDialog"
import { useSelector } from "react-redux"
import { useUpdateNameMutation } from "@/redux/features/user/userApi"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import toast from "react-hot-toast"

interface ProfileContentProps {
  user: {
    name: string
    email: string
    profileImage: string
    role: string
  }
  setUser: (user: any) => void
}

export function ProfileContent({ user:nothing, setUser }: ProfileContentProps) {
 
const {user} = useSelector((state: any) => state.auth);
const {isLoading,refetch} = useLoadUserQuery(undefined,{})

const [updateName,{isSuccess,error}] = useUpdateNameMutation();

 const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(user.name)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const handleNameEdit = async() => {
    if (isEditingName) {
      await updateName({name:tempName});
    }
    setIsEditingName(!isEditingName)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value)
  }

  const handleProfilePictureClick = () => {
    setImageDialogOpen(true)
  }

  const handleImageChange = (imageUrl: string) => {
    setUser({ ...user, profileImage: imageUrl })
  }


  useEffect(()=>{
     if(isSuccess){
       refetch();
       toast.success("Your name updated successfully")
    }
  },[isSuccess])
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Profile Picture with Upload Option */}
            <div className="relative">
              <Avatar className="h-24 w-24 bg-gray-200">
                <AvatarImage className="object-cover" src={user.avatar?.url} alt={user.name} />
                <AvatarFallback className="text-md font-Josefin">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <button
                className="absolute bottom-0 right-0 rounded-full bg-gray-800 p-1.5 text-white shadow-sm hover:bg-gray-600/90 transition-colors"
                onClick={handleProfilePictureClick}
                title="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
              <ImageUploadDialog
                open={imageDialogOpen}
                onOpenChange={setImageDialogOpen}
                currentImage={user.avatar?.url}
                onImageChange={handleImageChange}
              />            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input value={tempName} onChange={handleNameChange} className="h-8 max-w-[200px]" />
                    <Button className="bg-gray-800 hover:bg-gray-700 text-white" size="sm" onClick={handleNameEdit}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setTempName(user.name)
                        setIsEditingName(false)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <CardTitle>{user.name}</CardTitle>
                    <Button size="sm" variant="ghost" onClick={handleNameEdit} className="h-6 text-gray-600 px-2">
                      <Pencil/>
                    </Button>
                  </>
                )}
               
              </div>
              <div className="flex items-center gap-2">
                <CardDescription>{user.email}</CardDescription>
               
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {user.role === "seller" && (
            <div className="flex items-center  gap-2 mt-2">
              <Badge variant="outline" className="flex items-center text-sm gap-1">
                <BadgeCheck className="h-[1.1rem] w-[1.1rem] text-primary" />
                Seller Account
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

