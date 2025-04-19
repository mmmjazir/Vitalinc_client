import { Skeleton } from "@/components/ui/skeleton"

export function ReviewSkeleton() {
  return (
    <div className="space-y-6">
      {[1,2,3,4,5,6].map((index) => (
        <div key={index} className="border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <Skeleton className="h-4 bg-gray-100  w-24 mb-2" />
              <Skeleton className="h-4 bg-gray-100  w-32" />
            </div>
          </div>
          <Skeleton className="h-4 bg-gray-100  w-full mt-3" />
          {/* <Skeleton className="h-4 bg-gray-100  w-3/4 mt-2" /> */}
          <div className="mt-4">
            <Skeleton className="h-8 w-24 bg-gray-100  rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

