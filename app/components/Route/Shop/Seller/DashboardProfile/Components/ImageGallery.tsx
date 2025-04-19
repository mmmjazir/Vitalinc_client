import { Card } from '@/components/ui/card'
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import ImageUploadDialog from './ImageUploadDialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePharmacyImageMutation } from '@/redux/features/pharmacy/pharmacyApi';
import toast from 'react-hot-toast';

type Props = {
    pharmacyInfo:any;
    refetch:any
}

const ImageGallery:FC<Props> = ({pharmacyInfo,refetch}) => {

    const [deletePharmacyImage, {isSuccess,error,data,isLoading}] = useDeletePharmacyImageMutation()

const handleDelete = async(image:any,closeDailog: ()=> void)=>{
   await deletePharmacyImage({id:pharmacyInfo.id,image}) ;
   closeDailog();
}

useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);


  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl flex items-center gap-2 font-semibold mb-4">Image Gallery 
        <span className='text-lg text-gray-700 tracking-wider'>({pharmacyInfo.images?.length}/7)</span>
        </h2>
      <div className="grid max-h-[25rem] overflow-y-scroll custom-scrollbar grid-cols-2 md:grid-cols-5 gap-4">
        {pharmacyInfo.images?.map((img: any, index: number) => (
          <div
            key={img.url}
            className="relative aspect-square border rounded-lg overflow-hidden group"
          >
            <Image
              src={img.url}
              alt={`Pharmacy Image ${index}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform  duration-300 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Trash2 strokeWidth={3} className="h-5 w-5 shadow-lg text-red-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <div className="py-2">
                      <Separator />
                    </div>

                    <DialogDescription className="text-md text-black">
                      Are you sure you want to delete this image?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="bg-gray-300 hover:bg-gray-200">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={(e:any) => {
                        e.preventDefault();
                        handleDelete(img.public_id, () => {})
                    }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                    </DialogClose>   
                  
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
        {pharmacyInfo.images.length < 7 && (
          <ImageUploadDialog refetch={refetch} id={pharmacyInfo.id} />
        )}
      </div>
    </Card>
  );
}

export default ImageGallery