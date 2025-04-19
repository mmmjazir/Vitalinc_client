'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronsUpDown, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { medicineCategories, marketers, medicineContainers } from "@/app/static/data"
import CategorySelector from "./CategorySelector"
import ManufacturerSelector from "./ManufacturerSelector"
import ProductFormSelector from "./ProductFormSelector"

interface DetailsTabProps {
  medicine: any;
  setMedicine: React.Dispatch<React.SetStateAction<DetailsTabProps['medicine']>>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChange:any;
  touched:any;
  errors:any;
  handleBlur:any;
  setFieldValue:any;
  values:any;
  setFieldTouched:any;
}

const MainDetailsTab: React.FC<DetailsTabProps> = ({ medicine, setMedicine,setFieldTouched,values,setFieldValue, handleInputChange,handleBlur,handleChange,errors,touched }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isMarketerOpen, setIsMarketerOpen] = useState(false)


  return (
    <Card className="py-4 px-2">
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              value={medicine.name}
              onChange={(e)=>{
                handleChange(e);
                handleInputChange(e);
              }
              }
              onBlur={handleBlur}
              placeholder="Enter the product name"
              className="w-full"
            />
             {errors.name && touched.name && (
                      <span className="text-red-500">{errors.name as string}</span>
               )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="genericName"
              className="text-sm font-medium text-gray-700"
            >
              Generic Name
            </Label>
            <Input
              id="genericName"
              name="genericName"
              value={medicine.genericName}
              onChange={(e)=>{
                handleChange(e);
                handleInputChange(e);
              }
              }
              onBlur={handleBlur}
              placeholder="Enter generic name e.g., paracetamol"
              className="w-full"
            />
               {errors.genericName && touched.genericName && (
                      <span className="text-red-500">{errors.genericName as string}</span>
               )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description (optional)
          </Label>
          <Textarea
            id="description"
            name="description"
            value={medicine.description}
            onChange={handleInputChange}
            placeholder="Enter a brief description"
            className="w-full h-20"
          />
        </div>

        {!medicine.haveVariant && (
         
         <Card className="border border-gray-200">
         <CardContent className="py-2 pb-4 space-y-6">
           <div className="border-b pb-2">
             <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
             <p className="text-sm text-gray-500">Enter the base product information</p>
           </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           
            <div className="space-y-2 w-fit flex-1">
              <Label
                htmlFor="listPrice"
                className="text-sm font-medium text-gray-700"
              >
                List Price
              </Label>
              <Input
                id="listPrice"
                name="listPrice"
                type="number"
                value={medicine.listPrice}
                onChange={(e)=>{
                  handleChange(e);
                  handleInputChange(e);
                }
                }
                onBlur={handleBlur}
                placeholder="Enter list price"
                className="w-full"
              />
              {errors.listPrice && touched.listPrice && (
                      <span className="text-red-500">{errors.listPrice as string}</span>
               )}
            </div>

            <div className="space-y-2 w-fit flex-1">
              <Label
                htmlFor="sellingPrice"
                className="text-sm font-medium text-gray-700"
              >
                Selling Price
              </Label>
              <Input
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                value={medicine.sellingPrice}
                onChange={(e)=>{
                  handleChange(e);
                  handleInputChange(e);
                }
                }
                onBlur={handleBlur}
                placeholder="Enter selling price"
                className="w-full"
              />
               {errors.sellingPrice && touched.sellingPrice && (
                      <span className="text-red-500">{errors.sellingPrice as string}</span>
               )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                 Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="string"
                value={medicine.quantity}
                onChange={(e)=>{
                  handleChange(e);
                  handleInputChange(e);
                }
                }
                onBlur={handleBlur}
                placeholder="Eg: 15,20g,10ml,1.2ltr"
                className="w-full"
              />
               {errors.quantity && touched.quantity && (
                      <span className="text-red-500">{errors.quantity as string}</span>
               )}
            </div>
          </div>

          </CardContent>
          </Card>
        )}
 
        <Card className="p-4 w-fit bg-gray-50 flex-1">
          <div className="flex gap-6 items-center justify-between">
            <div className="space-y-1">
              <Label
                htmlFor="haveVariant"
                className="text-base font-medium text-gray-900"
              >
                This medicine has pack sizes
              </Label>
            </div>
            <Input
              type="checkbox"
              name="haveVariant"
              checked={medicine.haveVariant}
              onChange={(e)=>{
                handleChange(e);
                handleInputChange(e);
              }
              }
              className="w-5 h-5"
            />
          </div>
        </Card>

        <Card className="p-4 w-fit bg-gray-50">
          <div className="flex gap-6 items-center justify-between">
            <div className="space-y-1">
              <Label
                htmlFor="prescription-required"
                className="text-base font-medium text-gray-900"
              >
                Prescription Required
              </Label>
              <p className="text-sm text-gray-500">
                Toggle this if the medicine requires a prescription for purchase
              </p>
            </div>
            <Switch
              id="prescription-required"
              checked={medicine.prescriptionRequired}
              onCheckedChange={(checked) =>
                setMedicine((prev) => ({
                  ...prev,
                  prescriptionRequired: checked,
                }))
              }
              className="bg-gray-300"
            />
          </div>
        </Card>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          
          <div className="space-y-2">
              <Label
                htmlFor="container"
                className="text-sm font-medium text-gray-700"
              >
                Container
              </Label>
              <Select
                value={medicine.container}
                onOpenChange={()=>{
                 setFieldTouched('container', true, false) 
                }}
                onValueChange={(value) =>{
                  setFieldValue('container', value);
                  setMedicine((prevState: any) => ({
                    ...prevState,
                    container: value,
                  }))
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select container" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[14rem]">
                  {medicineContainers.map((container) => (
                    <SelectItem
                      className="hover:bg-gray-200 rounded-md"
                      key={container}
                      value={container}
                    >
                      {container}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.container && touched.container && (
                      <span className="text-red-500">{errors.container as string}</span>
                 )}
            </div>

            <ProductFormSelector
           selectedProductForm={medicine.productForm}
           onProductFormChange={(productForm) => {
              setFieldValue('productForm', productForm);
              setMedicine((prev:any) => ({
                ...prev,
                productForm,
              }));
            }}
            onBlur={() => setFieldTouched('productForm', true, false)}
            error={errors.productForm}
            touched={touched.productForm}
          />

          {/* <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Product Form
            </Label>
            <Select
              value={medicine.productForm}
              onOpenChange={()=>{
                setFieldTouched('productForm', true, false) 
               }}
              onValueChange={(value) =>{
                setFieldValue('productForm', value);
                setMedicine((prevState: any) => ({
                  ...prevState,
                  productForm: value,
                }))
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product form" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {["Tablet", "Capsule", "Liquid", "Powder", "Syrup"].map(
                  (form) => (
                    <SelectItem
                      className="hover:bg-gray-200 rounded-md"
                      key={form}
                      value={form}
                    >
                      {form}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {errors.productForm && touched.productForm && (
                      <span className="text-red-500">{errors.productForm as string}</span>
                 )}
          </div> */}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySelector
            selectedCategory={medicine.category}
            onCategoryChange={(category) => {
              setFieldValue('category', category);
              setMedicine((prev) => ({
                ...prev,
                category,
              }));
            }}
            onBlur={() => setFieldTouched('category', true, false)}
            error={errors.category}
            touched={touched.category}
          />
       

       <ManufacturerSelector
           selectedManufacturer={medicine.marketer}
           onManufacturerChange={(marketer) => {
              setFieldValue('marketer', marketer);
              setMedicine((prev:any) => ({
                ...prev,
                marketer,
              }));
            }}
            onBlur={() => setFieldTouched('marketer', true, false)}
            error={errors.marketer}
            touched={touched.marketer}
          />
          {/* <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Marketer
            </Label>
            <Popover open={isMarketerOpen} onOpenChange={setIsMarketerOpen}>
              <PopoverTrigger 
              onClick={()=>{
                setFieldTouched('marketer', true, false);
              }}
              asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isMarketerOpen}
                  className="w-full justify-between"
                >
                  {medicine.marketer || "Select Marketer"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full bg-white p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search marketer..." />
                  <CommandList className="max-h-[14rem] custom-scrollbar">
                    {marketers.map((marketer) => (
                      <CommandItem
                        key={marketer}
                        onSelect={() => {
                          setFieldValue('marketer', marketer);
                          setMedicine((prev) => ({ ...prev, marketer }));
                          setIsMarketerOpen(false);
                        }}
                        className="hover:bg-gray-200"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            medicine.marketer === marketer
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {marketer}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.marketer && touched.marketer && (
                      <span className="text-red-500">{errors.marketer as string}</span>
                 )}
          </div> */}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="additionalInfo"
            className="text-sm font-medium text-gray-700"
          >
            Additional Info (optional)
          </Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={medicine.additionalInfo}
            onChange={handleInputChange}
            placeholder="Enter any additional information"
            className="w-full h-24"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default MainDetailsTab