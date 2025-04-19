'use client'

import { Star, StarOutline } from "@mui/icons-material";
import { useState } from "react";


const StarRating = ({totalStars = 5}) => {
const [rating, setRating] = useState(0);

const handleStarClick = (starIndex:number) => {
    setRating(starIndex + 1);
  };

  return (
    <div className="space-x-1">
    {[...Array(totalStars)].map((_, index) => (
      <button
        key={index}
        onClick={() => handleStarClick(index)}
        className="focus:outline-none"
      >
        {index < rating ? (
          <Star fontSize="large" className="text-yellow-400" />
        ) : (
          <StarOutline fontSize="large" className="text-gray-300" />
        )}
      </button>
    ))}
  </div>
  )
}

export default StarRating