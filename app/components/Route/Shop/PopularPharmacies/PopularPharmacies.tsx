import React, { useEffect } from "react";
import ProductCard from "../../MedicineCard/MedicineCard";
import { styles } from "@/app/styles/styles";
import { pharmacyData } from "@/app/static/data";
import ShopCard from "../ShopCard/ShopCard";

const PopularPharmacies = () => {
   
  return (
    <div className="pt-8">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Pharmacies In Your Area</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {
            pharmacyData && pharmacyData.length !== 0 && (
              <>
               {pharmacyData && pharmacyData.map((i, index) => <ShopCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default PopularPharmacies;