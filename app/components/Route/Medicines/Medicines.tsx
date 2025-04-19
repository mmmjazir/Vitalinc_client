'use client'

import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
import MedicineCard from "../MedicineCard/MedicineCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllMedicinesQuery } from "@/redux/features/medicine/medicineApi";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import MedicineCardSkeleton from "../Shop/PharmacyProfile/Sections/MedicinesTab/MedicineCardSkeleton";
import { useToggleMedicineFavoriteMutation } from "@/redux/features/user/userApi";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "latest", label: "Sort by Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const Medicines = () => {
  const location = useSelector((state: any) => state.location);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams?.get("page") || "1");
  const searchQuery = searchParams?.get("medicineQuery") || "";
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);


  const hasValidLocation = 
  location?.coordinates?.lat && 
  location?.coordinates?.lng && 
  typeof location.coordinates.lat === 'number' && 
  typeof location.coordinates.lng === 'number';

  const { data, isLoading, isFetching } = useGetAllMedicinesQuery(
    {
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
      searchQuery,
      sort: selectedSort.value,
      page: currentPage,
    },
    { 
      refetchOnMountOrArgChange: true,
      skip: !hasValidLocation
    }
  );


  const handlePageClick = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const [toggleMedicineFavorite, { data: res }] =
    useToggleMedicineFavoriteMutation();

  const handleToggleFavorite = async ({ medicineId }: any) => {
    await toggleMedicineFavorite({
      medicineId,
      source: {
        type: "getAllMedicines",
        params: {
          page: currentPage,
          searchQuery,
          sort: selectedSort.value,
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        },
      },
    });
  };

  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="w-full md:max-w-[80%] max-md:min-h-[calc(100vh-190px)] md:min-h-[calc(100vh-136px)] bg-white max-md:max-w-full max-md:px-[2rem] overflow-x-hidden py-8 mx-auto">
      <div className="w-full">
        <div className="flex gap-[2px] px-5 font-Outfit items-center border-b pb-3 w-full">
          <Link href="/">
            <p className="text-secondary  text-[15px] font-medium">Home</p>
          </Link>
          <ChevronRight size={15} className="text-secondary" />
          <p className="text-[15px]">Medicines</p>
        </div>
        {hasValidLocation && (
          <div className="px-4 py-3 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              {isLoading && !data ? (
                <Skeleton className="w-[85px] h-5 bg-gray-100" />
              ) : (
                <p className="text-sm text-gray-500 mb-2 font-Outfit sm:mb-0">
                  {data?.count} {data?.count === 1 ? "result" : "results"} found
                </p>
              )}

              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-2">Sort by:</p>
                <Popover open={sortOpen} onOpenChange={setSortOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] font-medium font-Outfit text-gray-700 justify-between"
                    >
                      {selectedSort.label}
                      <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] bg-white p-0">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <PopoverClose key={option.value} asChild>
                          <div
                            key={option.value}
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                            onClick={() => setSelectedSort(option)}
                          >
                            {option.label}
                            {option.value === selectedSort.value && (
                              <ArrowUpDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </PopoverClose>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}


{!hasValidLocation ? (
          // Fallback message when location is not enabled or invalid
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-200 p-4 rounded-full mb-4">
              <Search className="h-10 w-10 text-gray-500" />
            </div>
            <h4 className="text-gray-700 font-medium text-lg mb-2">
              Location Required
            </h4>
            <p className="text-gray-500 text-center max-w-md">
              Please enable your location to discover nearby available medicines. We need your location to show you medicines that are available in your area.
            </p>
          </div>
        ) : (
        <>
          <div className="mt-12 max-md:px-[1.4rem] md:pl-6">
            <div
              className="grid grid-cols-1 gap-x-7 gap-y-7 md:grid-cols-2 md:gap-x-[20px] md:gap-y-[30px] 
              lg:grid-cols-4 lg:gap-x-[25px] lg:gap-y-[35px] xl:grid-cols-5 xl:gap-x-[20px] xl:gap-y-[30px] 
              mb-12 border-0"
            >
              {isLoading ||
                (isFetching &&
                  Array.from({ length: 15 }).map((_, index) => (
                    <MedicineCardSkeleton key={index} shopDetails={true} />
                  )))}
              {!isLoading &&
                data &&
                data.medicines &&
                data.medicines.length !== 0 && (
                  <>
                    {data &&
                      data.medicines.map((i, index) => (
                        <MedicineCard
                          handleToggleFavorite={handleToggleFavorite}
                          data={i}
                          key={index}
                          className="h-[230px]"
                        />
                      ))}
                  </>
                )}
            </div>
          </div>
        </>
      )}
        {data && data.totalPages > 1 && (
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageClick(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {/* Generate pagination links dynamically */}
                {[...Array(data.totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageClick(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageClick(currentPage + 1)}
                    aria-disabled={currentPage === data.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {data?.count === 0 && (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="bg-gray-200 p-4 rounded-full mb-4">
              <Search className="h-10 w-10 text-gray-500" />
            </div>
            <h4 className="text-gray-700 font-medium text-lg mb-2">
              No medicines found
            </h4>
            <p className="text-gray-500 text-center max-w-md">
                  No medicines found{searchQuery && ` matching "${searchQuery}"`} in your selected location. Try expanding your search area or exploring alternative options.
                </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
