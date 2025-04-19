import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, Edit } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import React, { FC, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { Icon, LatLng } from "leaflet";
import Link from 'next/link';

const LocationPicker = ({ lat, lng }) => {
 const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
 const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 13, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [lat, lng, map]);


  return lat && lng ? <Marker position={[lat, lng]} icon={markerIcon} /> : null;
};


type Props = {
    pharmacyInfo:any;
    handleSetRoute: any;
}

const MapWithCoord:FC<Props> = ({pharmacyInfo,handleSetRoute}) => {

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
           
    <div className="flex gap-3">
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSetRoute("location")}
        >
          <Edit className="w-5 text-gray-500 h-5" />
        </Button>
   </div>

      <div className="aspect-video mb-4 rounded-lg overflow-hidden">
      <MapContainer
            center={[
              pharmacyInfo.coordinates.lat,
              pharmacyInfo.coordinates.lng,
            ]}
            zoom={5}
            attributionControl={false}
             className="h-[20rem] z-20 rounded-lg"
>
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
        <LocationPicker lat={pharmacyInfo.coordinates.lat} lng={pharmacyInfo.coordinates.lng} />
        
        </MapContainer>
      </div>
    
      <div className="mb-4 text-md text-gray-600">
        <p><span className='font-medium'>Latitude: </span>{pharmacyInfo.coordinates.lat}</p>
        <p><span className='font-medium'>Longitude:</span> {pharmacyInfo.coordinates.lng}</p>
      </div>
    
     <Link 
       href={`https://www.google.com/maps/search/?api=1&query=${pharmacyInfo.coordinates.lat},${pharmacyInfo.coordinates.lng}`} 
     target="_blank" 
     rel="noopener noreferrer"
     >
      <Button variant="outline" className="mt-4 w-full">
        Get Directions
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
      </Link>

    </Card>
  )
}

export default MapWithCoord;