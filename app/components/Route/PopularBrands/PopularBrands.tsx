"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

const brands = [
  "https://medicinespatentpool.org/uploads/2020/04/Sun-Pharma.png",
  "https://i3.wp.com/upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cipla_logo.svg/2560px-Cipla_logo.svg.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSvQImFB9fh-KbJW1A98st2Ooz_SJ-tySIuQ&s",
  "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Dr._Reddy%27s_Laboratories_logo.svg/1280px-Dr._Reddy%27s_Laboratories_logo.svg.png",
  "https://www.sap.com/dam/application/shared/logos/customer/h-q/lupin-customer-logo.png",
  "https://purepng.com/public/uploads/large/purepng.com-abbott-logologobrand-logoiconslogos-251519939912nuzls.png",
  "https://logos-world.net/wp-content/uploads/2023/09/Roche-Logo.png",
  "https://liafarm.gr/images/clients/amgen_logo.png",
  "https://logos-world.net/wp-content/uploads/2023/09/MSD-Logo.png",
  "https://www.zilliondesigns.com/images/portfolio/pharmacy-lab/Sanofi-logo-2011.png",
];
const PopularBrands = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Brands</h2>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {brands.map((brand, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/8"
              >
                <Card className="border-none shadow-md">
                  {/* <CardContent className="flex aspect-square items-center justify-center p-4">
                    <img
                      src={brand || "/placeholder.svg"}
                      alt={`Brand ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </CardContent> */}
                  <CardContent className="flex aspect-square items-center justify-center p-4 relative">
                    <Image
                      src={brand || "/placeholder.svg"}
                      alt={`Brand ${index + 1}`}
                      fill
                      quality={100}
                      className="object-contain p-3"
                      sizes="100vw"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            stroke={4}
            className="text-white max-md:hidden shadow-md bg-mySecondary"
          />
          <CarouselNext
            stroke={4}
            className="text-white shadow-md max-md:hidden bg-mySecondary"
          />
        </Carousel>
        <div className="flex justify-center mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full mx-1 transition-all duration-300",
                current === index ? "bg-primary w-4" : "bg-gray-300"
              )}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
