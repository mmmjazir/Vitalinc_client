import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props={
    rating:number;
    forShop:boolean;
}

const Ratings:FC<Props> = ({ rating,forShop}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star
          key={i}
          fontSize={forShop ? "medium" : "small"}
          className={`mr-1 text-[#f6b100] cursor-pointer`}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalf
          key={i}
          fontSize={forShop ? "medium" : "small"}
          className={`mr-1 text-[#f6b100] cursor-pointer`}
        />
      );
    } else {
      stars.push(
        <StarOutline
          key={i}
          fontSize={forShop ? "medium" : "small"}
          className={`mr-1 text-[#f6b100] bg-white cursor-pointer`}
        />
      );
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

export default Ratings;