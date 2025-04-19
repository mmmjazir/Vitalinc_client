import React, { FC } from "react";
import { useEffect } from "react";
import { styles } from "@/app/styles/styles";
import { AlarmOn, Cancel, CheckCircle, FavoriteBorderOutlined, FavoriteOutlined, GpsFixed, LocationOn, MoreVert } from "@mui/icons-material";
import Ratings from "@/app/components/Products/Ratings";
import { Heart } from "lucide-react";

type Props={
    data:any;
}

const ShopCard:FC<Props> = ({ data }) => {


  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-md p-3 py-4 relative cursor-pointer">
        <div className="flex justify-end"></div>
        
         <div className="flex justify-between">

          <h4 className="pb-3 text-[17px] font-[500]">
            {data.name}
          </h4>
        <Heart className="text-gray-500"/>
        </div>
          <div className="flex items-center gap-2">
           <p className="bg-myPrimary px-2 py-[2px] rounded-xl font-medium text-white text-[13px]">{data.rating}</p> 
          <Ratings forShop={false} rating={data?.rating} />
          <p className="font-Poppins text-[14px] text-gray-500 font-light">{data.reviewsCount + " "}Ratings</p>
          </div>
         <div className="flex gap-1 justify-start items-center mt-5 font-Roboto text-[15px]">
         <LocationOn sx={{color: "gray"}}/>
         <span>{data.address.length > 34 ? data.address.slice(0,34) + "..." : data.address}</span>
         </div>

         <div className="mt-3 flex gap-2 items-center">
        <AlarmOn sx={{color: "#FF5722"}}/>
       <p className="text-sm text-gray-600 p-1 font-medium"><span className="font-Poppins text-myPrimary">Open</span> until 8:00 pm</p>
         </div>
        
        {/* <div className={`mt-3 relative leading-4 bg-gray-100 py-[2px] rounded-md px-2 inline-block text-gray-600 font-medium text-[12px]`}>
            {data.deliveryAvailable ? "Delivery Available" : "Delivery Unavailable"}
           <span className={`${data.deliveryAvailable ? "text-primary" : "text-secondary"} ml-2`}>
            {data.deliveryAvailable ? <CheckCircle fontSize="small"/> : <Cancel fontSize="small"/> }
            </span>
        </div> */}

        <div className="mt-6 flex items-center justify-between">
           <div className="text-white font-Josefin bg-myPrimary px-5 py-[5px] rounded-md flex gap-2 items-center">
           <GpsFixed fontSize={"small"} sx={{color: "white", }}/>
            Get Directions
         </div>
          <div className="flex h-fit bg-gray-200 px-1 py-1 items-center leading-4 rounded-md">
            <p className="font-Poppins text-gray-400 text-[12px]">
             More
            </p>
            <MoreVert fontSize="small"/>
          </div>
        </div>

      </div>
    </>
  );
};

export default ShopCard;