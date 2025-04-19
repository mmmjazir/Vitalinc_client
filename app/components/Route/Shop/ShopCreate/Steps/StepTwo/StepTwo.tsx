"use client";
import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Building2, Truck, X ,ChevronsUpDown} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { services } from "@/app/static/data";

interface StepTwoProps {
  shopDetails: any;
  setShopDetails: (details: any) => void;
  handleNext: any;
  handleBack: any;
}

const validationSchema = Yup.object().shape({
  shopName: Yup.string().required("Shop Name is required"),
  areaOrLocality: Yup.string().required("Area / Sector / Locality is required"),
  services: Yup.array().min(1, "Select at least one service"),
  delivery: Yup.object().shape({
    available: Yup.boolean(),
    distance: Yup.number().when('available', {
      is: true,
      then: (schema) => schema.required('Distance is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    charge: Yup.number().when('available', {
      is: true,
      then: (schema) => schema.required('Charge is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    time: Yup.number().when('available', {
      is: true,
      then: (schema) => schema.required('Time is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

const StepTwo: FC<StepTwoProps> = ({ shopDetails, setShopDetails, handleNext, handleBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      shopName: shopDetails.shopName,
      areaOrLocality: shopDetails.address.areaOrLocality,
      services: shopDetails.services,
      delivery: {
        available: shopDetails.delivery.available,
        distance: shopDetails.delivery.distance,
        charge: shopDetails.delivery.charge,
        time: shopDetails.delivery.time,
      },
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount:true,
    onSubmit: () => {},
  });


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(e);
    setShopDetails((prev: any) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSelectService = (service: string) => {
    setTouched({ services: true }, true);
    if (!shopDetails.services.includes(service)) {
      setFieldValue('services', [...formik.values.services, service]);
      setShopDetails((prev: any) => ({ ...prev, services: [...prev.services, service] }));
    } 
    setIsOpen(false);
  };

  const handleRemoveService = (service: string) => {
    setTouched({ services: true }, true);
    setFieldValue('services', formik.values.services.filter((item: string) => item !== service));
    setShopDetails((prev: any) => ({
      ...prev,
      services: prev.services.filter((item: string) => item !== service),
    }));
  };

  const handleDeliveryToggle = (checked: boolean) => {
    formik.setFieldValue('delivery.available', checked);
    setShopDetails((prev: any) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        available: checked,
      },
    }));
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.handleChange(e);
    setShopDetails((prev: any) => ({
      ...prev,
      delivery: { ...prev.delivery, [name.split('.')[1]]: value },
    }));
  };

 const { values, errors, touched, handleChange, handleBlur, isValid, dirty,setFieldValue,setTouched,setFieldTouched,validateForm,setFieldError } = formik ;


  return (
    <Card className="w-full max-w-4xl mx-auto">
    <CardContent className="p-6">
      <div className="space-y-8">
        {/* Shop Details Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Building2 className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-800">Shop Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                name="shopName"
                placeholder="Your Shop Name"
                value={shopDetails.shopName}
                onChange={(e) => {
                  handleChange(e);
                  setShopDetails((prev: any) => ({ ...prev, shopName: e.target.value }));
                }}
                onBlur={handleBlur}
                className="max-w-md"
              />
              {touched.shopName && errors.shopName && (
                <div className="text-red-500 text-sm">{errors.shopName as string}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="areaOrLocality">Area/Locality</Label>
              <Input
                id="areaOrLocality"
                name="areaOrLocality"
                placeholder='Area / Sector / Locality*'
                value={formik.values.areaOrLocality}
                onChange={(e) => {
                  handleChange(e);
                  handleAddressChange(e);
                }}
                onBlur={formik.handleBlur}
                className="max-w-md"
              />
              {touched.areaOrLocality && errors.areaOrLocality && (
                <div className="text-red-500 text-sm">{errors.areaOrLocality as string}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopBuildingInfo">Building/Shop Info</Label>
              <Input
                id="shopBuildingInfo"
                placeholder='Shop no. / building no. (optional)'
                name="shopBuildingInfo"
                value={shopDetails.address.shopBuildingInfo}
                onChange={handleAddressChange}
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floorOrTower">Floor/Tower</Label>
              <Input
                id="floorOrTower"
                name="floorOrTower"
                placeholder='Floor / tower (optional)'
                value={shopDetails.address.floorOrTower}
                onChange={handleAddressChange}
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                placeholder='Add any nearby landmark (optional)'
                name="landmark"
                value={shopDetails.address.landmark}
                onChange={handleAddressChange}
                className="max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Building2 className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-800">Services</h3>
          </div>
          <div className="space-y-4">
            <Label htmlFor="services">Services Offered</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {shopDetails.services.map((service: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {service}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer text-teal-600 hover:text-teal-800"
                    onClick={() => handleRemoveService(service)}
                  />
                </div>
              ))}
            </div>
            <Popover open={isOpen} onOpenChange={
              
                (open) => {
                  setIsOpen(open);
                  if (!open) {
                    setFieldTouched('services', true, false);
                  }
                }
            }>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isOpen}
                  className="w-full max-w-md justify-between"
                >
                  Select Services
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full bg-white max-w-md p-0">
                <Command>
                  <CommandInput placeholder="Search services..." className="h-9" />
                  <CommandList>
                    {services.map((service) => (
                      <CommandItem
                        key={service.name}
                        onSelect={() => handleSelectService(service.name)}
                        className='cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100'
                      >
                        {service.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {touched.services && errors.services && (
              <div className="text-red-500 text-sm">{errors.services as string}</div>
            )}
          </div>
        </section>

        {/* Delivery Section */}
        <section className="space-y-6 py-3 px-6 rounded-xl border bg-white">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-800">Delivery Options</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Enable Delivery</span>
              <Switch
              className='bg-slate-200'
                checked={shopDetails.delivery.available}
                onCheckedChange={handleDeliveryToggle}
              />
            </div>
          </div>
          {shopDetails.delivery.available && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="deliveryDistance">Delivery Range (km)</Label>
                <Input
                  id="deliveryDistance"
                  name="delivery.distance"
                  placeholder="Enter delivery distance"
                  type="number"
                  value={shopDetails.delivery.distance}
                  onChange={handleDeliveryChange}
                  onBlur={handleBlur}
                  className="max-w-[200px] placeholder:text-xs"
                />
                {touched.delivery?.distance && errors.delivery?.distance && (
                  <div className="text-red-500 text-sm">{errors.delivery.distance as string}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryCharge">Delivery Charge (₹)</Label>
                <Input
                  id="deliveryCharge"
                  name="delivery.charge"
                  placeholder="Enter delivery charge"
                  type="number"
                  value={formik.values.delivery.charge}
                  onChange={handleDeliveryChange}
                  onBlur={formik.handleBlur}
                  className="max-w-[200px] placeholder:text-xs"
                />
                {touched.delivery?.charge && errors.delivery?.charge && (
                  <div className="text-red-500 text-sm">{errors.delivery.charge as string}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Estimated Time (minutes)</Label>
                <Input
                  id="deliveryTime"
                  name="delivery.time"
                  type="number"
                  placeholder="Enter estimated delivery time"
                  value={shopDetails.delivery.time}
                  onChange={handleDeliveryChange}
                  onBlur={handleBlur}
                  className="max-w-[200px] placeholder:text-xs"
                />
                {touched.delivery?.time && errors.delivery?.time && (
                  <div className="text-red-500 text-sm">{errors.delivery.time as string}</div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button disabled={!isValid} onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default StepTwo;

