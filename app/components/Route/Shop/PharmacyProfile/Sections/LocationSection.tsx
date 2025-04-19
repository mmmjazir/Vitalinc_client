// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import { Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { Button } from "@/components/ui/button";
// import { Directions, PinDrop } from "@mui/icons-material";
// import { ChevronRight } from "lucide-react";


// const markerIcon = new Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// interface Props{
//   latitude: number;
//   longitude: number;
// }

// const LocationSection: React.FC<Props>  = ({
//   latitude, 
//   longitude 
// }) => {

//   const [placeName, setPlaceName] = useState({
//     locality: "",
//     city: "",
//     state: ""
//   });

//   const fetchPlaceName = async () => {
//     try {
//       const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
      
//       const city = res.data.address.city || 
//                    res.data.address.town || 
//                    res.data.address.village ||  
//                    res.data.address.municipality || 
//                    res.data.address.county;
      
//       const state = res.data.address.state || 
//                     res.data.address.territory || 
//                     res.data.address.state_district;
      
//       const locality = res.data.display_name.split(',')[0];

//       setPlaceName({
//         locality,
//         city,
//         state
//       });
//     } catch (error) {
//       console.error("Error fetching place name:", error);
//       setPlaceName({
//         locality: "",
//         city: "",
//         state: ""
//       });
//     }
//   };

//   useEffect(() => {
//     if (latitude && longitude) {
//       fetchPlaceName();
//     }
//   }, [latitude, longitude]);


//   return (
//     <div className="space-y-4 bg-white shadow-md pb-5 rounded-lg">
    
//      {
//       latitude && longitude && (
//           <div className="relative">
//         <MapContainer
//           center={[latitude, longitude]}
//           zoom={13}
//           className="h-[20rem] z-[10] rounded-lg"
//           attributionControl={false}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker 
//             position={[latitude, longitude]} 
//             icon={markerIcon} 
//           />
//         </MapContainer>
//       </div>
//       )
//      }
    
// <div className="px-3">


//       {placeName.locality && (
//         <div className=" px-2 rounded-b-lg">
//           <p className="font-bold text-lg text-gray-600">
//             {placeName.locality}
//           </p>
//           <p className="font-thin text-gray-500">
//             {placeName.city}, {placeName.state}
//           </p>
//         </div>
//       )}

// <Button variant="outline" className="mt-4 w-full flex bg-myPrimarys text-white gap-2">
//                   <span className="">
//                     <Directions />
//                   </span>
//                   Get Directions
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
                
//         </div>
//     </div>
//   )
// }

// export default LocationSection


import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Building2, Landmark } from "lucide-react"

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface Props {
  latitude: number
  longitude: number
  address?: {
    shopBuildingInfo?: string
    floorOrTower?: string
    areaOrLocality?: string
    city?: string
    state?: string
    landmark?: string
  }
}

const LocationSection: React.FC<Props> = ({ latitude, longitude, address }) => {
  const [placeName, setPlaceName] = useState({
    locality: "",
    city: "",
    state: "",
  })

  const [placeNameFetching,setPlaceNameFetching] = useState(true)

  const fetchPlaceName = async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
      )
      const city =
        res.data.address.city ||
        res.data.address.town ||
        res.data.address.village ||
        res.data.address.municipality ||
        res.data.address.county

      const state = res.data.address.state || res.data.address.territory || res.data.address.state_district

      const locality = res.data.display_name.split(",")[0]

      setPlaceName({
        locality,
        city,
        state,
      })
      setPlaceNameFetching(false)
    } catch (error) {
      console.error("Error fetching place name:", error)
      setPlaceName({
        locality: "",
        city: "",
        state: "",
      })
      setPlaceNameFetching(false)
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchPlaceName()
    }
  }, [latitude, longitude])

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {latitude && longitude && (
        <div className="relative h-64 z-[1]">
          <MapContainer center={[latitude, longitude]} zoom={13} className="h-full w-full" attributionControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={markerIcon} />
          </MapContainer>
        </div>
      )}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2">Map Location</h4>
           {
            placeNameFetching && !placeName.locality && !placeName.city && !placeName.state ? (
              <div>
                <p className="text-gray-600">Fetching location...</p>
              </div>
            ) : ( 
            <p className="text-gray-600">
              {placeName.locality}, {placeName.city}, {placeName.state}
            </p>
            )
           }
           
          </div>
          {address && (
            <div>
              <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                Address Details
              </h4>
              <p className="text-gray-600">
                {address.shopBuildingInfo && `${address.shopBuildingInfo},`}
                {address.floorOrTower && `${address.floorOrTower},`}
                {address.areaOrLocality && `${address.areaOrLocality},`}
                {address.city && `${address.city},`}
                {address.state}
              </p>
              {address.landmark && (
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Landmark:</span> {address.landmark}
                </p>
              )}
            </div>
          )}
        </div>
        <Button className="w-full flex bg-myPrimarys hover:bg-myPrimary text-white items-center justify-center gap-2 mt-6">
          <Navigation className="w-4 h-4" />
          Get Directions
        </Button>
      </div>
    </div>
  )
}

export default LocationSection



