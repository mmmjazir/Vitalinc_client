import { styles } from "@/app/styles/styles";
import { Search } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-[40vh] md:min-h-[50vh] flex justify-center items-center px-4 md:px-8 lg:px-16 bg-gradient-to-bl from-blue-300 to-gray-100 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Find Medicines Nearby
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Locate nearby pharmacies, check medicine availability, and get
            accurate health information.
          </p>
          <Link href="/medicines" className="inline-block">
            <div
              className={`${styles.button} px-6 py-3 text-white flex items-center gap-2`}
            >
              <span className="text-base md:text-lg">Start Your Search</span>
              <Search />
            </div>
          </Link>
        </div>
        {/* <div className="w-full md:w-1/2 hidden md:block">
        <img src="/assets/hero1.png" alt="Hero" className="w-full h-auto" />
      </div> */}
        <div className="w-full md:w-1/2 hidden md:block">
          <div className="relative w-full h-auto aspect-[4/3]">
            <Image
              src="/assets/hero1.png"
              alt="Hero"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
