"use client"

import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useLogOutMutation } from "@/redux/features/auth/authApi"
import { useSession,signOut } from "next-auth/react"
import toast from "react-hot-toast"

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  componentUsed: string
}

export function LogoutDialog({ open, onOpenChange, componentUsed }: LogoutDialogProps) {
  const [logOut] = useLogOutMutation();
  // const{data:sessionData} = useSession();


  const handleLogout = async() => {
    try {
      onOpenChange(false);
      await signOut({ redirect: false });
      await logOut({});
      toast.success("You have been logged out.");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error(err);
    }
  }

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 md:justify-start"
              >
                <LogOut className={`h-5 w-5 ${componentUsed === "ProfileSidebar" ? "md:mr-2" :  componentUsed === "Header" ? "" : componentUsed === "MobileSidebar" && "mr-2"}    md:h-4 md:w-4`} />
                <span className={`${componentUsed === "ProfileSidebar" ? "hidden md:inline" : componentUsed === "Header" ? "hidden" : componentUsed === "DashboardHeader" ? "hidden" : componentUsed === "MobileSidebar" && "inline"} `}>Logout</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" className="md:hidden">
            Logout
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from your account? You will need to login again to access your profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-500 text-white" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

