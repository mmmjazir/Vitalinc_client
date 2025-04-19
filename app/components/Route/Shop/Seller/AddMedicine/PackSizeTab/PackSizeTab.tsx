'use client'

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from '@/components/ui/label'
import { Edit, ImageIcon, Plus, Trash2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import * as Yup from "yup";
import { useFormik } from 'formik'
import VariantDialog from './VariantDialog'

interface Variant {
  quantity: string
  listPrice: string;
  sellingPrice:string;
  images: string[]
}

type Props = {
  medicine: any
  setMedicine: any
  setFieldValue: any
  values: any
}


export default function PackSizeTab({
  medicine,
  setMedicine,
  values,
  setFieldValue,
}: Props) {
  const [newVariant, setNewVariant] = useState<Variant>({ quantity: '', listPrice: '', sellingPrice:'', images: [] })
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false)
  const [editingVariant, setEditingVariant] = useState<string | null>(null)
  const [quantityError, setQuantityError] = useState<string | null>(null)

  // const isQuantityUnique = (quantity: string) => {
  //   return !values.packSize.some((pack: Variant) => 
  //     pack.quantity === quantity && pack.quantity !== editingVariant
  //   )
  // }

  const isQuantityUnique = (quantity: string) => {
    const normalizedQuantity = quantity.trim().toLowerCase();
    return !values.packSize.some((pack: Variant) => 
      pack.quantity.trim().toLowerCase() === normalizedQuantity &&
      pack.quantity.trim().toLowerCase() !== editingVariant?.trim().toLowerCase()
    );
  };
  

  const handleAddVariant = () => {
  
    if (newVariant.quantity && newVariant.listPrice && newVariant.sellingPrice) {
      if (isQuantityUnique(newVariant.quantity)) {
        if (editingVariant) {
          setFieldValue('packSize',
            values.packSize.map((p: Variant) =>
              p.quantity === editingVariant ? { ...newVariant } : p
            )
          )
          setMedicine((prev: any) => ({
            ...prev,
            packSize: prev.packSize.map((p: Variant) =>
              p.quantity == editingVariant ? { ...newVariant } : p
            ),
          }))
          setEditingVariant(null)
        } else {
          setFieldValue('packSize', [...values.packSize, newVariant])
          setMedicine((prev: any) => ({
            ...prev,
            packSize: [...prev.packSize, newVariant],
          }))
        }
        setNewVariant({ quantity: "", listPrice: "",sellingPrice:"", images: [] })
        setIsVariantDialogOpen(false)
        setQuantityError(null)
      } else {
        setQuantityError("This pack quantity already exists. Please enter a unique value.")
      }

 }

  }

  const handleEditVariant = (variant: Variant) => {
    setNewVariant(variant)
    setEditingVariant(variant.quantity)
    setIsVariantDialogOpen(true)
    setQuantityError(null)
  }

  const handleRemoveVariant = (quantity: string) => {
    setFieldValue('packSize',
      values.packSize.filter((pack: Variant) => pack.quantity !== quantity)
    )
    setMedicine((prev: any) => ({
      ...prev,
      packSize: prev.packSize.filter((pack: Variant) => pack.quantity !== quantity)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setNewVariant({ ...newVariant, images: [...newVariant.images, ...files] })
  }

  const removeImage = (index: number) => {
    setNewVariant({
      ...newVariant,
      images: newVariant.images.filter((_, i) => i !== index)
    })
  }


  const getImagePreview =(image: File | { url: string; public_id: string })=> {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image.url;
  }


  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Medicine Variants</h2>
          <Button 
          onClick={()=> setIsVariantDialogOpen(true)}
          className="bg-gray-700 text-white hover:bg-gray-600">
                  <Plus size={16} className="mr-2" />
                  Add Variant
          </Button>
        {isVariantDialogOpen && (
             <VariantDialog
         isVariantDialogOpen={isVariantDialogOpen}
         setIsVariantDialogOpen={setIsVariantDialogOpen}
         setEditingVariant={setEditingVariant}
         setNewVariant={setNewVariant}
         setQuantityError={setQuantityError}
         editingVariant={editingVariant}
         newVariant={newVariant}
         quantityError={quantityError}
         getImagePreview={getImagePreview}
         handleAddVariant={handleAddVariant}
         handleImageUpload={handleImageUpload}
         removeImage={removeImage}
         isQuantityUnique={isQuantityUnique}
        />
        )}
     
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quantity</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Price (₹)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicine.packSize.map((pack: Variant, index: number) => (
            <TableRow key={index}>
              <TableCell>{pack.quantity}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <ImageIcon size={24} className="text-blue-500" />
                  <span>{pack.images.length} image(s)</span>
                </div>
              </TableCell>
              <TableCell>{pack.sellingPrice}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditVariant(pack)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveVariant(pack.quantity)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}