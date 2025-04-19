"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip,TooltipTrigger,TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"


interface NavProps {
  navItems: {
    title: string
    icon: LucideIcon
    variant: "default" | "ghost";
    href:string  ;
  }[]
}

export function MobileSidebarItems({ navItems }: NavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
    <div
      className="group min-h-screen font-Poppins mt-3 transition-all duration-300 ease-in-out flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className={`grid transition-all duration-300 ease-in-out gap-3 px-2 
        group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2
        `}>
        {navItems.map((link, index) =>
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.href === pathname ? "default" : "ghost", size: "sm" }),
                link.href === pathname &&
                 "!bg-gray-100/10",
                "justify-start py-6 transition-all hover:bg-gray-100/10 text-white duration-300 ease-in-out"
              )}
            >
              <link.icon size={22} className="mr-2 transition-all duration-300 ease-in-out" />
               <span className="transition-transform duration-300 ease-in-out">
                 {link.title}
              </span>
            
            </Link>

        )}
      </nav>
    </div>
    
    </TooltipProvider>
  )
}
