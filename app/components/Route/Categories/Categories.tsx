import React from "react";
import { brandingData, categoriesData } from "../../../static/data";
import { styles } from "@/app/styles/styles";

const Categories = () => {
    return (

    <>
    <div className={`${styles.section} w-full`}>
      <div className="bg-gray-600 text-white p-4 w-full text-center">
        <h2 className="text-lg md:text-2xl font-semibold">
          Vitalinc: Your Local Guide to Medicine Availability and Information
        </h2>
      </div>
    </div>

    <div className={`${styles.section} my-8`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-sm">
        {brandingData.map((i, index) => (
          <div className="flex items-start" key={index}>
            <i.icon sx={{ color: "#FFD101", fontSize: 35 }} />
            <div className="ml-4">
              <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
              <p className="text-xs md:text-sm">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
      <div className={`${styles.heading} mb-6`}>
        <h2 className="text-2xl md:text-3xl font-bold">Find Medicine By Category</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoriesData.map((i) => (
          <div
            className="flex flex-col items-center justify-center p-4 hover:shadow-lg rounded-xl cursor-pointer transition-all duration-300"
            key={i.id}
          >
            <i.icon className="text-mySecondary text-3xl md:text-4xl mb-2" />
            <h5 className="text-sm md:text-base font-medium text-center">{i.title}</h5>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default Categories;