"use client"

import { useState } from "react"
import { Heart, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LogoutDialog } from "./LogoutDialog"
import { useSelector } from "react-redux"

interface ProfileSidebarProps {
  user: {
    name: string
    email: string
    profileImage: string
  }
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function ProfileSidebar({ user:nothing, activeTab, setActiveTab }: ProfileSidebarProps) {
  const {user} = useSelector((state: any) => state.auth);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);


  return (
    <TooltipProvider delayDuration={300}>
      <aside className="max-md:fixed shadow-lg md:left-[5rem] md:top-[10rem] max-md:top-0 max-md:left-0 z-10 flex h-screen w-14 flex-col border-r bg-gray-50 md:fixed md:m-4 md:h-[30rem] md:w-64 md:rounded-xl">
        {/* User Profile Section */}
        <div className="flex flex-shrink-0 flex-col items-center border-b px-2 py-4 md:px-4">
          <Avatar className="h-10 bg-gray-300 w-10 md:h-16 md:w-16 md:mb-2">
            <AvatarImage className="object-cover" src={user.avatar?.url} alt={user.name} />
            <AvatarFallback >{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden text-center md:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-2 md:py-4">
          <div className="space-y-1 max-md:space-y-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className={`w-full justify-center md:justify-start ${activeTab === "profile" ? 'text-white' : ''}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                  <span className="hidden md:inline">Profile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="md:hidden">
                Profile
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === "favorites" ? "secondary" : "ghost"}
                  className={`w-full justify-center md:justify-start ${activeTab === "favorites" ? 'text-white' : ''}`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <Heart className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                  <span className="hidden md:inline">Favorites</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="md:hidden">
                Favorites
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-gray-700 dark:text-gray-300 md:justify-start"
                  onClick={() => {}}
                >
                  <Settings className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="md:hidden">
                Settings
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="flex flex-shrink-0 border-t p-2 md:p-4">
          <LogoutDialog componentUsed={"ProfileSidebar"} open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen} />
        </div>
      </aside>
    </TooltipProvider>
  )
}

