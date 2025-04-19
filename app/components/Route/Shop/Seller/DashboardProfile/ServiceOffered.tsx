'use client'
import React, { FC, useEffect, useState } from 'react'
import { Plus, X, Save, Search, Edit, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { services as availableServices } from '@/app/static/data'
import { useUpdatePharmacyServicesMutation } from '@/redux/features/pharmacy/pharmacyApi'
import toast from 'react-hot-toast'


type Service = {
  id: string
  name: string
  icon: React.ElementType
}
type Props={
  pharmacyInfo:any,
  refetch:any
 }

const ServiceOffered:FC<Props> = ({pharmacyInfo,refetch})=> {
  const [updatePharmacyServices,{isSuccess,error,data,isLoading}] = useUpdatePharmacyServicesMutation()
  const [services, setServices] = useState<string[]>(pharmacyInfo?.services)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddService = () => {
    if (selectedService && !services.includes(selectedService)) {
      setServices([...services, selectedService])
      setSelectedService(null)
      setIsAddModalOpen(false)
      setHasChanges(true)
    }
  }
  
  const handleRemoveService = (name: string) => {
    setServices(services.filter(s => s !== name))
    setHasChanges(true)
  }

  const handleSubmit = async () => { 
   await updatePharmacyServices({id:pharmacyInfo.id,data:services})
  }

  const handleReset = () => {
    setServices(pharmacyInfo.services)
    setHasChanges(false)
  }

  const filteredServices = availableServices.filter(
    service => service.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  // useEffect(() => {
  //   if (pharmacyInfo && pharmacyInfo.services) {
  //     setServices(pharmacyInfo.services)
  //   }
  // }, [pharmacyInfo])
  

  useEffect(()=>{
    if(isSuccess){  
     const message = data?.message
     toast.success(message);    
     setHasChanges(false)   
     refetch();
    }
    if(error){
     if("data" in error){
       const errorData = error as any;
       toast.error(errorData.data.message);
     }
    }
 
   },[isSuccess,error])



  return (
    <Card className="w-full">
      <CardHeader>
      <CardTitle className="text-2xl font-bold">Services Offered</CardTitle> 
        <CardDescription>Select the services your shop offers to customers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services?.map((serviceName,index) => {

     return(
            <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <Check className="h-8 w-8 text-blue-500 mr-4" />
              <span className="font-medium">{serviceName}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto" 
                onClick={() => handleRemoveService(serviceName)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            )
         } )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-navbar hover:bg-gray-600 text-white sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                {/* Need fix later */}
                <Select onValueChange={setSelectedService} value={selectedService || undefined}>
                  <SelectTrigger className="col-span-3 ring-transparent border outline-none">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <div className="sticky top-0 bg-white p-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search services..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  <div className="max-h-[250px] scroll-smooth overflow-y-scroll custom-scrollbar">
                    {filteredServices
                     .filter(s => !services.includes(s.name))
                      .map(service => (
                        <SelectItem className='hover:bg-gray-300  text-black' key={service.name} value={service.name}>
                          <div className="flex items-center">
                            {service.name}
                          </div>
                        </SelectItem>
                      ))}
                </div>

                  </SelectContent>
                </Select>

              </div>
            </div>
            <div className="flex justify-end text-white">
              <Button onClick={handleAddService} disabled={!selectedService}>
                Add Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {hasChanges && (
          <>
            <Button onClick={handleSubmit} className="w-full text-white sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Submit Changes
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

export default ServiceOffered;