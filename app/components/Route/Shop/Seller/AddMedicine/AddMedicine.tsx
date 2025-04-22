"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackSizeTab from "./PackSizeTab/PackSizeTab";
import ImagesTab from "./ImagesTab";
import MainDetailsTab from "./MainDetailsTab/MainDetailsTab";
import { CircleAlert, ClipboardList, Image as ImageIcon, Layers, Pill } from "lucide-react";
import MedicineUsesForm from "./AdditionalDetailsTab/MedicineUsesForm";
import MedicineContainsForm from "./AdditionalDetailsTab/MedicineContainsForm";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMedicineMutation } from "@/redux/features/medicine/medicineApi";
import toast from "react-hot-toast";
import MedicineSideEffectsForm from "./AdditionalDetailsTab/MedicineSideEffectsForm";
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("pharmaceutical name is a required field"),
  genericName: Yup.string().required("generic name is a required field"),
  haveVariant: Yup.boolean(),
  listPrice: Yup.number().when("haveVariant", {
    is: false,
    then: (schema) => schema.required("list price is required"),
    otherwise: (schema) => schema.notRequired(),
  })
  .moreThan(0,"list price should be more than 0"),
  sellingPrice: Yup.number().when("haveVariant", {
    is: false,
    then: (schema) => schema.required("selling price is required"),
    otherwise: (schema) => schema.notRequired(),
  })
  .moreThan(0,"selling price should be more than 0")
  .lessThan(Yup.ref("listPrice"), "Selling price should be less than list price"),
  quantity: Yup.string().when("haveVariant", {
    is: false,
    then: (schema) => schema.required("quantity field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  category: Yup.string().required("category is required"),
  container: Yup.string().required("container is required"),
  productForm: Yup.string().required("productForm is required"),
  marketer: Yup.string().required("marketer is required"),
  packSize: Yup.array().when("haveVariant", {
    is: true,
    then: (schema) => schema.min(1, "At least one packsize is required to add"),
  }),
  images: Yup.array().min(1, "At least one image is required to add"),
});

const AddMedicine = () => {
  const [createMedicine, { isSuccess, isLoading, error, data }] =
    useCreateMedicineMutation();

  const [medicine, setMedicine] = useState({
    name: "",
    genericName: "",
    description: "",
    haveVariant: false,
    listPrice: "",
    sellingPrice: "",
    quantity: "",
    prescriptionRequired: false,
    productForm: "",
    container: "",
    category: "",
    marketer: "",
    additionalInfo: "",
    images: {
      mainImage: null,
      additionalImages: [],
    },
    packSize: [],
    uses: [],
    sideEffects: [],
    contains: [],
  }) as any;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const hasVariants = (e.target as HTMLInputElement).checked;
      setMedicine((prevState) => ({
        ...prevState,
        haveVariant: hasVariants,
        listPrice: hasVariants ? "" : prevState.listPrice,
        sellingPrice: hasVariants ? "" : prevState.sellingPrice,
        quantity: hasVariants ? "" : prevState.quantity,
        packSize: hasVariants ? prevState.packSize : [],
      }));
    } else {
      setMedicine((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setMedicine({
        name: "",
        genericName: "",
        description: "",
        haveVariant: false,
        listPrice: "",
        sellingPrice:"",
        quantity: "",
        prescriptionRequired: false,
        productForm: "",
        container: "",
        category: "",
        marketer: "",
        additionalInfo: "",
        images: {
          mainImage: null,
          additionalImages: [],
        },
        packSize: [],
        uses: [],
        sideEffects: [],
        contains: [],
      });
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess]);



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const touchedFields = {
      name: true,
      genericName: true,
      listPrice: true,
      sellingPrice:true,
      quantity: true,
      category: true,
      container: true,
      productForm: true,
      marketer: true,
      packSize: true,
      images: true,
    } as any;

    setTouched(touchedFields, true);

    if (isValid) {
      const formData = new FormData();

      Object.keys(medicine).forEach((key) => {
        if (key !== "images" && key !== "packSize") {
          if (Array.isArray(medicine[key])) {
            formData.append(key, JSON.stringify(medicine[key]));
          } else {
            formData.append(key, medicine[key]);
          }
        }
      });

      if (medicine.images.mainImage) {
        formData.append("mainImage", medicine.images.mainImage);
      }
      const filteredAdditionalImages = medicine.images.additionalImages.filter(
        (image) => image !== medicine.images.mainImage
      );

      if(filteredAdditionalImages.length > 0){
      filteredAdditionalImages.forEach((image, index) => {
        formData.append("additionalImages", image);
      });
       }
      const packSizeArray = medicine.packSize.map((pack) => ({
        quantity: pack.quantity,
        listPrice: pack.listPrice,
        sellingPrice: pack.sellingPrice
      }));

      // Append the entire packSize array as a JSON string
      formData.append("packSize", JSON.stringify(packSizeArray));
      if(packSizeArray && packSizeArray.length > 0){
      medicine.packSize.forEach((pack) => {
        // Append images within the current packSize entry, if they exist
        if (pack.images && pack.images.length > 0) {
          pack.images.forEach((image, index) => {
            formData.append(
              `packSizeImages[${pack.quantity}]`,
              image);
          });
        }
      })
    };

    await createMedicine(formData);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      genericName: "",
      haveVariant: false,
      listPrice: "",
      sellingPrice: "",
      quantity: "",
      category: "",
      container: "",
      productForm: "",
      marketer: "",
      packSize: [],
      images: [],
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
  } = formik;

  const detailsFields = [
    "name",
    "genericName",
    "listPrice",
    "sellingPrice",
    "quantity",
    "category",
    "container",
    "productForm",
    "marketer",
  ];

  const hasDetailsErrors =
    detailsFields.some((field) => errors[field]) &&
    detailsFields.some((field) => touched[field]);


    const hasPackSizeErrors = errors.packSize && touched.packSize
    const hasImagesErrors = errors.images && touched.images
  
    const detailsErrorCount = detailsFields.filter((field) => errors[field] && touched[field]).length
  
  

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 max-md:px-1 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Add Medicine to Inventory
      </h1>

      <Tabs defaultValue="details" className="space-y-4">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center max-md:justify-between">
            <TabsList className="inline-flex  items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-lg">
              <TabsTrigger
                value="details"
                className="group flex items-center px-3 py-2 text-sm font-medium transition-all duration-100 rounded-full data-[state=active]:bg-navbar data-[state=active]:text-white hover:bg-navbar/10"
              >
                <ClipboardList className="w-4 h-4" />
                <span className="max-md:hidden ml-2">Details</span>
                <span className="max-md:group-hover:block max-md:group-data-[state=active]:block hidden ml-2 transition-all duration-100 origin-left">
                  Details
                </span>


          {hasDetailsErrors && (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="ml-1.5 flex items-center">
                    <Badge className="h-5 bg-red-500 hover:bg-red-500 text-white px-1.5 text-xs font-medium">
                      {detailsErrorCount}
                    </Badge>
                  </motion.div>
                )}

              </TabsTrigger>

              {medicine.haveVariant && (
                <TabsTrigger
                  value="variants"
                  className="group flex items-center px-3 py-2 text-sm font-medium transition-all duration-100 rounded-full data-[state=active]:bg-navbar data-[state=active]:text-white hover:bg-navbar/10"
                >
                  <Layers className="w-4 h-4" />
                  <span className="max-md:hidden ml-2">Pack Sizes</span>
                  <span className="max-md:group-hover:block max-md:group-data-[state=active]:block hidden ml-2 transition-all duration-100 origin-left">
                    Pack Sizes
                  </span>
            

            {hasPackSizeErrors && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="ml-1.5 flex items-center">
                      <Badge  className="h-5 bg-red-500 hover:bg-red-500 text-white px-1.5 text-xs font-medium">
                        1
                      </Badge>
                    </motion.div>
                  )}


                </TabsTrigger>
              )}

              <TabsTrigger
                value="contents-uses"
                className="group flex items-center px-3 py-2 text-sm font-medium transition-all duration-100 rounded-full data-[state=active]:bg-navbar data-[state=active]:text-white hover:bg-navbar/10"
              >
                <Pill className="w-4 h-4" />
                <span className="max-md:hidden ml-2">Contents & Effects</span>
                <span className="max-md:group-hover:block max-md:group-data-[state=active]:block hidden ml-2 transition-all duration-100 origin-left">
                  Contents & Effects
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="images"
                className="group flex items-center px-3 py-2 text-sm font-medium transition-all duration-100 rounded-full data-[state=active]:bg-navbar data-[state=active]:text-white hover:bg-navbar/10"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="max-md:hidden ml-2">Images</span>
                <span className="max-md:group-hover:block max-md:group-data-[state=active]:block hidden ml-2 transition-all duration-100 origin-left">
                  Images
                </span>

              {hasImagesErrors && (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="ml-1.5 flex items-center">
                    <Badge className="h-5 bg-red-500 hover:bg-red-500 text-white px-1.5 text-xs font-medium">
                      1
                    </Badge>
                  </motion.div>
                )}

              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent className="mt-4" value="details">
          <MainDetailsTab
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            values={values}
            setFieldTouched={setFieldTouched}
            medicine={medicine}
            setMedicine={setMedicine}
            handleInputChange={handleInputChange}
          />
        </TabsContent>

        <TabsContent className="mt-4" value="contents-uses">
          <Card className="p-4 sm:p-6">
            <CardContent className="space-y-4 sm:space-y-6">
              <MedicineUsesForm medicine={medicine} setMedicine={setMedicine} />
              <MedicineContainsForm
                medicine={medicine}
                setMedicine={setMedicine}
              />
              <MedicineSideEffectsForm
                medicine={medicine}
                setMedicine={setMedicine}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="mt-4" value="variants">
          <PackSizeTab
            setFieldValue={setFieldValue}
            errors={errors}
            values={values}
            medicine={medicine}
            setMedicine={setMedicine}
          />
        </TabsContent>

        <TabsContent className="mt-4" value="images">
          <ImagesTab
            medicine={medicine}
            setMedicine={setMedicine}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            values={values}
            setFieldTouched={setFieldTouched}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full sm:w-48 py-4 sm:py-6 text-base sm:text-lg font-medium bg-[#198981] hover:bg-[#279f97] text-white"
        >
          {isLoading ? "Adding..." : "Add Medicine"}
        </Button>
      </div>
    </div>
  );
};

export default AddMedicine;
