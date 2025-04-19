"use client";

import { useEffect, useState } from "react";
import {
  useGetPharmacyBySellerQuery,
} from "@/redux/features/pharmacy/pharmacyApi";
import CustomDialog from "../CustomDialog";
import ContactInfo from "./Components/EditDashboardDailogs/ContactInfo";
import Address from "./Components/EditDashboardDailogs/Address";
import ImageGallery from "./Components/ImageGallery";
import MapWithCoord from "./MapWithCoord";
import LocationEdit from "./Components/EditDashboardDailogs/LocationEdit";
import HoursEdit from "./Components/EditDashboardDailogs/HoursEdit";
import BusinessHours from "./BusinessHours";
import ServiceOffered from "./ServiceOffered";
import DeliveryEdit from "./Components/EditDashboardDailogs/DeliveryEdit";
import DeliverySection from "./DeliverySection";
import AddressSection from "./AddressSection";
import ContactSection from "./ContactSection";
import ShopHeaderInfo from "./ShopHeaderInfo";
import InventorySection from "./InventorySection";

export default function ModernDashboardShopProfile() {
  const {
    data: pharmacyData,
    isLoading,
    refetch,
  } = useGetPharmacyBySellerQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (pharmacyData) {
      setPharmacyInfo({
        id: pharmacyData.shop._id || "",
        email: pharmacyData.shop.email || "",
        contactPersonName: {
          title: pharmacyData.shop.contactPersonName?.title || "",
          name: pharmacyData.shop.contactPersonName?.name || "",
        },
        mobileNumber: pharmacyData.shop.mobileNumber || "",
        additionalMobileNumbers:
          pharmacyData.shop.additionalMobileNumbers || [],
        whatsappNumber: pharmacyData.shop.whatsappNumber || "",
        telephoneNumber: {
          areaCode: pharmacyData.shop.telephoneNumber?.areaCode || "",
          number: pharmacyData.shop.telephoneNumber?.number || "",
        },
        shopName: pharmacyData.shop.shopName || "",
        address: {
          shopBuildingInfo: pharmacyData.shop.address?.shopBuildingInfo || "",
          floorOrTower: pharmacyData.shop.address?.floorOrTower || "",
          areaOrLocality: pharmacyData.shop.address?.areaOrLocality || "",
          city: pharmacyData.shop.address?.city || "",
          state: pharmacyData.shop.address?.state || "",
          landmark: pharmacyData.shop.address?.landmark || "",
        },
        coordinates: {
          lat: pharmacyData.shop.coordinates.coordinates[1] || "",
          lng: pharmacyData.shop.coordinates.coordinates[0] || "",
        },
        services: pharmacyData.shop.services || [],
        delivery: pharmacyData.shop.delivery || {},
        hours: {
          Monday: pharmacyData.shop.hours?.Monday || {},
          Tuesday: pharmacyData.shop.hours?.Tuesday || {},
          Wednesday: pharmacyData.shop.hours?.Wednesday || {},
          Thursday: pharmacyData.shop.hours?.Thursday || {},
          Friday: pharmacyData.shop.hours?.Friday || {},
          Saturday: pharmacyData.shop.hours?.Saturday || {},
          Sunday: pharmacyData.shop.hours?.Sunday || {},
        },
        images: pharmacyData.shop.images || [],
      });
    }
  }, [pharmacyData]);

  const [pharmacyInfo, setPharmacyInfo] = useState({
    id: "",
    email: "",
    contactPersonName: {
      title: "",
      name: "",
    },
    mobileNumber: "",
    additionalMobileNumbers: [],
    whatsappNumber: "",
    telephoneNumber: {
      areaCode: "",
      number: "",
    },
    shopName: "",
    address: {
      shopBuildingInfo: "",
      floorOrTower: "",
      areaOrLocality: "",
      city: "",
      state: "",
      landmark: "",
    },
    coordinates: {
      lat: "",
      lng: "",
    },
    services: [],
    delivery: {},
    hours: {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
      Sunday: {},
    },
    images: [],
  }) as any;

  if (isLoading && !pharmacyData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSetRoute = (route: string) => {
    setRoute(route);
    setOpen((prev: any) => !prev);
  };

  return (
    <div className="font-Arimo py-8 overflow-x-hidden">
      {/* Top section(shopName,Ratings,Favorites) */}

      <ShopHeaderInfo
        images={pharmacyInfo.images}
        shop={pharmacyData?.shop}
        shopName={pharmacyInfo.shopName}
        pharmacyInfo={pharmacyInfo}
        setPharmacyInfo={setPharmacyInfo}
        refetch={refetch}
      />
      {/* <Card className="mb-8 p-6 bg-gradient-to-r rounded-lg from-blue-500 to-purple-600 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-4 gap-8">
          <div className="font-Outfit">
            <div className="flex items-center gap-4 mb-2">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={pharmacyInfo.shopName}
                    onChange={(e) =>
                      setPharmacyInfo((previous: any) => ({
                        ...previous,
                        shopName: e.target.value,
                      }))
                    }
                    className="text-3xl outline-none border ring-offset-transparent ring-transparent font-bold bg-transparent text-white"
                  />
                  <Button
                    disabled={!pharmacyInfo.shopName}
                    size="sm"
                    className="bg-myPrimarys hover:bg-myPrimary"
                    onClick={handleUpdatePharmacyName}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <h1 className="text-3xl h-10 font-bold">
                  {pharmacyInfo.shopName}
                </h1>
              )}
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={handleEditName}>
                  <Edit className="w-5 h-5" />
                </Button>
              )}
            </div>
            {pharmacyInfo?.ratings > 0 && (
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="text-lg px-2 py-1 bg-white text-blue-600"
                >
                  {pharmacyInfo?.ratings}
                </Badge>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(pharmacyInfo?.ratings)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>({pharmacyInfo?.ratings} Ratings)</span>
              </div>
            )}
          </div>
          <Popover>
            <PopoverTrigger
              onMouseEnter={(e) => {
                e.currentTarget.click();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.click();
              }}
              asChild
            >
              <Button className="flex bg-myPrimarys items-center gap-2 outline-none ring-transparent border-none">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="font-Poppins">{pharmacyData?.favoritesCount} favorites</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mx-3 bg-white">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Favorites</h4>
                  <p className="text-sm text-muted-foreground">
                    This pharmacy has been added to {pharmacyData?.favoritesCount} users favorites list.
                  </p>
                </div>
           
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <ImageGallery pharmacyInfo={pharmacyInfo} refetch={refetch} />

          {/* Medicine Inventory */}
          <InventorySection inventoryInfo={pharmacyData?.shop?.inventory} />

          {/* Services */}
          <ServiceOffered
            key={pharmacyInfo?.id}
            pharmacyInfo={pharmacyInfo}
            refetch={refetch}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Operating Hours */}
            <BusinessHours
              hours={pharmacyInfo.hours}
              handleSetRoute={handleSetRoute}
            />

            {/* Delivery */}
            <DeliverySection
              pharmacyInfo={pharmacyInfo}
              handleSetRoute={handleSetRoute}
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Contact Info */}
          <ContactSection
            pharmacyInfo={pharmacyInfo}
            handleSetRoute={handleSetRoute}
          />

          {/* Address */}
          <AddressSection
            pharmacyInfo={pharmacyInfo}
            handleSetRoute={handleSetRoute}
          />

          {/* Location */}
          <MapWithCoord
            pharmacyInfo={pharmacyInfo}
            handleSetRoute={handleSetRoute}
          />
        </div>
      </div>

      {route === "contactInfo" && (
        <>
          {open && (
            <CustomDialog
              open={open}
              setOpen={setOpen}
              component={ContactInfo}
              pharmacyInfo={pharmacyInfo}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "Address" && (
        <>
          {open && (
            <CustomDialog
              open={open}
              setOpen={setOpen}
              component={Address}
              pharmacyInfo={pharmacyInfo}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "location" && (
        <>
          {open && (
            <CustomDialog
              open={open}
              setOpen={setOpen}
              component={LocationEdit}
              pharmacyInfo={pharmacyInfo}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "Hours" && (
        <>
          {open && (
            <CustomDialog
              open={open}
              setOpen={setOpen}
              component={HoursEdit}
              pharmacyInfo={pharmacyInfo}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "delivery" && (
        <>
          {open && (
            <CustomDialog
              open={open}
              setOpen={setOpen}
              component={DeliveryEdit}
              pharmacyInfo={pharmacyInfo}
              refetch={refetch}
            />
          )}
        </>
      )}
    </div>
  );
}
