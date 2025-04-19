"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ClipboardPlus, Home, Search } from "lucide-react"
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import { Suspense } from "react"
import HeaderSkeleton from "./components/Layout/HeaderSkeleton"


export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Suspense fallback={<HeaderSkeleton navbarOnly={false} />}>
      <Header navbarOnly={false} activeHeading={0} />
      </Suspense>

      {/* Background Gradient */}
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-white to-[#f0faf9] py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Illustration Section - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-xs">
                {/* Person illustration */}
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* Shadow/ground */}
                  <ellipse cx="200" cy="440" rx="130" ry="20" fill="#E6EEF2" />

                  {/* Legs */}
                  <path d="M170 300L160 440H190L200 300H170Z" fill="#0e3b62" />
                  <path d="M230 300L240 440H210L200 300H230Z" fill="#0e3b62" />

                  {/* Shoes */}
                  <path d="M155 440C155 440 155 450 165 450H195C195 450 200 450 200 440H155Z" fill="#3c9d8e" />
                  <path d="M245 440C245 440 245 450 235 450H205C205 450 200 450 200 440H245Z" fill="#3c9d8e" />

                  {/* Body */}
                  <path d="M170 180V300H230V180C230 180 220 170 200 170C180 170 170 180 170 180Z" fill="#3c9d8e" />

                  {/* Arms */}
                  <path
                    d="M170 180C170 180 140 190 130 230C120 270 120 280 120 280L140 290C140 290 150 250 160 230C170 210 170 180 170 180Z"
                    fill="#3c9d8e"
                  />
                  <path
                    d="M230 180C230 180 260 170 280 200C300 230 310 260 310 260L290 270C290 270 280 240 270 220C260 200 230 180 230 180Z"
                    fill="#3c9d8e"
                  />

                  {/* Head */}
                  <circle cx="200" cy="140" r="40" fill="#FFD6B0" />
                  <path
                    d="M180 130C180 130 190 140 200 140C210 140 220 130 220 130"
                    stroke="#0e3b62"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="185" cy="125" r="5" fill="#0e3b62" />
                  <circle cx="215" cy="125" r="5" fill="#0e3b62" />

                  {/* Hair */}
                  <path
                    d="M160 120C160 120 170 90 200 90C230 90 240 120 240 120C240 120 250 110 250 100C250 90 240 70 200 70C160 70 150 90 150 100C150 110 160 120 160 120Z"
                    fill="#0e3b62"
                  />

                  {/* Medicine Box */}
                  <g transform="translate(240, 100) rotate(-10)">
                    <rect x="0" y="0" width="80" height="60" rx="5" fill="#3c9d8e" />
                    <rect x="5" y="5" width="70" height="50" rx="3" fill="white" />
                    <rect x="30" y="15" width="20" height="30" fill="#3c9d8e" />
                    <rect x="15" y="25" width="50" height="10" fill="#3c9d8e" />
                  </g>

                  {/* Dotted line from hand to box */}
                  <path d="M290 260C290 260 300 220 320 180" stroke="#3c9d8e" strokeWidth="2" strokeDasharray="5 5" />
                </svg>

                {/* Logo */}
                <div className="absolute top-0 left-0 p-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vitalinc-a2PGy8rY794U1mRqgH9CwL1Lp02qSq.png"
                    alt="Vitalinc Logo"
                    width={120}
                    height={50}
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Section - Right Side */}
            <div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <p className="text-sm font-medium text-[#3c9d8e] mb-2">404 Error</p>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-[#0e3b62]">Page not found</h1>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex justify-center md:justify-start my-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#3c9d8e]/10 rounded-full blur-3xl transform scale-150 opacity-50" />
                    <div className="relative text-[8rem] md:text-[10rem] font-bold text-[#3c9d8e]/20 leading-none select-none">
                      404
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center md:text-left mb-8"
                >
                  <p className="text-[#0e3b62]/70 text-lg">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={() => router.back()}
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full border-[#0e3b62] text-[#0e3b62] hover:bg-[#0e3b62]/5"
                      onClick={() => router.push("/")}
                      size="lg"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#0e3b62] text-[#0e3b62] hover:bg-[#0e3b62]/5"
                      onClick={() => router.push("/search")}
                      size="lg"
                    >
                      <ClipboardPlus className="mr-2 h-4 w-4" />
                      Medicines
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

