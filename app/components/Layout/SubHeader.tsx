"use client"

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { LocationOn, MyLocation } from "@mui/icons-material";
import {
  LoaderCircle,
  Locate,
  LocateFixed,
  LocateOff,
  SearchIcon,
  X,
} from "lucide-react";
import {
  useLazyGetPlaceNameAutocompleteQuery,
} from "@/redux/features/autocomplete/autocompleteApi";
import {
  setLocation,
  setCurrentLocation,
} from "@/redux/features/locationSlice";
import toast from "react-hot-toast";

const SubHeader = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: any) => state.location);
  const router = useRouter();

  // State for input values and UI control
  const [placeQuery, setPlaceQuery] = useState(location?.placeName || "");
  const [medicineQuery, setMedicineQuery] = useState("");
  const [showPlaceAutocomplete, setShowPlaceAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isPlaceInputFocused, setIsPlaceInputFocused] = useState(false);

  // Refs for detecting clicks outside
  const placeAutocompleteRef = useRef<HTMLDivElement>(null);
  const medicineAutocompleteRef = useRef<HTMLDivElement>(null);
  const placeInputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const [triggerPlaceAutocomplete, { isLoading: isPlaceLoading,error }] =
    useLazyGetPlaceNameAutocompleteQuery();


useEffect(()=>{
if(error){
  if("data" in error){
    const errorMessage = error as any;
    toast.error(errorMessage.data);
   }}
},[error])


  // Debounced search functions
  const debouncedPlaceSearch = useMemo(() =>
    debounce(async (query: string) => {
      if (query.length <= 2) {
        setAutocompleteResults([]);
        setShowPlaceAutocomplete(false);
        return;
      }
      try {
        const results = await triggerPlaceAutocomplete({ query }).unwrap();
        setAutocompleteResults(results.data);
        setShowPlaceAutocomplete(true);
      } catch (error) {
        console.error("Error fetching place autocomplete results:", error);
        setAutocompleteResults([]);
        setShowPlaceAutocomplete(false);
      }
    }, 600),
    [triggerPlaceAutocomplete]);

  useEffect(() => {
    return () => {
      debouncedPlaceSearch.cancel();
    };
  }, [debouncedPlaceSearch]);

  const handleMedicineSearch = () => {
    // Only proceed if the query has content after trimming whitespace
      router.push(`/medicines?medicineQuery=${encodeURIComponent(medicineQuery.trim())}`);
  };

  const handleMedicineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMedicineSearch();
    }
  };

  // Handle location input focus
  const handleLocationInputFocus = () => {
    setIsPlaceInputFocused(true);
    // Clear input if current location is selected for better UX
    if (location.isCurrentLocation) {
      setPlaceQuery("");
    }
  };

  // Handle location input blur
  const handleLocationInputBlur = () => {
    // Delay to allow click events on autocomplete items
    setTimeout(() => {
      if (!showPlaceAutocomplete) {
        setIsPlaceInputFocused(false);
        // Restore "Current Location" text if it was the selected location
        if (location.isCurrentLocation && placeQuery === "") {
          setPlaceQuery("Current Location");
        }
      }
    }, 200);
  };

  // Handle location search input change
  const handleLocationSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value;
    setPlaceQuery(query);
    debouncedPlaceSearch(query);
  };

  // Handle medicine search input change
  const handleMedicineSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value;
    setMedicineQuery(query);
  };

  // Handle selecting a place from autocomplete
  const handleSelectPlace = (
    placeName: string,
    coordinates: { lat: number; lng: number }
  ) => {
    setPlaceQuery(placeName);
    const parsedLat = typeof coordinates.lat === "string" ? parseFloat(coordinates.lat) : coordinates.lat;
    const parsedLng = typeof coordinates.lng === "string" ? parseFloat(coordinates.lng) : coordinates.lng;
    dispatch(
      setLocation({
        coordinates:{
          lat:parsedLat,
          lng:parsedLng
        },
        placeName,
        isCurrentLocation: false,
      })
    );
    setShowPlaceAutocomplete(false);
  };


  // Handle using current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          dispatch(
            setCurrentLocation({
              coordinates: { lat, lng },
            })
          );
          setPlaceQuery("Current Location");
          setShowPlaceAutocomplete(false);
        },
        (error) => {
          console.error("Error fetching current location:", error);
          alert("Could not retrieve your current location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  // Handle clicks outside of autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!placeAutocompleteRef.current?.contains(event.target as Node)) {
        setShowPlaceAutocomplete(false);

        // Restore current location text if needed
        if (location.isCurrentLocation && placeQuery === "") {
          setPlaceQuery("Current Location");
        }
      }


    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location.isCurrentLocation, placeQuery]);

  // Update place query when location changes
  useEffect(() => {
    if (location?.placeName && !isPlaceInputFocused) {
      setPlaceQuery(location.placeName);
    }
  }, [location?.placeName, isPlaceInputFocused]);

  return (
    <div className="fixed top-[70px] max-md:h-[120px] h-[66px] left-0 z-30 max-md:w-full md:w-[100vw] bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative sm:w-1/3" ref={placeAutocompleteRef}>
            <div className="flex items-center h-10 px-3 border rounded-md bg-white">
              <LocationOn className="text-gray-400" style={{ fontSize: 20 }} />
              <input
                ref={placeInputRef}
                type="text"
                placeholder="Enter your location"
                value={placeQuery}
                onChange={handleLocationSearchChange}
                onFocus={handleLocationInputFocus}
                onBlur={handleLocationInputBlur}
                spellCheck={false}
                className="w-full font-Outfit font-medium text-gray-600 px-2 outline-none text-sm"
              />

              <button
                onClick={handleCurrentLocation}
                className="cursor-pointer ml-1"
              >
                {location.isCurrentLocation ? (
                  <LocateFixed size={19} className="text-myPrimary" />
                ) : (
                  <LocateOff size={19} className="text-gray-400" />
                )}
              </button>
            </div>
            {isPlaceInputFocused && placeQuery === "" && (
              <div className="absolute z-30 w-full mt-1 min-h-20 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                <button
                  className="flex w-full items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={handleCurrentLocation}
                >
                  <Locate size={18} className="text-myPrimary mr-2" />
                  <span className="text-sm">Your Location</span>
                </button>
              </div>
            )}
            {showPlaceAutocomplete &&
              autocompleteResults.length > 0 &&
              !isPlaceLoading && (
                <div className="absolute z-30 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {autocompleteResults.map((result: any) => (
                    <div
                      key={result.place_id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() =>
                        handleSelectPlace(result.display_place, {
                          lat: result.lat,
                          lng: result.lon,
                        })
                      }
                    >
                      {result.display_name}
                    </div>
                  ))}
                </div>
              )}
            {isPlaceLoading && (
              <div className="absolute z-30 w-full mt-1 bg-white border rounded-md shadow-lg p-4 flex justify-center">
                <LoaderCircle
                  className="animate-spin text-gray-400"
                  size={24}
                />
              </div>
            )}
          </div>

          <div className="relative sm:flex-grow" ref={medicineAutocompleteRef}>
            <div className="flex items-center h-10 border rounded-md bg-white overflow-hidden">
              <input
                type="text"
                placeholder="Search for medicines"
                value={medicineQuery}
                onChange={handleMedicineSearchChange}
                onKeyDown={handleMedicineKeyDown}
                spellCheck={false}
                className="w-full px-3 placeholder:tracking-wider tracking-wide font-Outfit text-gray-600 outline-none text-md"
              />
              {/* {isMedicineInputFocused && medicineQuery && (
                <button
                  onClick={handleClearMedicineInput}
                  className="cursor-pointer text-gray-400 hover:text-gray-600 px-2"
                >
                  <X size={16} />
                </button>
              )} */}
              <button
                onClick={handleMedicineSearch}
                className="bg-myPrimary p-2 h-full"
              >
                <SearchIcon size={20} className="text-white" />
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
