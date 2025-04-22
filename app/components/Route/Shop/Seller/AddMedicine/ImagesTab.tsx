import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Medicine {
  images: {
    mainImage: string | null;
    additionalImages: string[];
  };
}

interface ImagesTabProps {
  medicine: any;
  setMedicine: (medicine: any) => void;
  handleChange: any;
  touched: any;
  errors: any;
  handleBlur: any;
  setFieldValue: any;
  values: any;
  setFieldTouched: any;
}

const ImagesTab: React.FC<ImagesTabProps> = ({
  medicine,
  setMedicine,
  setFieldTouched,
  values,
  setFieldValue,
  handleBlur,
  handleChange,
  errors,
  touched,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFieldValue("images", [...values.images, ...files]);

    setMedicine((prev: Medicine) => {
      const newAdditionalImages = [...prev.images.additionalImages, ...files];

      return {
        ...prev,
        images: {
          mainImage: prev.images.mainImage || files[0],
          additionalImages: newAdditionalImages,
        },
      };
    });
  };

  const removeImage = (index: number) => {
    setFieldValue(
      "images",
      values.images.filter((_, i) => i !== index)
    );
    setMedicine((prev: Medicine) => {
      const removedUrl = prev.images.additionalImages[index];
      const newAdditionalImages = prev.images.additionalImages.filter(
        (_, i) => i !== index
      );

      // If we're removing the main image, we need to update it
      let newMainImage = prev.images.mainImage;
      if (removedUrl === prev.images.mainImage) {
        newMainImage =
          newAdditionalImages.length > 0 ? newAdditionalImages[0] : null;
      }

      return {
        ...prev,
        images: {
          mainImage: newMainImage,
          additionalImages: newAdditionalImages,
        },
      };
    });
  };

  const setMainImage = (url: string) => {
    setMedicine((prev: Medicine) => ({
      ...prev,
      images: {
        ...prev.images,
        mainImage: url,
      },
    }));
  };

  const isMainImage = (img: string) => {
    return img === medicine.images.mainImage;
  };

  return (
    <Card>
      <CardContent className="p-6">
        {medicine.images.mainImage && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Main Image</h3>
            {/* <div className="relative w-full max-w-md">
              <img 
                src={medicine.images.mainImage.url || URL.createObjectURL(medicine.images.mainImage)} 
                alt="Main Medicine Image" 
                className="w-full h-64 object-cover shadow-md rounded-md"
              />
            </div> */}
            <div className="relative w-full max-w-md h-64 rounded-md shadow-md overflow-hidden">
              <Image
                src={
                  typeof medicine.images.mainImage === "string"
                    ? medicine.images.mainImage
                    : medicine.images.mainImage.url ||
                      URL.createObjectURL(medicine.images.mainImage)
                }
                alt="Main Medicine Image"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Medicine Images
        </h2>
        {errors.images && touched.images && (
          <Alert className="mb-4 border-red-500 text-red-500 bg-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.images}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="medicineImage"
              className="flex flex-col items-center justify-center w-full h-32 border-2 
                       border-gray-300 border-dashed rounded-lg cursor-pointer 
                       bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Plus className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <Input
                id="medicineImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </label>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {medicine.images.additionalImages.map((file, index) => {
              //  const previewUrl = URL.createObjectURL(file);
              return (
                <div
                  key={index}
                  className={`relative group rounded-lg overflow-hidden
                          ${isMainImage(file) ? "ring-2 ring-blue-500" : ""}`}
                >
                  {/* <img
                    src={file.url || URL.createObjectURL(file)}
                    alt={`Medicine ${index + 1}`}
                    className="w-full h-32 object-cover"
                  /> */}
                  <div className="relative w-full h-32">
                    <Image
                      src={file.url || URL.createObjectURL(file)}
                      alt={`Medicine ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>

                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 
                              group-hover:opacity-100 transition-opacity 
                              flex items-center justify-center space-x-2 p-2"
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setMainImage(file)}
                      className={
                        isMainImage(file)
                          ? "bg-blue-500 text-white"
                          : "text-white"
                      }
                    >
                      {isMainImage(file) ? "Main" : "Set as Main"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="text-red-600 shadow-md" size={16} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagesTab;
