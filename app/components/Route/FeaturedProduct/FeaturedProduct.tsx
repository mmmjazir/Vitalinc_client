import React, { useEffect } from "react";
import ProductCard from "../MedicineCard/MedicineCard";
import { styles } from "@/app/styles/styles";
import { productData } from "@/app/static/data";
import StaticMedicineCard from "../Medicines/StaticMedicineCard";

const FeaturedProduct = () => {
   
  return (
    <div className="pb-12">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Most Searched Medicines</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-6 xl:gap-[20px] mb-12 border-0">
        {
            productData && productData.length !== 0 &&(
              <>
               {productData && productData.map((i, index) => <StaticMedicineCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;