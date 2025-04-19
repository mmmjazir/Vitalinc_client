'use client'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styles } from "@/app/styles/styles";
import { productData } from "@/app/static/data";
import ProductCard from "../MedicineCard/MedicineCard";

const BestDeals = () => {
  const [data, setData] = useState([]) as any;
  useEffect(() => {
    const sortedData = productData && productData?.sort((a,b) => b.total_sell - a.total_sell); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, []);
  

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i:any, index:number) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;