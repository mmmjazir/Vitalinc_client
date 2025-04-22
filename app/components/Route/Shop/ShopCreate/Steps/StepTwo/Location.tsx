import React, { useState, useEffect, useCallback, FC, useRef, SetStateAction, Dispatch } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { debounce } from "lodash";
import { GpsFixed } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useLazyGetReverseGeoCodingQuery } from "@/redux/features/locationIq/locationIqApi";
import { useLazyGetPlaceNameAutocompleteQuery } from "@/redux/features/autocomplete/autocompleteApi";

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const isLocationInIndia = async (lat: number, lng: number,getReverseGeoCoding:any,setFieldValue:any,setFieldTouched:any): Promise<any> => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}addressdetails=1`);
    if(response.data.address.country === "India"){
      setFieldValue('coordinates.error', undefined);
      setFieldTouched('coordinates.error', true, false);
      return { res:response, isInIndia: true, error: null };
    }else{
      setFieldValue('coordinates.error', "Location is outside India. Please select a valid location.");
      setFieldTouched('coordinates.error', true, false);
      return { isInIndia: false, error: null };     
     } 
  } catch (error) {
    try {
      const response = await getReverseGeoCoding({ lat,lng }).unwrap();
      if(response.data.address.country === "India"){
        setFieldValue('coordinates.error', undefined);
        setFieldTouched('coordinates.error', true, false);
        return { res:response,isInIndia: true, error: null };
      }else{
        setFieldValue('coordinates.error', "Location is outside India. Please select a valid location.");
        setFieldTouched('coordinates.error', true, false);
        return { isInIndia: false, error: null };     
       } 
    } catch (error) {
      console.warn("Error checking location:", error);
      setFieldValue('coordinates.error', "Error checking location");
      setFieldTouched('coordinates.error', true, false);
      return { isInIndia: null, error };     
    }
  }

};


const LocationPicker = ({ lat, lng, onLocationChange,getReverseGeoCoding,setFieldError,setFieldTouched,setFieldValue }:any) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 13, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [lat, lng, map]);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const isInIndia = await isLocationInIndia(lat, lng,getReverseGeoCoding,setFieldValue,setFieldTouched);
     
      if (isInIndia?.isInIndia) {
        onLocationChange(lat, lng);
      } else if (!isInIndia?.error) {
        toast.error("Location is outside India. Please select a valid location.")
      } 
     
    },
  });

  return lat && lng ? <Marker position={[lat, lng]} icon={markerIcon} /> : null;
};

type Props={
  state: any;
  setState: (state: any) => void;
  handleChange:any;
  onBlur:any;
  setFieldError: (field: string, message: string | undefined) => void;
  errors: any;
  touched: any;
  setFieldTouched:any;
  setFieldValue:any;
  placeName: any;
  setPlaceName: Dispatch<SetStateAction<{ locality: string; city: string }>>
}

const LocationSelector:FC<Props> = ({state,setState,handleChange,onBlur,
                               setFieldError,setFieldValue,errors,
                               touched,setFieldTouched,placeName,setPlaceName}) => {
  // const [placeName, setPlaceName] = useState({locality: "",city:""});
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  
  const [getReverseGeoCoding, { isLoading: isReverseGeocodeLoading }] =
    useLazyGetReverseGeoCodingQuery();
  const [triggerPlaceAutocomplete, { isLoading: isPlaceLoading }] =
    useLazyGetPlaceNameAutocompleteQuery();



  const fetchPlaceName = async (lat: number, lng: number): Promise<void> => {
    try {
      const isInIndia = await isLocationInIndia(lat, lng,getReverseGeoCoding,setFieldValue,setFieldTouched);
    if(isInIndia?.isInIndia){
      // const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`);
     const res = isInIndia?.res;
      const city = res.data.address.city || res.data.address.town || res.data.address.village ||  res.data.address.municipality || res.data.address.county;
     const state = res.data.address.state || res.data.address.territory || res.data.address.state_district
      // const locality = res.data.address.suburb || res.data.address.neighbourhood || res.data.address.locality || res.data.address.village || res.data.address.amenity;
      const locality = res.data.display_name.split(',')[0];
      setPlaceName({locality,city});
      setFieldValue('city',city)
      setState((prev:any)=> ({...prev,address:{...prev.address,city,state}}))
      // setFieldValue('coordinates.error', undefined);
    }else{
      setPlaceName({locality:"",city:""});
      setFieldValue('city',null)

      // setState((prev:any)=> ({...prev,address:{...prev.address,city:"",state:""}}))
      // setFieldError('coordinates.error', "Location is outside India. Please select a valid location.");
      // setFieldValue('coordinates.error', "Location is outside India. Please select a valid location.");
      // setFieldTouched('coordinates.error', true, false);
      }

    } catch (error) {
      console.error("Error fetching place name:", error);
      // setFieldValue('coordinates.error', undefined);
      setState((prev:any)=> ({...prev,address:{...prev.address,city:"",state:""}}));
      setFieldValue('city',null);
      setPlaceName({locality: "",city:""});
    }
  };
 

  useEffect(() => {
    if (state.coordinates.lat && state.coordinates.lng) {
      fetchPlaceName(state.coordinates.lat, state.coordinates.lng);

    }else{
      setPlaceName({locality: "",city:""});
      setState((prev:any)=> ({...prev,address:{...prev.address,city:"",state:""}}))
      setFieldValue('city',null)
    }
  }, [state.coordinates]);

  const handleSetCoords = (lat: number, lng: number) => {
    setState((prev:any)=> ({...prev,coordinates:{lat,lng}}));
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const isInIndia = await isLocationInIndia(latitude, longitude,getReverseGeoCoding,setFieldValue,setFieldTouched);
          if (isInIndia?.isInIndia) {
            handleSetCoords(latitude, longitude);
            setFieldValue('coordinates.lat', latitude);
            setFieldValue('coordinates.lng', longitude);
            setFieldValue('coordinates.error', undefined);
            setFieldTouched('coordinates.error', true, false);
          } 
          // else {
          //   // setFieldError('coordinates.error', "Location is outside India. Please select a valid location.");
          //   setFieldValue('coordinates.error', "Location is outside India. Please select a valid location.");
          //   setFieldTouched('coordinates.error', true, false);
          // }
        },
        (error) => {
          console.error("Error getting location: ", error);
          // setFieldError('coordinates.error', "Error getting location:");
          setFieldValue('coordinates.error', "Error getting location:");
          setFieldTouched('coordinates.error', true, false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // const handleSearchInput = async (query: string) => {
  //   setSearchQuery(query);
  //   setErrorMessage("");
  //   if (query.length < 3) {
  //     setAutocompleteResults([]);
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5`);
  //     setAutocompleteResults(res.data);
  //   } catch (error) {
  //     console.error("Error fetching autocomplete results: ", error);
  //     setErrorMessage("Failed to fetch suggestions. Please try again.");
  //   }
  // };

  
  const debouncedSearch = 
    debounce(async (query: string) => {
   
      if (query.length < 3) {
        // setAutocompleteResults([]);
        return;
      };
      try {  
        // const res = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&countrycodes=in&limit=5`);
        const results = await triggerPlaceAutocomplete({ query }).unwrap();
        setAutocompleteResults(results.data);        
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    }, 500)

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };



  const handleSelectPlace = (lat: number, lng: number, displayName: string) => {
    handleSetCoords(lat, lng);
    setFieldValue('coordinates.lat', lat);
    setFieldValue('coordinates.lng', lng);
    setSearchQuery("");
    setAutocompleteResults([]);
  };

  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    handleChange(e)
    setState((prev:any) => ({
      ...prev,
      coordinates:{...prev.coordinates, [id]: value === '' ? '' : parseFloat(value)}
    }));
  };

  return (
    <div className="space-y-4">
      
      <h1 className="font-medium text-md">Add your Pharmacy location</h1>
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search for a place in India"
          value={searchQuery}
          onChange={handleSearchInput}
        />
        {autocompleteResults.length > 0 && (
          <div className="absolute z-30 max-h-[16rem] overflow-y-scroll w-full mt-1 bg-white border rounded-md shadow-lg">
            {autocompleteResults.map((result: any) => (
              <div
                key={result.place_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleSelectPlace(
                    parseFloat(result.lat),
                    parseFloat(result.lon),
                    result.display_name
                  )
                }
              >
                {result.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="relative">
          <MapContainer
            center={[
              state.coordinates?.lat,
              state.coordinates?.lng,
            ]}
            zoom={5}
            className="h-[20rem] z-20 rounded-lg"
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker
              lat={state.coordinates?.lat}
              lng={state.coordinates?.lng}
              onLocationChange={handleSetCoords}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              getReverseGeoCoding={getReverseGeoCoding}
            /> 
            
          </MapContainer>

        

          <div className="absolute w-full bottom-[1rem] flex justify-center">
            <button
              className="w-fit z-[50] text-sm  text-blue-500 bg-white py-2 px-4 border border-blue-500 rounded-full"
              onClick={handleGetCurrentLocation}
            >
              <span>
                <GpsFixed />
              </span>{" "}
              Use Current Location
            </button>
          </div>
        </div>

        {placeName && (
          <div className=" bg-white shadow-md py-3 px-2 rounded-b-lg">
            <p className="font-bold text-lg text-gray-600">
              {placeName.locality}
            </p>
            <p className="font-thin text-gray-500">{placeName.city}</p>
          </div>
        )} 
        
        {(errors.coordinates?.error) && (touched.coordinates?.error) && (
                 <p className="text-red-500"> {errors.coordinates.error as string}</p>
              )}
      </div>

      <div>
        <label className="block py-2 text-md font-medium text-gray-700 ">
        Enter the co-ordinates
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            name="coordinates.lat"
            id="lat"
            value={state.coordinates?.lat}
            onChange={handleCoordChange}
            onBlur={onBlur}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Latitude"
            step="any"
          />
          <input
            type="number"
            name="coordinates.lng"
            id="lng"
            value={state.coordinates?.lng}
            onChange={handleCoordChange}
            onBlur={onBlur}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Longitude"
            step="any"
          />
        </div>
      </div>
       {(errors.coordinates?.lat || errors.coordinates?.lng )  && (touched.coordinates?.lat || touched.coordinates?.lng) && (
                 <span className="text-red-500">{errors.coordinates.lat as string}, {errors.coordinates.lng as string}</span>
              )} 
    </div>
  );
};

export default LocationSelector;