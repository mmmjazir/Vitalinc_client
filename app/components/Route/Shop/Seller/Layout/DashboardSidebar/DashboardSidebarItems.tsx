"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip,TooltipTrigger,TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"


interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    icon: LucideIcon
    variant: "default" | "ghost";
    href:string  ;
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
    <div
      data-collapsed={isCollapsed}
      className="group min-h-screen font-Poppins transition-all duration-300 ease-in-out flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className={`grid transition-all duration-300 ease-in-out gap-6 px-2 
        group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2
        `}>
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: link.href === pathname ? "default" : "ghost", size: "icon" }),
                    "h-9 w-9 transition-all duration-300 ease-in-out",
                    link.href === pathname &&
                      "!bg-navbar text-white"
                  )}
                >
                  <link.icon 
                  size={22} 
                  className="transition-transform duration-300 ease-in-out"
                  />
                  <span className="sr-only ">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex bg-white transition-transform duration-300 ease-in-out items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.href === pathname ? "default" : "ghost", size: "sm" }),
                link.href === pathname &&
                 "!bg-navbar text-white",
                "justify-start py-6 transition-all duration-300 ease-in-out"
              )}
            >
              <link.icon size={22} className="mr-2 transition-all duration-300 ease-in-out" />
               <span className="transition-transform duration-300 ease-in-out">
                 {link.title}
              </span>
            
            </Link>
          )
        )}
      </nav>
    </div>
    
    </TooltipProvider>
  )
}
