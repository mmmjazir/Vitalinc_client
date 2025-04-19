import React, { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  quantity: Yup.string().required("quantity is required"),
  listPrice: Yup.number()
    .required("list price is required")
    .moreThan(0, "list price should be more than 0"),
  sellingPrice: Yup.number()
    .required("selling price is required")
    .moreThan(0, "selling price should be more than 0")
    .lessThan(
      Yup.ref("listPrice"),
      "Selling price should be less than list price"
    ),
});

type Props = {
  isVariantDialogOpen: any;
  setIsVariantDialogOpen: any;
  setEditingVariant: any;
  setNewVariant: any;
  setQuantityError: any;
  editingVariant: any;
  newVariant: any;
  quantityError: any;
  getImagePreview: any;
  handleAddVariant: any;
  handleImageUpload: any;
  removeImage: any;
  isQuantityUnique: any;
};

const VariantDialog: FC<Props> = ({
  isVariantDialogOpen,
  setIsVariantDialogOpen,
  setEditingVariant,
  setNewVariant,
  setQuantityError,
  editingVariant,
  newVariant,
  quantityError,
  getImagePreview,
  handleAddVariant,
  handleImageUpload,
  removeImage,
  isQuantityUnique,
}) => {
  const handleSaveVariant = () => {
    const touchedFields = {
      listPrice: true,
      sellingPrice: true,
      quantity: true,
    } as any;

    setTouched(touchedFields, true);

    if (isValid) {
      handleAddVariant();
    }
  };

  const formik = useFormik({
    initialValues: !editingVariant
      ? {
          listPrice: "",
          sellingPrice: "",
          quantity: "",
        }
      : {
          listPrice: newVariant.listPrice,
          sellingPrice: newVariant.sellingPrice,
          quantity: newVariant.quantity,
        },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: () => {},
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    dirty,
    setFieldValue,
    setTouched,
    setFieldTouched,
    validateForm,
    setFieldError,
    setValues,
    setErrors,
  } = formik;

  return (
    <Dialog
      open={isVariantDialogOpen}
      onOpenChange={(e) => {
        setIsVariantDialogOpen(e);
        setEditingVariant(null);
        setNewVariant({
          quantity: "",
          listPrice: "",
          sellingPrice: "",
          images: [],
        });
        setQuantityError(null);
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>
            {editingVariant ? "Edit Variant" : "Add New Variant"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="string"
              value={newVariant.quantity}
              onChange={(e) => {
                handleChange(e);
                setNewVariant({ ...newVariant, quantity: e.target.value });
                setQuantityError(null);
                if (!isQuantityUnique(e.target.value)) {
                  setQuantityError(
                    "This pack quantity already exists. Please enter a unique value."
                  );
                }
              }}
              onBlur={handleBlur}
              placeholder="e.g.,10,50g,30ml,1.2ltr"
              className="col-span-3"
            />
            {errors.quantity && touched.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity as string}
              </span>
            )}
          </div>
          {quantityError && (
            <p className="text-red-500 text-sm">{quantityError}</p>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="listPrice" className="text-right">
              List Price (₹)
            </Label>
            <Input
              id="listPrice"
              name="listPrice"
              type="number"
              onBlur={handleBlur}
              value={newVariant.listPrice}
              onChange={(e) => {
                handleChange(e);
                setNewVariant({ ...newVariant, listPrice: e.target.value });
              }}
              placeholder="Enter list price"
              className="col-span-3"
            />
            {errors.listPrice && touched.listPrice && (
              <span className="text-red-500 text-sm">
                {errors.listPrice as string}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sellingPrice" className="text-right">
              Selling Price (₹)
            </Label>
            <Input
              id="sellingPrice"
              name="sellingPrice"
              type="number"
              value={newVariant.sellingPrice}
              onChange={(e) => {
                handleChange(e);
                setNewVariant({ ...newVariant, sellingPrice: e.target.value });
              }}
              onBlur={handleBlur}
              placeholder="Enter selling price"
              className="col-span-3"
            />
            {errors.sellingPrice && touched.sellingPrice && (
              <span className="text-red-500 text-sm">
                {errors.sellingPrice as string}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="variantImage" className="text-right">
              Images
            </Label>
            <div className="col-span-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="variantImage"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Plus className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <Input
                    id="variantImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {newVariant.images.map((file, index) => {
                  // const previewUrl = URL.createObjectURL(file)
                  const previewUrl = getImagePreview(file);

                  return (
                    <div key={index} className="relative group">
                      {/* <img src={previewUrl} alt={`Variant ${index + 1}`} className="w-full h-20 object-cover rounded" /> */}
                      <div className="relative w-full h-20 rounded overflow-hidden">
                        <Image
                          src={previewUrl}
                          alt={`Variant ${index + 1}`}
                          fill
                          className="object-cover rounded"
                          sizes="100px"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleSaveVariant}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white"
        >
          {editingVariant ? "Update Variant" : "Add Variant"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;

// import React, { FC } from 'react'
// import * as Yup from "yup";
// import { useFormik } from 'formik'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Plus, X } from 'lucide-react'
// import { Label } from '@/components/ui/label';

// const validationSchema = Yup.object().shape({
//   quantity: Yup.number()
//   .required("quantity is required")
//   .moreThan(0,"quantiy should be more than 0"),
//   listPrice: Yup.number()
//   .required("list price is required")
//   .moreThan(0,"list price should be more than 0"),
//   sellingPrice: Yup.number()
//   .required("selling price is required")
//   .moreThan(0,"selling price should be more than 0")
//   .lessThan(Yup.ref("listPrice"), "Selling price should be less than list price"),
// });

// type Props = {
//   isVariantDialogOpen: boolean;
//   setIsVariantDialogOpen: (open: boolean) => void;
//   setEditingVariant: (variant: string | null) => void;
//   setNewVariant: (variant: any) => void;
//   setQuantityError: (error: string | null) => void;
//   editingVariant: string | null;
//   newVariant: any;
//   quantityError: string | null;
//   getImagePreview: (file: any) => string;
//   handleAddVariant: () => void;
//   handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   removeImage: (index: number) => void;
// }

// const VariantDialog: FC<Props> = ({
//   isVariantDialogOpen,
//   setIsVariantDialogOpen,
//   setEditingVariant,
//   setNewVariant,
//   setQuantityError,
//   editingVariant,
//   newVariant,
//   quantityError,
//   getImagePreview,
//   handleAddVariant,
//   handleImageUpload,
//   removeImage
// }) => {
//   // Create a new formik instance per dialog session
//   const formik = useFormik({
//     initialValues: {
//       quantity: newVariant.quantity || "",
//       listPrice: newVariant.listPrice || "",
//       sellingPrice: newVariant.sellingPrice || "",
//     },
//     enableReinitialize: true, // This will update formik when newVariant changes
//     validationSchema,
//     validateOnChange: true,
//     validateOnBlur: true,
//     validateOnMount: false,
//     onSubmit: () => {},
//   });

//   const {
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     isValid,
//     setTouched,
//   } = formik;

//   // Handle dialog close without resetForm
//   const handleDialogClose = (open: boolean) => {
//     if (!open) {
//       // Instead of resetting the form, we'll just clear our state
//       setEditingVariant(null);
//       setNewVariant({ quantity: "", listPrice: "", sellingPrice: "", images: [] });
//       setQuantityError(null);
//     }
//     setIsVariantDialogOpen(open);
//   };

//   const handleSaveVariant = () => {
//     // Mark all fields as touched to trigger validation
//     setTouched({
//       listPrice: true,
//       sellingPrice: true,
//       quantity: true,
//     }, true);

//     // If form is valid and there's no quantity error, proceed with adding variant
//     if (isValid && !quantityError &&
//         newVariant.quantity &&
//         newVariant.listPrice &&
//         newVariant.sellingPrice) {
//       handleAddVariant();
//     }
//   };

//   // Custom onChange handlers that update both formik and local state
//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     handleChange(e); // Update formik
//     setNewVariant({ ...newVariant, quantity: value }); // Update local state
//     setQuantityError(null); // Clear any quantity error
//   };

//   const handleListPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     handleChange(e);
//     setNewVariant({ ...newVariant, listPrice: value });
//   };

//   const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     handleChange(e);
//     setNewVariant({ ...newVariant, sellingPrice: value });
//   };

//   return (
//     <Dialog open={isVariantDialogOpen} onOpenChange={handleDialogClose}>
//       <DialogTrigger asChild>
//         <Button className="bg-gray-700 text-white hover:bg-gray-600">
//           <Plus size={16} className="mr-2" />
//           Add Variant
//         </Button>
//       </DialogTrigger>
//       <DialogContent onOpenAutoFocus={(e)=> e.preventDefault()} className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{editingVariant ? 'Edit Variant' : 'Add New Variant'}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="quantity" className="text-right">
//               Quantity
//             </Label>
//             <Input
//               id="quantity"
//               name="quantity"
//               type="number"
//               value={newVariant.quantity}
//               onChange={handleQuantityChange}
//               onBlur={handleBlur}
//               placeholder="e.g.,10,12,16,30"
//               className="col-span-3"
//             />
//             <div className="col-span-4 col-start-2">
//               {errors.quantity && touched.quantity && (
//                 <span className="text-red-500 text-sm">{errors.quantity as string}</span>
//               )}
//             </div>
//           </div>
//           {quantityError && (
//             <div className="col-span-4">
//               <p className="text-red-500 text-sm">{quantityError}</p>
//             </div>
//           )}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="listPrice" className="text-right">
//              List Price (₹)
//             </Label>
//             <Input
//               id="listPrice"
//               name="listPrice"
//               type="number"
//               onBlur={handleBlur}
//               value={newVariant.listPrice}
//               onChange={handleListPriceChange}
//               placeholder="Enter list price"
//               className="col-span-3"
//             />
//             <div className="col-span-4 col-start-2">
//               {errors.listPrice && touched.listPrice && (
//                 <span className="text-red-500 text-sm">{errors.listPrice as string}</span>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="sellingPrice" className="text-right">
//               Selling Price (₹)
//             </Label>
//             <Input
//               id="sellingPrice"
//               name="sellingPrice"
//               type="number"
//               value={newVariant.sellingPrice}
//               onChange={handleSellingPriceChange}
//               onBlur={handleBlur}
//               placeholder="Enter selling price"
//               className="col-span-3"
//             />
//             <div className="col-span-4 col-start-2">
//               {errors.sellingPrice && touched.sellingPrice && (
//                 <span className="text-red-500 text-sm">{errors.sellingPrice as string}</span>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="variantImage" className="text-right">
//               Images
//             </Label>
//             <div className="col-span-3">
//               <div className="flex items-center justify-center w-full">
//                 <label htmlFor="variantImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <Plus className="w-8 h-8 mb-3 text-gray-400" />
//                     <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                   </div>
//                   <Input id="variantImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
//                 </label>
//               </div>
//               <div className="grid grid-cols-3 gap-2 mt-2">
//                 {newVariant.images.map((file: any, index: number) => {
//                   const previewUrl = getImagePreview(file);

//                   return (
//                     <div key={index} className="relative group">
//                       <img src={previewUrl} alt={`Variant ${index + 1}`} className="w-full h-20 object-cover rounded" />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//         <Button
//           onClick={handleSaveVariant}
//           className="w-full bg-gray-700 hover:bg-gray-600 text-white"
//         >
//           {editingVariant ? 'Update Variant' : 'Add Variant'}
//         </Button>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default VariantDialog
