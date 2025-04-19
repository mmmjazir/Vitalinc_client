import MedicineCard from '@/app/components/Route/MedicineCard/MedicineCard'
import { Input } from '@/components/ui/input'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productData } from '@/app/static/data';
import { Search } from 'lucide-react';
import CustomSelect from '@/app/utils/CustomSelect';
import { useGetMedicinesByPharmacyQuery } from '@/redux/features/medicine/medicineApi';
import MedicineCardSkeleton from './MedicineCardSkeleton';
import { Pagination } from '@/app/utils/CustomPagination';
import { debounce } from 'lodash';
import { useToggleMedicineFavoriteMutation } from '@/redux/features/user/userApi';

type Props = {
  pharmacyId: string
}

const sortOptions = [
  { value: '', label: 'Default sorting' },
  { value: 'latest', label: 'Sort by latest' },
  { value: 'priceLowToHigh', label: 'Sort by price: low to high' },
  { value: 'priceHighToLow', label: 'Sort by price: high to low' },
]

const MedicinesTab = ({pharmacyId}: Props) => {
  const [page,setPage] = useState(1);
  const [searchQuery,setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sort,setSort] = useState('');
  const {
    data,isSuccess,error,isFetching,isLoading,refetch
  } = useGetMedicinesByPharmacyQuery({
   pharmacyId,
   page,
   searchQuery: debouncedQuery,
   sort
  },{refetchOnMountOrArgChange:true})


  const [toggleMedicineFavorite,{data:res}] = useToggleMedicineFavoriteMutation();

  const handleToggleFavorite = async ({medicineId}: any) => {
    await toggleMedicineFavorite({
      medicineId,
      source: {
        type: "getMedicinesByPharmacy",
        params: {pharmacyId,page,searchQuery:debouncedQuery,sort}
      },
    })
  }

  const debouncedSearch = useMemo(
   () =>
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 400),
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value); 
  };

  const handleSortChange = (value: string) => {
     setSort(value)
  }
  return (
    <div className="shadow-md min-h-[100vh] rounded-md px-5 py-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-8">
        <div className="relative flex-grow max-w-2xl">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter Medicine Name"
            className="py-2 font-Outfit pr-20 bg-white text-[16px] ring-transparent ring-offset-transparent rounded-md !outline-none"
          />
          <button className="absolute right-0 top-0 h-full px-4 flex items-center gap-2 text-white bg-myPrimary rounded-r-md">
            <Search size={20} />
            <span className="text-[17px] font-medium font-Poppins hidden sm:inline">
              Search
            </span>
          </button>
        </div>

        <div className="w-full md:w-60 z-[10]">
         <CustomSelect
            options={sortOptions}
            defaultValue=""
            onChange={handleSortChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-10 pt-10 px-4 border-t">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MedicineCardSkeleton key={index} shopDetails={false} />
          ))
        ) : data && data.medicines.length !== 0 ? (
          // Render actual medicine cards when data is available
          data.medicines.map((i, index) => (
            <MedicineCard data={i} key={index} handleToggleFavorite={handleToggleFavorite} className='h-[220px]'/>
          ))
        ) : error ? (
          // Render a message when no medicines are found
          <div className="col-span-full text-center text-red-500">
           Error fetching medicines. Please try again later.

           <button onClick={refetch} className='bg-gray-400 text-gray-800 py-2 px-4 rounded-md'>Refresh</button>
        </div>
        ):(
          <div className="col-span-full text-center text-gray-500">
          No medicines found.
        </div>
        )}
        </div>
      </div>

      {!isLoading && !isFetching && data?.pagination.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
              />
            )}
    </div>
  )
}

export default MedicinesTab

