'use client'

import { FC, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { CheckCircle2, Mail, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import React from 'react'

type Props = {
  shopDetails:any;
  setShopDetails:(shopDetails: any) => void;
}

const EmailVerification:FC<Props> = ({shopDetails,setShopDetails}) => {
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    if (shopDetails.email) {
      setLoading(true)
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOtpSent(true)
      setLoading(false)
    }
  }

  const handleOtpChange = async (value: string) => {
    setOtp(value)
    if (value.length === 4) {
      setLoading(true)
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      setVerified(true)
      setLoading(false)
    }
  }
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-white transition-all duration-300">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Verification
        </label>
        <div className="relative flex items-center">
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={shopDetails.email}
            onChange={(e) => setShopDetails((previous:any)=> ({...previous,email:e.target.value}))}
            className={cn(
              "pr-[100px] transition-all duration-300 ring-transparent",
              verified && "pr-[120px] border-green-500 focus:ring-green-500"
            )}
            disabled={verified}
          />
          {!otpSent && !verified && (
            <Button 
              onClick={handleSendOTP} 
              className="absolute !bg-navbar text-white right-0 h-full rounded-l-none px-3 text-sm"
              disabled={!email || loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
            </Button>
          )}
          {verified && (
            <div className="absolute right-3 flex items-center text-green-500">
              <CheckCircle2 className="w-5 h-5 mr-1" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      {otpSent && !verified && (
        <div className="space-y-2 animate-fadeIn">
          <label htmlFor="otp" className="text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <InputOTP
            value={otp}
            onChange={handleOtpChange}
            maxLength={4}
            className="flex justify-center gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            </div>
          )}
        </div>
      )}

      {verified && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md animate-fadeIn">
          <Mail className="w-5 h-5" />
          <span className="text-sm font-medium">Email verified successfully!</span>
        </div>
      )}
    </div>
  )
}

export default EmailVerification;

