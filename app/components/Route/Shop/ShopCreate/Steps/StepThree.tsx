import React, { Dispatch, FC, SetStateAction } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, MapPin, Clock } from "lucide-react";
import Timepicker from "@/app/components/TimePicker/Timepicker";
import LocationSelector from "./StepTwo/Location";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StepThreeProps {
  shopDetails: any;
  setShopDetails: (details: any) => void;
  handleBack: any;
  handleCreateAndSubmit: () => void;
  isLoading: boolean;
  setPlaceName: Dispatch<SetStateAction<{ locality: string; city: string }>>
  placeName: any;
}

const validationSchema = Yup.object().shape({
  coordinates: Yup.object()
    .shape({
      error: Yup.string(),
      lat: Yup.number().required("Latitude is required"),
      lng: Yup.number().required("Longitude is required"),
    })
    .test("is-valid-location", "Invalid location", function (value) {
      if (value.error) {
        return this.createError({
          path: "coordinates.error",
          message: value.error,
        });
      }
      return true;
    }),
  hours: Yup.object()
    .test(
      "at-least-3-days",
      "At least 3 working days are required",
      (value: any) => {
        const openDays = Object.keys(value).filter((day) => value[day]?.isOpen);
        return openDays.length >= 3;
      }
    )
    .test(
      "valid-times",
      "All selected working days must have valid start and end times",
      (value: any) => {
        const openDays = Object.keys(value).filter((day) => value[day]?.isOpen);
        const validTimes = openDays.every(
          (day) => value[day].startTime && value[day].endTime
        );
        return validTimes;
      }
    ),
});

const StepThree: FC<StepThreeProps> = ({
  shopDetails,
  setShopDetails,
  handleBack,
  handleCreateAndSubmit,
  isLoading,
  setPlaceName,
  placeName,
}) => {
  const formik = useFormik({
    initialValues: {
      coordinates: shopDetails.coordinates,
      hours: shopDetails.hours,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: () => {},
  });
  const { values, errors, touched, handleChange, handleBlur, isValid, dirty,setFieldValue,setTouched,setFieldTouched,validateForm,setFieldError } = formik ;

  return (
    <Card>
      <CardContent className="p-6">
        <div>
          <div className="space-y-8">
            {/* Location Section */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <MapPin className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Location
                </h3>
              </div>
              <LocationSelector
                state={shopDetails}
                setState={setShopDetails}
                handleChange={handleChange}
                setFieldError={setFieldError}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                setFieldTouched={setFieldTouched}
                onBlur={handleBlur}
                setPlaceName={setPlaceName}
                placeName={placeName}
              />

              <div>
                <Label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </Label>
                <Input
                  name="city"
                  value={shopDetails.address.city}
                  readOnly
                  placeholder="Located City"
                  className="w-full bg-gray-300 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
                />
              </div>

              <div>
                <Label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State / Province
                </Label>
                <Input
                  name="state"
                  value={shopDetails.address.state}
                  readOnly
                  placeholder="Located State"
                  className="w-full bg-gray-300 px-3 py-2 border-none ring-transparent rounded-md shadow-sm placeholder-gray-400 "
                />
              </div>
            </div>
          </div>

          {/* Operating Hours Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <Clock className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Operating Hours
              </h3>
            </div>
            <Timepicker
              state={shopDetails}
              setState={setShopDetails}
              setFieldValue={setFieldValue}
            />
            {touched.hours && errors.hours && (
              <div className="text-red-500 text-sm mt-1">
                {errors.hours as string}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              onClick={handleCreateAndSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
            >
              {isLoading ? "Creating..." : "Create & Submit"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepThree;
