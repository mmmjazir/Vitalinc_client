'use client'
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface UserAuthProtectedProps {
  children: React.ReactNode;
}

export default function UserAuthProtected({
  children,
}: UserAuthProtectedProps) {
  const { isLoading, error } = useLoadUserQuery(undefined, {});
  const { user } = useSelector((state: any) => state.auth);
  const { data: session, status: sessionStatus } = useSession();
  
  const pathname: any = usePathname()

  useEffect(() => {
    if (error) {
      console.error("Error loading user:", error);
    }
  }, [error]);

  // Show loading state while either authentication method is still loading
  if (isLoading || sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    const encodedRedirect = encodeURIComponent(pathname)
    redirect(`/?loginAuthRequired=true&redirect=${encodedRedirect}`)
    }

  return <>{children}</>;
}