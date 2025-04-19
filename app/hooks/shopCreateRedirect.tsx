'use client'
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

interface UserAuthProtectedProps {
  children: React.ReactNode;
}

export default function ShopCreateRedirect({
  children,
}: UserAuthProtectedProps) {
  const { isLoading } = useLoadUserQuery(undefined, {});
  const { user } = useSelector((state: any) => state.auth);
  const { data: session, status: sessionStatus } = useSession();
  

  if (isLoading || sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user.role === "seller") {
    redirect("seller/shop")
  }

  return <>{children}</>;
}