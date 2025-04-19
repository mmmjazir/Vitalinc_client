"use client"

import { useState } from "react"
import { ProfileLayout } from "./ProfileLayout"
import { ProfileContent } from "./ProfileContent/ProfileContent"
import { FavoritesContent } from "./FavoritesContent/FavoritesContent"


// Sample user data
export const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  profileImage: "/placeholder.svg?height=100&width=100",
  role: "seller",
}

// Sample favorites data
export const favoritesData = {
  pharmacies: [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      address: "123 Medical Ave, New York",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
    },
    {
      id: 2,
      name: "MediCare Pharmacy",
      address: "456 Health St, Boston",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Wellness Drugstore",
      address: "789 Wellness Blvd, Chicago",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
    },
  ],
  medicines: [
    {
      id: 1,
      name: "Paracetamol",
      brand: "MediRelief",
      image: "/placeholder.svg?height=80&width=80",
      price: "$5.99",
    },
    {
      id: 2,
      name: "Amoxicillin",
      brand: "HealthCure",
      image: "/placeholder.svg?height=80&width=80",
      price: "$12.50",
    },
    {
      id: 3,
      name: "Vitamin C",
      brand: "ImmunoBoost",
      image: "/placeholder.svg?height=80&width=80",
      price: "$8.75",
    },
  ],
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [user, setUser] = useState(userData)

  return (
    <ProfileLayout user={user} activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "profile" && <ProfileContent user={user} setUser={setUser} />}

      {activeTab === "favorites" && <FavoritesContent favoritesData={favoritesData} />}
    </ProfileLayout>
  )
}

