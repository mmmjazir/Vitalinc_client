"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {};

const sampleData = {
  categories: [
    {
      name: "DIABETES",
      subcategories: [
        "Juices & Vinegars",
        "Blood Glucose Monitors",
        "Sugar Free",
        "Diabetic Medicines",
        "Sugar Substitutes",
      ],
    },
    {
      name: "PERSONAL CARE",
      subcategories: ["Skin Care", "Hair Care", "Oral Care"],
    },
    {
      name: "IMMUNITY BOOSTERS",
      subcategories: ["Herbal Supplements", "Vitamins", "Minerals"],
    },
    {
      name: "HEALTHCARE DEVICES",
      subcategories: ["BP Monitors", "Thermometers", "Oximeters"],
    },
  ],
  filters: {
    BRANDS: [
      { name: "SBL", count: 93 },
      { name: "Dr. Reckeweg", count: 69 },
      { name: "OneTouch", count: 44 },
      { name: "Accu-Chek", count: 30 },
      { name: "Tata 1mg", count: 27 },
    ],
    USES: [
      { name: "Diabetes Care", count: 3581 },
      { name: "Skin Care", count: 273 },
      { name: "Immunity Booster", count: 207 },
      { name: "Bone, Joint & Muscle Care", count: 177 },
    ],
    PRODUCT_TAGS: [
      { name: "Homeopathic", count: 125 },
      { name: "Antioxidant", count: 55 },
      { name: "Indigestion", count: 60 },
      { name: "Urination", count: 89 },
    ],
    PRODUCT_FORM: [
      { name: "Tablet", count: 283 },
      { name: "Capsule", count: 297 },
      { name: "Liquid", count: 182 },
      { name: "Powder", count: 354 },
      { name: "Syrup", count: 33 },
    ],
  },
};

const SidebarFilter = (props: Props) => {
  const [expandedCategory, setExpandedCategory] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleCategory = (index: number) => {
    setExpandedCategory((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="font-Poppins bg-slate-50 px-2 py-1 rounded-md sticky w-full">
      <div className="font-bold text-[14px] mb-2 mt-4 border-b pb-3 w-[80%]">
        FILTERS
      </div>
      {/* Filter by Brands */}
      <div className="w-full">
        <h1 className="font-bold text-[14px] mb-4 mt-8">BRANDS</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search Brands"
              className="border-2 p-1 w-full placeholder:text-sm px-3 rounded-md mb-4 outline-primary"
            />
          </div>

          <div className="max-h-[10rem] overflow-y-scroll custom-scrollbar">
            {sampleData.filters.BRANDS.map((brand, index) => (
              <div key={index} className="flex gap-3 mb-4 items-center pr-5">
                <Checkbox />
                <div className="flex w-full justify-between">
                  <p className="text-black text-[12px]">{brand.name}</p>
                  <p className="text-[10px]">({brand.count})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter by Product Form */}
      <div className="w-full">
        <h1 className="font-bold text-[14px] mb-4 mt-8">PRODUCT FORM</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search Product Form"
              className="border-2 w-full p-1 px-3 rounded-md placeholder:text-sm mb-4  outline-primary"
            />
          </div>

          <div className="max-h-[10rem] overflow-y-scroll custom-scrollbar">
            {sampleData.filters.PRODUCT_FORM.map((form, index) => (
              <div key={index} className="flex gap-3 mb-4 items-center pr-5">
                <Checkbox />
                <div className="flex w-full justify-between">
                  <p className="text-black text-[12px]">{form.name}</p>
                  <p className="text-[10px]">({form.count})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="font-bold text-[14px] mb-4 mt-8">PRESCRIPTION REQUIRED</h1>
        <div>
        

          <div className="max-h-[10rem] overflow-y-scroll custom-scrollbar">
            {["Required", "Not Required" ].map((form, index) => (
              <div key={index} className="flex gap-3 mb-4 items-center pr-5">
                <Checkbox />
                <div className="flex w-full justify-between">
                  <p className="text-black text-[12px]">{form}</p>
                  <p className="text-[10px]">({54})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
