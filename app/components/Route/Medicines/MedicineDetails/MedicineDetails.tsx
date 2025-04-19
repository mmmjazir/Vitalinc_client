"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bike,
  ChevronRight,
  Clock,
  CreditCard,
  Heart,
  MapPin,
  Package2,
  Phone,
  Plus,
  ShieldPlus,
  Star,
  Truck,
} from "lucide-react";
import { PiPrescriptionBold } from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "../ImageGallery";
import { useGetMedicineDetailsQuery } from "@/redux/features/medicine/medicineApi";
import { useParams, useSearchParams } from "next/navigation";
import { useToggleMedicineFavoriteMutation } from "@/redux/features/user/userApi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

const MedicineDetails = () => {
  const { medicineSlug }: any = useParams();
  const searchParams = useSearchParams();

  // Product data state
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  // Pack size state - we'll initialize this properly after data loads
  const [selectedPackSize, setSelectedPackSize] = useState("");

  // Query for medicine details
  const { data, isLoading, isFetching, isError } = useGetMedicineDetailsQuery(
    { medicineSlug },
    { refetchOnMountOrArgChange: true }
  );

  const [toggleMedicineFavorite] = useToggleMedicineFavoriteMutation();

  // Error handling
  if (isError) notFound();
  if (!isLoading && !data?.data) notFound();

  // STEP 1: Initialize product data when it loads
  useEffect(() => {
    if (data?.data) {
      setProduct(data.data);
    }
  }, [data]);

  // STEP 2: Initialize pack size from URL or default - ONLY ONCE when product loads
  useEffect(() => {
    if (!product || !product.haveVariant) return;

    // Get all valid pack sizes
    const validPackSizes = product.packSize.map((p) => p.quantity);

    // Get pack size from URL
    const urlPackSize = searchParams?.get("packSize");

    // Determine which pack size to use
    let packSizeToUse;

    if (urlPackSize && validPackSizes.includes(urlPackSize)) {
      // URL has valid pack size
      packSizeToUse = urlPackSize;
    } else {
      // URL has invalid or no pack size, use first available
      packSizeToUse = product.packSize[0]?.quantity;

      // Update URL with the default pack size - ONLY if URL had invalid or no pack size
      if (!urlPackSize || !validPackSizes.includes(urlPackSize)) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("packSize", packSizeToUse);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`
        );
      }
    }

    // Set the selected pack size
    setSelectedPackSize(packSizeToUse);
  }, [product, searchParams]); // Only depend on product and searchParams

  // STEP 3: Update images when product or selectedPackSize changes
  useEffect(() => {
    if (!product) return;

    const getProductImages = () => {
      if (!product.haveVariant) {
        return [product.images.mainImage, ...product.images.additionalImages];
      }

      const currentPack = product.packSize.find(
        (p) => p.quantity === selectedPackSize
      );

      return currentPack?.images?.length > 0
        ? currentPack.images
        : [product.images.mainImage, ...product.images.additionalImages];
    };

    setImages(getProductImages());
  }, [product, selectedPackSize]);

  // STEP 4: Handle pack size selection - completely separate from effects
  const handlePackSizeSelect = useCallback(
    (packSize) => {
      // Don't do anything if already selected
      if (selectedPackSize === packSize.quantity) return;

      // Update local state
      setSelectedPackSize(packSize.quantity);

      // Update URL without triggering navigation
      const params = new URLSearchParams(searchParams.toString());
      params.set("packSize", packSize.quantity);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    },
    [selectedPackSize, searchParams]
  );

  // Memoized price calculation
  const currentPrices = useMemo(() => {
    if (!product) return { sellingPrice: 0, listPrice: 0 };

    if (product.haveVariant && selectedPackSize) {
      const selectedPack = product.packSize.find(
        (p) => p.quantity === selectedPackSize
      );
      return selectedPack || { sellingPrice: 0, listPrice: 0 };
    } else {
      return {
        sellingPrice: product.sellingPrice,
        listPrice: product.listPrice,
      };
    }
  }, [product, selectedPackSize]);

  // Memoized availability check
  const isAvailable = useMemo(() => {
    if (!product) return false;

    if (product.haveVariant && selectedPackSize) {
      return product.packSize.some(
        (p) => p.quantity === selectedPackSize && p.isAvailable
      );
    } else {
      return product.isAvailable;
    }
  }, [product, selectedPackSize]);

  const handleToggleFavorite = async () => {
    await toggleMedicineFavorite({
      medicineId: product._id,
      source: {
        type: "getMedicineDetails",
        params: { medicineSlug },
      },
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const ModernRatings = ({ rating, totalReviews }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < fullStars
                  ? "text-yellow-400 fill-current"
                  : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              style={
                i === fullStars && hasHalfStar
                  ? {
                      clipPath: "inset(0 50% 0 0)",
                      position: "relative",
                    }
                  : {}
              }
            />
          ))}
        </div>
        <span className="text-md font-Outfit font-semibold text-gray-700">
          {rating}
        </span>
        <span className="text-xs font-medium text-gray-500">
          ({totalReviews} reviews)
        </span>
      </div>
    );
  };

  const getShopStatus = (hours) => {
    if (!hours || !hours.isOpen) return "Closed";

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [startHours, startMinutes] = hours.startTime.split(":").map(Number);
    const [endHours, endMinutes] = hours.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (
      currentMinutes < startTotalMinutes ||
      currentMinutes > endTotalMinutes
    ) {
      return "Closed";
    }

    const closingTime = new Date();
    closingTime.setHours(endHours, endMinutes, 0);

    const formattedClosingTime = closingTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Open until ${formattedClosingTime}`;
  };

  const hasDeliveryInfo = !!product?.shopDetails?.delivery;

  return (
    <div className="md:max-w-[85%] mx-auto px-7 lg:px-8 py-6 bg-gradient-to-br from-gray-50 to-white">
      <nav className="flex items-center text-xs font-medium text-gray-500 mb-4">
        <a
          href="#"
          className="hover:text-primary transition-colors duration-200"
        >
          Home
        </a>
        <ChevronRight className="h-3 w-3 mx-2 text-gray-400" />
        <a
          href="#"
          className="hover:text-primary transition-colors duration-200"
        >
          Medicines
        </a>
        <ChevronRight className="h-3 w-3 mx-2 text-gray-400" />
        <span className="text-primary max-md:truncate">{product?.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageGallery images={images} />
          </motion.div>

          {/* Pharmacy Details Section - Only visible on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block rounded-xl p-3 px-16"
          >
            <div className="">
              <Card className="bg-gradient-to-br shdaow-lg from-gray-100 to-teal-50 border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center text-teal-700">
                    <ShieldPlus className="mr-2 h-5 w-5 text-teal-500" />
                    Pharmacy Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 text-md">
                      {product?.shopDetails.shopName}
                    </span>
                    <ModernRatings
                      rating={product?.shopDetails.averageRating}
                      totalReviews={product?.shopDetails.reviewCount}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} className="text-teal-500" />
                    <span className="text-xs font-medium text-gray-800">
                      {product?.shopDetails.mobileNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={16} className="text-teal-500" />
                    <span className="text-xs font-medium text-gray-800">
                      {getShopStatus(product?.shopDetails.hours)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Delivery & Payment
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {hasDeliveryInfo ? (
                        <div className="flex items-center gap-2 bg-white p-2 rounded-md">
                          <Truck className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="text-xs font-medium text-teal-700">
                              Delivery Available
                            </p>
                            <p className="text-xs text-gray-600">
                              ₹{product?.shopDetails?.delivery?.charge} fee
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-md">
                          <Truck className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-xs font-medium text-black">
                              Delivery Options
                            </p>
                            <p className="text-xs text-orange-400">
                              Contact store
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 bg-white p-2 rounded-md">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-blue-800">
                            Payment Options
                          </p>
                          <p className="text-xs text-gray-600">
                            {product?.shopDetails?.paymentOptions ||
                              "Contact store"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link className="w-full" href={`tel:${product?.shopDetails.mobileNumber}`}>
                      <Button
                        size="sm"
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-300"
                      >
                        <Phone className="mr-2 h-4 w-4" /> Contact Pharmacy
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300"
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(
                            product?.shopDetails.shopName
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <MapPin className="mr-2 h-4 w-4" /> Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 lg:col-span-2"
        >
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {product?.name}
            </h1>
            <p className="text-sm sm:text-base font-Roboto font-medium text-secondary">
              {product?.marketer}
            </p>

            {product?.contains && product.contains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary/10 rounded-lg p-4 space-y-2"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Active Ingredients
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {product.contains.map((ingredient, index) => (
                    <div key={ingredient.name} className="flex items-center">
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                        {ingredient.name} ({ingredient.dosage})
                      </span>
                      {index < product.contains.length - 1 && (
                        <Plus className="w-4 h-4 text-muted-foreground ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {product?.prescriptionRequired && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
              >
                <PiPrescriptionBold className="mr-1 h-3 w-3" />
                Prescription required
              </Badge>
            )}
            <Button
              variant={product?.isFavorite ? "default" : "outline"}
              size="sm"
              onClick={handleToggleFavorite}
              className={`text-xs font-Outfit rounded-full transition-all duration-300 ${
                product?.isFavorite
                  ? "bg-red-600 text-white hover:bg-red-600/90"
                  : "hover:bg-primary/10"
              }`}
            >
              <Heart
                size={14}
                className={`mr-1 ${product?.isFavorite ? "fill-current" : ""}`}
              />
              {product?.isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-100 p-2 rounded-lg">
            <Package2 size={16} className="text-primary" />
            <span>
              {product?.haveVariant
                ? `${product?.container} of ${selectedPackSize} ${product?.productForm}`
                : `${product?.container} of ${product?.quantity} ${product?.productForm}`}
            </span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ₹{currentPrices?.sellingPrice}
            </span>
            <span className="text-sm sm:text-base text-gray-500 line-through">
              ₹{currentPrices?.listPrice}
            </span>
            <Badge
              variant={isAvailable ? "success" : "destructive"}
              className={`text-xs py-0.5 px-2 rounded-full ${
                isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isAvailable ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {product?.haveVariant && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Choose Pack Size
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product?.packSize?.map((pack) => (
                  <motion.div
                    key={pack.quantity}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-auto py-4 px-6 justify-between rounded-lg text-sm transition-all duration-300",
                        selectedPackSize === pack.quantity
                          ? "bg-gray-500 text-white ring-2 ring-gray-500 ring-offset-2"
                          : "hover:bg-gray-600/5"
                      )}
                      onClick={() => handlePackSizeSelect(pack)}
                    >
                      <span className="flex flex-col items-start">
                        <span className="font-medium">{pack.quantity}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {product?.productForm}
                          {pack?.quantity > 1 ? "s" : ""}
                        </span>
                      </span>
                      <span className="flex items-center">
                        <span className="text-lg font-semibold">
                          ₹{pack.sellingPrice}
                        </span>
                        <ChevronRight className="w-4 h-4 ml-2 text-muted-foreground" />
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-md p-1">
              <TabsTrigger
                value="description"
                className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm transition-all duration-300"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="uses"
                className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm transition-all duration-300"
              >
                Uses
              </TabsTrigger>
              <TabsTrigger
                value="sideEffects"
                className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm transition-all duration-300"
              >
                Side Effects
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-3">
              <Card className="bg-white shadow-sm border-0">
                <CardContent className="pt-4">
                  {product?.description ? (
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 italic text-center">
                      Information not provided
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="uses" className="mt-3">
              <Card className="bg-white shadow-sm border-0">
                <CardContent className="pt-4">
                  {product?.uses && product.uses.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.uses.map((use, index) => (
                        <li
                          key={index}
                          className="text-xs sm:text-sm text-gray-700"
                        >
                          {use}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 italic text-center">
                      Information not provided
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sideEffects" className="mt-3">
              <Card className="bg-white shadow-sm border-0">
                <CardContent className="pt-4">
                  {product?.sideEffects && product.sideEffects.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.sideEffects.map((effect, index) => (
                        <li
                          key={index}
                          className="text-xs sm:text-sm text-gray-700"
                        >
                          {effect}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 italic text-center">
                      Information not provided
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Separator className="my-8" />

      {/* Pharmacy Details Section - Only visible on mobile and medium screens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:hidden rounded-xl mb-8"
      >
        <div className="">
          <Card className="bg-gradient-to-br shadow-md from-gray-100 to-teal-50 border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center text-teal-700">
                <ShieldPlus className="mr-2 h-5 w-5 text-teal-500" />
                Pharmacy Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base">
                  {product?.shopDetails.shopName}
                </span>
                <ModernRatings
                  rating={product?.shopDetails.averageRating}
                  totalReviews={product?.shopDetails.reviewCount}
                />
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} className="text-teal-500" />
                <span className="text-xs sm:text-sm">
                  {product?.shopDetails.mobileNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} className="text-teal-500" />
                <span className="text-xs sm:text-sm">
                  {getShopStatus(product?.shopDetails.hours)}
                </span>
              </div>
              <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Delivery & Payment
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {hasDeliveryInfo ? (
                        <div className="flex items-center gap-2 bg-white p-2 rounded-md">
                          <Truck className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="text-xs font-medium text-teal-700">
                              Delivery Available
                            </p>
                            <p className="text-xs text-gray-600">
                              ₹{product?.shopDetails?.delivery?.charge} fee
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-md">
                          <Truck className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-xs font-medium text-black">
                              Delivery Options
                            </p>
                            <p className="text-xs text-orange-400">
                              Contact store
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 bg-white p-2 rounded-md">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-blue-800">
                            Payment Options
                          </p>
                          <p className="text-xs text-gray-600">
                            {product?.shopDetails?.paymentOptions ||
                              "Contact store"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              <div className="flex items-center gap-2">
                    <Link className="w-full" href={`tel:${product?.shopDetails.mobileNumber}`}>
                      <Button
                        size="sm"
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-300"
                      >
                        <Phone className="mr-1 h-4 w-4" /> Contact Pharmacy
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300"
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(
                            product?.shopDetails.shopName
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <MapPin className="mr-1 h-4 w-4" /> Get Directions
                    </Button>
                  </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicineDetails;
