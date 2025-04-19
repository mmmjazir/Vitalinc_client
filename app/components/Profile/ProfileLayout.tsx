"use client"

import type { ReactNode } from "react"
import { ProfileSidebar } from "./ProfileSidebar"

interface ProfileLayoutProps {
  user: {
    name: string
    email: string
    profileImage: string
  }
  activeTab: string
  setActiveTab: (tab: string) => void
  children: ReactNode
}

export function ProfileLayout({ user, activeTab, setActiveTab, children }: ProfileLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-70px)]">
      <div className="flex ">
        <ProfileSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />


        {/* Main Content */}
        <main className="flex-1 pl-11 md:pl-[14rem]">
          <div className="mx-auto max-w-[82rem] p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

