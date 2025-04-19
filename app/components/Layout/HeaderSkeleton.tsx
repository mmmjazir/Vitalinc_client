import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { Menu } from "lucide-react"
import Link from "next/link"

type Props = {
  navbarOnly: boolean
}

const HeaderSkeleton = ({ navbarOnly }: Props) => {

  return (
    <div className={`${navbarOnly ? "mb-[70px]" : "mb-[136px] max-md:mb-[190px]"}`}>
      <div className="block shadow-sm fixed top-0 z-50 left-0 transition 800px:flex items-center justify-between max-md:w-full md:w-[100vw] bg-navbar h-[70px]">
        <div className="relative flex items-center justify-between px-4 w-full">
          {/* Mobile view */}
          <div className="flex max-md:h-[70px] max-md:w-full max-md:items-center max-md:justify-between">
            <div className="md:hidden p-1 text-white">
              <Menu size={20} />
            </div>

            <Link href="/">
              <div className="w-[140px] h-[100px] relative">
                <Skeleton className="absolute inset-0 bg-gray-600 opacity-50" />
              </div>
            </Link>
          </div>

          {/* Desktop nav items - hidden on mobile */}
          <div className="hidden md:flex items-center">
            {/* Nav links */}
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-20 bg-gray-500" />
              ))}
            </div>

            {/* User profile area */}
            <div className="flex items-center ml-[60px]">
              <div className="relative cursor-pointer mr-[15px]">
                <div className="flex items-center gap-2 bg-gray-300 px-2 h-10 rounded-xl min-w-[200px]">
                  <Skeleton className="bg-gray-100 rounded-full h-9 w-9" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="bg-gray-100 h-3 w-24" />
                    <Skeleton className="bg-gray-100 h-2 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons - hidden on mobile */}
          <div className="hidden md:flex md:gap-3 md:items-center">
            <div className="font-Outfit w-[180px] shadow-inner text-[16px] py-2 px-3 rounded-lg">
              <Button disabled className="text-white flex items-center justify-center gap-2 w-full">
                <Skeleton className="h-6 w-28 rounded-lg bg-gray-300" />
                <IoIosArrowForward className="ml-1 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SubHeader skeleton */}
      {!navbarOnly && (
        <div className="fixed top-[70px] left-0 w-full bg-white z-40 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full md:w-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-md bg-gray-200" />
              ))}
            </div>
            <div className="mt-3 md:mt-0 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-[300px] rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderSkeleton
