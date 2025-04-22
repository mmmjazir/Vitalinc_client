"use client";
import {
  useEditMedicineMutation,
  useGetSingleMedicineForInventoryQuery,
} from "@/redux/features/medicine/medicineApi";
import { useFormik } from "formik";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackSizeTab from "../AddMedicine/PackSizeTab/PackSizeTab";
import ImagesTab from "../AddMedicine/ImagesTab";
import MainDetailsTab from "../AddMedicine/MainDetailsTab/MainDetailsTab";
import {
  CircleAlert,
  ClipboardList,
  Image as ImageIcon,
  Layers,
  Pill,
} from "lucide-react";
import MedicineUsesForm from "../AddMedicine/AdditionalDetailsTab/MedicineUsesForm";
import MedicineContainsForm from "../AddMedicine/AdditionalDetailsTab/MedicineContainsForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import MedicineSideEffectsForm from "../AddMedicine/AdditionalDetailsTab/MedicineSideEffectsForm";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("pharmaceutical name is a required field"),
  genericName: Yup.string().required("generic name is a required field"),
  haveVariant: Yup.boolean(),
  listPrice: Yup.number()
    .when("haveVariant", {
      is: false,
      then: (schema) => schema.required("list price is required"),
      otherwise: (schema) => schema.notRequired(),
    })
    .moreThan(0, "list price should be more than 0"),
  sellingPrice: Yup.number()
    .when("haveVariant", {
      is: false,
      then: (schema) => schema.required("selling price is required"),
      otherwise: (schema) => schema.notRequired(),
    })
    .moreThan(0, "selling price should be more than 0")
    .lessThan(
      Yup.ref("listPrice"),
      "Selling price should be less than list price"
    ),
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

const EditMedicine = () => {
  const { id: medicineId }: any = useParams();

  const { data, isLoading, error } = useGetSingleMedicineForInventoryQuery(
    { medicineId },
    { skip: !medicineId, refetchOnMountOrArgChange: true }
  );
  const [
    editMedicine,
    {
      isSuccess,
      error: updateError,
      data: updatedResponse,
      isLoading: isUpdating,
    },
  ] = useEditMedicineMutation();

  const [medicine, setMedicine] = useState() as any;

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
    if (data && data.medicine) {
      // setMedicine(data.medicine);

      setMedicine({
        name: data.medicine.name,
        genericName: data.medicine.genericName,
        description: data.medicine.description,
        haveVariant: data.medicine.haveVariant,
        listPrice: data.medicine.listPrice || "",
        sellingPrice: data.medicine.sellingPrice || "",
        quantity: data.medicine.quantity || "",
        isAvailable: data.medicine.isAvailable || true,
        prescriptionRequired: data.medicine.prescriptionRequired,
        productForm: data.medicine.productForm,
        container: data.medicine.container,
        category: data.medicine.category,
        marketer: data.medicine.marketer,
        additionalInfo: data.medicine.additionalInfo,
        images: {
          mainImage: data.medicine.images.mainImage,
          additionalImages: [
            data.medicine.images.mainImage,
            ...data.medicine.images.additionalImages,
          ],
        },
        packSize: data.medicine.packSize || [],
        uses: data.medicine.uses,
        sideEffects: data.medicine.sideEffects,
        contains: data.medicine.contains,
      });

      setValues({
        name: data.medicine.name,
        genericName: data.medicine.genericName,
        haveVariant: data.medicine.haveVariant,
        listPrice: data.medicine.listPrice || "",
        sellingPrice: data.medicine.sellingPrice || "",
        quantity: data.medicine.quantity || "",
        category: data.medicine.category,
        container: data.medicine.container,
        productForm: data.medicine.productForm,
        marketer: data.medicine.marketer,
        packSize: data.medicine.packSize || [],
        images: [data.medicine.images.mainImage],
      });
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(updatedResponse.message);
      redirect("/seller/medicine-inventory");
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const touchedFields = {
      name: true,
      genericName: true,
      listPrice: true,
      sellingPrice: true,
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
      const formData = new FormData() as any;

      Object.keys(medicine).forEach((key) => {
        if (key !== "images" && key !== "packSize") {
          if (Array.isArray(medicine[key])) {
            formData.append(key, JSON.stringify(medicine[key]));
          } else {
            formData.append(key, medicine[key]);
          }
        }
      });

      if (medicine.images.mainImage instanceof File) {
        formData.append("mainImage", medicine.images.mainImage);
      } else if (
        medicine.images.mainImage.public_id &&
        medicine.images.mainImage.url
      ) {
        formData.append("mainImage", JSON.stringify(medicine.images.mainImage));
      }

      const filteredAdditionalImages = medicine.images.additionalImages.filter(
        (image: any) => image !== medicine.images.mainImage
      );

      const newAdditionalImages = filteredAdditionalImages.filter(
        (image: any) => image instanceof File
      );
      const existingAdditionalImages = filteredAdditionalImages.filter(
        (image: any) =>
          typeof image === "object" && image.public_id && image.url
      );

      if (newAdditionalImages.length > 0) {
        newAdditionalImages.forEach((image: File) => {
          formData.append("additionalImages", image);
        });
      }

      // Append existing additional images as JSON if they exist
      if (existingAdditionalImages.length > 0) {
        formData.append(
          "additionalImages",
          JSON.stringify(existingAdditionalImages)
        );
      }

      const packSizeArray = medicine.packSize.map((pack: any) => {
        const packImages = pack.images.filter(
          (image: any) => image.public_id && image.url
        );
        const packImageFiles = pack.images.filter(
          (image: any) => image instanceof File
        );

        if (packImageFiles.length > 0) {
          packImageFiles.forEach((image: File) => {
            formData.append(`packSizeImages[${pack.quantity}]`, image);
          });
        }

        return {
          quantity: pack.quantity,
          listPrice: pack.listPrice,
          sellingPrice: pack.sellingPrice,
          images: packImages,
        };
      });
      if (packSizeArray.length > 0) {
        formData.append("packSize", JSON.stringify(packSizeArray));
      }

      await editMedicine({ medicineId, formData });
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
    setValues,
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

  const hasPackSizeErrors = errors.packSize && touched.packSize;
  const hasImagesErrors = errors.images && touched.images;

  const detailsErrorCount = detailsFields.filter(
    (field) => errors[field] && touched[field]
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Medicine
      </h1>
      {!isLoading && medicine && (
        <>
          <Tabs defaultValue="details" className="space-y-4">
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
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="ml-1.5 flex items-center"
                  >
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
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="ml-1.5 flex items-center"
                    >
                      <Badge className="h-5 bg-red-500 hover:bg-red-500 text-white px-1.5 text-xs font-medium">
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
                <span className="max-md:hidden ml-2">Contents & Uses</span>
                <span className="max-md:group-hover:block max-md:group-data-[state=active]:block hidden ml-2 transition-all duration-100 origin-left">
                  Contents & Uses
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
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="ml-1.5 flex items-center"
                  >
                    <Badge className="h-5 bg-red-500 hover:bg-red-500 text-white px-1.5 text-xs font-medium">
                      1
                    </Badge>
                  </motion.div>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent className="" value="details">
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

            <TabsContent value="contents-uses">
              <Card className="py-3">
                <CardContent className="space-y-6">
                  <MedicineUsesForm
                    medicine={medicine}
                    setMedicine={setMedicine}
                  />

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

            <TabsContent value="variants">
              <PackSizeTab
                setFieldValue={setFieldValue}
                errors={errors}
                values={values}
                medicine={medicine}
                setMedicine={setMedicine}
              />
            </TabsContent>

            <TabsContent value="images">
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

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="w-full sm:w-48 py-4 sm:py-6 text-lg font-medium bg-[#198981] hover:bg-[#279f97] text-white"
            >
              {isUpdating ? "Updating..." : "Update Medicine"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditMedicine;
