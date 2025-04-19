// import { Star } from 'lucide-react'

// interface ReviewSummaryProps {
//   // reviews: Array<{ rating: number }>
//   avgRating:number;
//   reviewCount:number;
// }

// export function ReviewSummary({ avgRating,reviewCount }: ReviewSummaryProps) {

//   return (
//     <div className="flex items-center space-x-6 bg-gray-50 p-6 rounded-lg">
//       <div className="text-5xl font-bold text-teal-600">{avgRating}</div>
//       <div>
//         <div className="flex">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`w-6 h-6 ${
//                 star <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//         <div className="text-sm text-gray-600 mt-1">Based on {reviewCount} reviews</div>
//       </div>
//     </div>
//   )
// }


import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ReviewSummaryProps {
  avgRating: number
  reviewCount: number
  ratingBreakdown:any
}

export function ReviewSummary({ avgRating, reviewCount,ratingBreakdown }: ReviewSummaryProps) {
  const roundedRating = Math.round(avgRating * 10) / 10

  const getPercentage = (count: number) => {
    if (!reviewCount) return 0
    return (count / reviewCount) * 100
  }
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex items-center space-x-6">
        <div className="text-5xl font-bold text-teal-600">{roundedRating}</div>
        <div className="flex-grow">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-1">Based on {reviewCount} reviews</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {[5, 4, 3, 2, 1].map((rating) =>{
           const count = ratingBreakdown[rating] || 0
           const percent = getPercentage(count)
          return (
          <div key={rating} className="flex items-center">
            <span className="w-12 font-medium font-Poppins text-sm text-gray-600">{rating} star</span>
            <Progress
              value={percent}
              className="h-4 flex-grow mx-2"
              indicatorColor="bg-yellow-500"
            />
            <span className="w-12 text-sm text-gray-600 text-right">
            {Math.round(percent)}%
            </span>
          </div>
        )
        } )}
      </div>
    </div>
  )
}

