"use client";
import React, { Suspense } from "react";
import Header from "./components/Layout/Header";
import Hero from "./components/Route/Hero/Hero";
import Categories from "./components/Route/Categories/Categories";
import FeaturedProduct from "./components/Route/FeaturedProduct/FeaturedProduct";
import Footer from "./components/Layout/Footer";
import PopularBrands from "./components/Route/PopularBrands/PopularBrands";
import PopularPharmacies from "./components/Route/Shop/PopularPharmacies/PopularPharmacies";
import HeaderSkeleton from "./components/Layout/HeaderSkeleton";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen">
      <Suspense fallback={<HeaderSkeleton navbarOnly={false} />}>
         <Header navbarOnly={false} activeHeading={1} />
      </Suspense>
      
      <main className="flex-grow">
        <Hero />
        <Categories />
        <PopularBrands />
        <PopularPharmacies />
        <FeaturedProduct />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
