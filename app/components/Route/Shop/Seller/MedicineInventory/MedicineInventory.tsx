'use client'

import { useEffect, useState } from "react"
import { Search, ChevronsUpDown, ChevronDown,Menu, ChevronRight, Edit, Eye, Trash2, Image as ImageIcon, ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useBulkUpdateMedicineAvailabilityMutation, useDeleteMedicineMutation, useGetMedicinesForInventoryQuery, useUpdateMedicineAvailabilityMutation } from "@/redux/features/medicine/medicineApi"
import toast from "react-hot-toast"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"




interface PackSize {
  id: string
  quantity: number
  listPrice: number
  sellingPrice: number
  isAvailable: boolean
}

interface Medicine {
  _id: string
  name: string
  category: string
  productForm: string
  listPrice?: number
  sellingPrice?: number
  isAvailable?: boolean
  haveVariant: boolean
  packSize?: PackSize[]
  prescriptionRequired: boolean
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1);

  const {
      data,
      isLoading,
      refetch
    } = useGetMedicinesForInventoryQuery(
      { page, search: searchQuery },
      {refetchOnMountOrArgChange: true }
    )

   const [updateMedicineAvailability,{isSuccess,isLoading:singleMedicineUpdating,error}] = useUpdateMedicineAvailabilityMutation();
   const [bulkUpdateMedicineAvailability,{isSuccess:bulkMedicineSuccess,data:bulkMedicineResponse,isLoading:bulkMedicineUpdating,error:bulkMedicineError}] = useBulkUpdateMedicineAvailabilityMutation();
   const [deleteMedicine,{
    isSuccess:deleteMedicineSuccess,
    data:deleteMedicineResponse,
    isLoading:deletingMedicine,
    error:deleteMedicineError
  }] = useDeleteMedicineMutation();

   const [medicines, setMedicines] = useState<Medicine[]>([])


  useEffect(() => {
    if (data && data.medicines) {
      setMedicines(data.medicines);
    }
  }, [data]);
  
  useEffect(()=>{
    if (isSuccess) {
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[isSuccess,error])

  useEffect(()=>{
    if (bulkMedicineSuccess) {
      toast.success(bulkMedicineResponse.message);
      refetch();
      setSelectedMedicines(new Set());
    }
    if (bulkMedicineError) {
      if ("data" in bulkMedicineError) {
        const errorMessage = bulkMedicineError as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[bulkMedicineSuccess,bulkMedicineError])


  useEffect(()=>{
    if (deleteMedicineSuccess) {    
      toast.success(deleteMedicineResponse.message);
      refetch();    
      setDeleteDialogOpen(false)
    }
    if (deleteMedicineError) {
      if ("data" in deleteMedicineError) {
        const errorMessage = deleteMedicineError as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[deleteMedicineSuccess,deleteMedicineError])


  const [selectedMedicines, setSelectedMedicines] = useState<Set<string>>(new Set())
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null)

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedMedicines)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedMedicines(newSelection)
  }

  const handleAvailabilityChange = async(medicineId: string, currentAvailability: boolean, quantity?: number) => {
         
    await updateMedicineAvailability({medicineId,quantity,isAvailable: !currentAvailability});

    // setMedicines(prevMedicines => 
    //   prevMedicines.map(medicine => {
    //     if (medicine._id === medicineId) {
    //       if (dosageOrQuantity && medicine.packSize) {
    //         return {
    //           ...medicine,
    //           packSize: medicine.packSize.map(variant => 
    //             variant.dosageOrQuantity === dosageOrQuantity ? { ...variant, isAvailable: !variant.isAvailable } : variant
    //           )
    //         }
    //       } else {
    //         return { ...medicine, isAvailable: !medicine.isAvailable }
    //       }
    //     }
    //     return medicine
    //   })
    // )
  }

  const toggleRowExpand = (id: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id)
    } else {
      newExpandedRows.add(id)
    }
    setExpandedRows(newExpandedRows)
  }

  const handleDelete = (id: string) => {
    setMedicineToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async() => {
    if (medicineToDelete) {
      
    await deleteMedicine({medicineId:medicineToDelete});  
      // setMedicines(prevMedicines => prevMedicines.filter(medicine => medicine._id !== medicineToDelete))
      // setSelectedMedicines(prevSelected => {
      //   const newSelected = new Set(prevSelected)
      //   newSelected.delete(medicineToDelete)
      //   return newSelected
      // })
    }
    setMedicineToDelete(null)
  }

  const setAllAvailable = async(available: boolean) => {
    const medicineIds = Array.from(selectedMedicines);    
    await bulkUpdateMedicineAvailability({medicineIds,isAvailable:available})
    // setMedicines(prevMedicines => 
    //   prevMedicines.map(medicine => {
    //     if (selectedMedicines.has(medicine._id)) {
    //       if (medicine.haveVariant && medicine.packSize) {
    //         return {
    //           ...medicine,
    //           packSize: medicine.packSize.map(variant => ({ ...variant, isAvailable: available }))
    //         }
    //       } else {
    //         return { ...medicine, isAvailable: available }
    //       }
    //     }
    //     return medicine
    //   })
    // )
  }

  const subheadingClass = "font-medium text-sm text-muted-foreground"

  return (
    // <div className="bg-gray-50 py-8">
    //   <div className="container">
    //     <div className="mb-8">
    //       <h1 className="text-3xl font-bold text-gray-800 mb-6">Medicine Inventory</h1>
    //       <div className="flex justify-between items-center mb-6">
    //         <div className="relative flex-1 max-w-sm">
    //           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
    //             <Input 
    //                value={searchQuery}
    //                onChange={(e) => setSearchQuery(e.target.value)}
    //                placeholder="Search medicines..." 
    //                className="pl-8 bg-white border-gray-200"
    //                />
    //               <button
    //                 onClick={()=>refetch()}
    //                  className="bg-myPrimary cursor-pointer shadow-sm text-white rounded-sm absolute right-1 bottom-1.5">
    //                  <ArrowRight size={28} className=""/>
    //               </button>
                       
    //         </div>
    //         <div className="flex gap-2 items-center">
    //           <span className="text-sm text-gray-600">
    //             {selectedMedicines.size} item{selectedMedicines.size !== 1 ? 's' : ''} selected
    //           </span>
    //           <Button variant="outline" onClick={() => setAllAvailable(true)} disabled={selectedMedicines.size === 0}>
    //             Set Available
    //           </Button>
    //           <Button variant="outline" onClick={() => setAllAvailable(false)} disabled={selectedMedicines.size === 0}>
    //             Set Unavailable
    //           </Button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded-lg shadow-md overflow-hidden">
    //       <Table>
    //         <TableHeader>
    //           <TableRow className="bg-navbar text-white">
    //             <TableHead className="w-12"></TableHead>
    //             <TableHead> 
    //                Medicine
    //             </TableHead>
    //             <TableHead>Category</TableHead>
    //             <TableHead>Form</TableHead>
    //             <TableHead>Price</TableHead>
    //             <TableHead>Prescription</TableHead>
    //             <TableHead>Availability</TableHead>
    //             <TableHead>Actions</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {medicines.map((medicine) => (
    //             <>
    //               <TableRow key={medicine._id} className="border-b border-gray-200">
    //                 <TableCell>
    //                   <Checkbox
    //                     checked={selectedMedicines.has(medicine._id)}
    //                     onCheckedChange={() => toggleSelection(medicine._id)}
    //                   />
    //                 </TableCell>
    //                 <TableCell className="font-medium">
    //                   <div className="flex items-center gap-3">
    //                     <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
    //                       <ImageIcon className="h-8 w-8 text-gray-400" />
    //                     </div>
    //                     {medicine.name}
    //                   </div>
    //                 </TableCell>
    //                 <TableCell>{medicine.category}</TableCell>
    //                 <TableCell>{medicine.productForm}</TableCell>
    //                 <TableCell>
    //                   {!medicine.haveVariant && `₹${medicine.price}`}
    //                 </TableCell>
    //                 <TableCell>
    //                   {medicine.prescriptionRequired ? (
    //                     <Badge className="bg-blue-100 text-blue-800">Required</Badge>
    //                   ) : (
    //                     <Badge variant="outline" className="text-gray-600">Not Required</Badge>
    //                   )}
    //                 </TableCell>
    //                 <TableCell>
    //                   {medicine.haveVariant ? (
    //                     <div className="flex items-center gap-2">
    //                       <Badge variant="outline" className="text-gray-600">Multiple Variants</Badge>
    //                       <Button
    //                         variant="ghost"
    //                         size="icon"
    //                         onClick={() => toggleRowExpand(medicine._id)}
    //                         aria-label={expandedRows.has(medicine._id) ? "Collapse variants" : "Expand variants"}
    //                       >
    //                         {expandedRows.has(medicine._id) ? (
    //                           <ChevronDown className="h-4 w-4" />
    //                         ) : (
    //                           <ChevronRight className="h-4 w-4" />
    //                         )}
    //                       </Button>
    //                     </div>
    //                   ) : (
    //                     <Switch
    //                       disabled={singleMedicineUpdating}
    //                       checked={medicine.isAvailable}
    //                       onCheckedChange={() => handleAvailabilityChange(medicine._id,medicine.isAvailable as boolean)}
    //                     />
    //                   )}
    //                 </TableCell>
    //                 <TableCell>
    //                   <div className="flex items-center gap-2">
    //                     <Button variant="ghost" size="icon">
    //                       <Eye className="h-5 w-5" />
    //                     </Button>
    //                     <Button variant="ghost" size="icon">
    //                       <Link href={`/seller/edit-medicine/${medicine._id}`}>
    //                         <Edit className="h-5 w-5" />
    //                       </Link>
    //                     </Button>
    //                     <Button variant="ghost" size="icon" onClick={() => handleDelete(medicine._id)}>
    //                       <Trash2 className="h-5 w-5 text-red-600" />
    //                     </Button>
    //                   </div>
    //                 </TableCell>
    //               </TableRow>
    //               {medicine.haveVariant && expandedRows.has(medicine._id) && medicine.packSize?.map((variant) => (
    //                 <TableRow key={variant.dosageOrQuantity} className="bg-gray-50 border-b border-gray-200">
    //                   <TableCell></TableCell>
    //                   <TableCell>
    //                     <div className="flex items-center gap-3">
    //                       <div className="w-14 h-14 flex items-center justify-center">
    //                         {/* Placeholder to align with parent row */}
    //                       </div>
    //                       <span className={cn(subheadingClass)}>{variant.dosageOrQuantity}</span>
    //                     </div>
    //                   </TableCell>
    //                   <TableCell></TableCell>
    //                   <TableCell></TableCell>
    //                   <TableCell>₹{variant.price}</TableCell>
    //                   <TableCell></TableCell>
    //                   <TableCell>
    //                     <Switch
    //                      disabled={singleMedicineUpdating}
    //                      checked={variant.isAvailable}
    //                       onCheckedChange={() => handleAvailabilityChange(medicine._id, variant.isAvailable,variant.dosageOrQuantity)}
    //                     />
    //                   </TableCell>
    //                   <TableCell></TableCell>
    //                 </TableRow>
    //               ))}
    //             </>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </div>

    //     {data && data.totalPages > 1 && (
    //       <div className="mt-4 flex items-center justify-between">
    //         <p className="text-sm text-gray-600">
    //           Showing {medicines.length} of {data.totalMedicines} results
    //         </p>
    //         <Pagination>
    //           <PaginationContent>
    //             <PaginationItem>
    //               <PaginationPrevious 
    //                 href="#" 
    //                 onClick={() => setPage(prev => Math.max(prev - 1, 1))}
    //                 className={page === 1 ? 'pointer-events-none opacity-50' : ''}
    //               />
    //             </PaginationItem>
    //             {[...Array(data.totalPages)].map((_, index) => (
    //               <PaginationItem key={index}>
    //                 <PaginationLink 
    //                   href="#" 
    //                   onClick={() => setPage(index + 1)}
    //                   isActive={page === index + 1}
    //                 >
    //                   {index + 1}
    //                 </PaginationLink>
    //               </PaginationItem>
    //             ))}
    //             <PaginationItem>
    //               <PaginationNext 
    //                 href="#" 
    //                 onClick={() => setPage(prev => Math.min(prev + 1, data.totalPages))}
    //                 className={page === data.totalPages ? 'pointer-events-none opacity-50' : ''}
    //               />
    //             </PaginationItem>
    //           </PaginationContent>
    //         </Pagination>
    //       </div>
    //     )}
    //   </div>

    //   <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    //     <AlertDialogContent>
    //       <AlertDialogHeader>
    //         <AlertDialogTitle>Are you sure you want to delete this medicine?</AlertDialogTitle>
    //         <AlertDialogDescription>
    //           This action cannot be undone. This will permanently delete the medicine from your inventory.
    //         </AlertDialogDescription>
    //       </AlertDialogHeader>
    //       <AlertDialogFooter>
    //         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //         <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white" onClick={confirmDelete}>{deletingMedicine ? 'Deleting...' : 'Delete'}</AlertDialogAction>
    //       </AlertDialogFooter>
    //     </AlertDialogContent>
    //   </AlertDialog>
    // </div>


    <div className="bg-gray-50 py-4 sm:py-8">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Medicine Inventory</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines..."
              className="pl-8 bg-white border-gray-200 w-full"
            />
            <button
              onClick={() => refetch()}
              className="bg-myPrimary cursor-pointer shadow-sm text-white rounded-sm absolute right-1 bottom-1.5"
            >
              <ArrowRight size={28} className="" />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-Outfit text-gray-600">
              {selectedMedicines.size} item{selectedMedicines.size !== 1 ? "s" : ""} selected
            </span>
            <Button variant="outline" onClick={() => setAllAvailable(true)} disabled={selectedMedicines.size === 0}>
              Set Available
            </Button>
            <Button variant="outline" onClick={() => setAllAvailable(false)} disabled={selectedMedicines.size === 0}>
              Set Unavailable
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-navbar text-white">
              <TableHead className="w-12"></TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Form</TableHead>
              <TableHead className="hidden lg:table-cell">Price</TableHead>
              <TableHead className="hidden xl:table-cell">Prescription</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine) => (
              <>
                <TableRow key={medicine._id} className="border-b border-gray-200">
                  <TableCell>
                    <Checkbox
                      checked={selectedMedicines.has(medicine._id)}
                      onCheckedChange={() => toggleSelection(medicine._id)}
                      className="text-white"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-700 font-Outfit">
                    <div className="flex items-center gap-3">
                      <div className="min-w-[2.5rem] w-10 h-10 sm:w-14 sm:h-14 bg-gray-200 rounded-md flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                      <span className="text-sm sm:text-base line-clamp-1">{medicine.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{medicine.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{medicine.productForm}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {!medicine.haveVariant && `₹${medicine.sellingPrice}`}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {medicine.prescriptionRequired ? (
                      <Badge className="bg-blue-100 text-blue-800">Required</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-600">
                        Not Required
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {medicine.haveVariant ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-gray-600">
                          Multiple
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleRowExpand(medicine._id)}
                          aria-label={expandedRows.has(medicine._id) ? "Collapse variants" : "Expand variants"}
                        >
                          {expandedRows.has(medicine._id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Switch
                        disabled={singleMedicineUpdating}
                        checked={medicine.isAvailable}
                        onCheckedChange={() =>
                          handleAvailabilityChange(medicine._id, medicine.isAvailable as boolean)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Link href={`/seller/edit-medicine/${medicine._id}`}>
                            <Edit className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(medicine._id)}>
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </Button>
                      </div>
                      <div className="sm:hidden ">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Menu className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white" align="end">
                            <DropdownMenuItem className="hover:bg-gray-100">
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>                          
                          <Link href={`/seller/edit-medicine/${medicine._id}`} className="">
                            <DropdownMenuItem className="hover:bg-gray-100 w-full">
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem> 
                             </Link>
                            <DropdownMenuItem className="hover:bg-gray-100" onClick={() => handleDelete(medicine._id)}>
                              <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                {medicine.haveVariant &&
                  expandedRows.has(medicine._id) &&
                  medicine.packSize?.map((variant) => (
                    <TableRow key={variant.quantity} className="bg-gray-50 border-b border-gray-200">
                      <TableCell></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                            {/* Placeholder to align with parent row */}
                          </div>
                          <span className={cn(subheadingClass, "text-sm")}>{variant.quantity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell"></TableCell>
                      <TableCell className="hidden md:table-cell"></TableCell>
                      <TableCell className="hidden lg:table-cell">₹{variant.sellingPrice}</TableCell>
                      <TableCell className="hidden xl:table-cell"></TableCell>
                      <TableCell>
                        <Switch
                          disabled={singleMedicineUpdating}
                          checked={variant.isAvailable}
                          onCheckedChange={() =>
                            handleAvailabilityChange(medicine._id, variant.isAvailable, variant.quantity)
                          }
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing {medicines.length} of {data.totalMedicines} results
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(data.totalPages)].map((_, index) => (
                <PaginationItem key={index} className="hidden sm:inline-block">
                  <PaginationLink href="#" onClick={() => setPage(index + 1)} isActive={page === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((prev) => Math.min(prev + 1, data.totalPages))}
                  className={page === data.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>

    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this medicine?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the medicine from your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white" onClick={confirmDelete}>
            {deletingMedicine ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>

  )
}