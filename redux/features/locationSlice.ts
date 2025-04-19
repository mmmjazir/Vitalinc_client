// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

// interface LocationState {
//   coordinates: Coordinates;
//   placeName: string;
// }

// // Helper function to load location from localStorage with the required checks
// const loadLocationFromLocalStorage = (): LocationState => {
//   const storedLocation = localStorage.getItem('userLocation');
  
//   if (storedLocation) {
//     const parsedLocation = JSON.parse(storedLocation);
    
//       return {
//         coordinates: parsedLocation.coordinates,
//         placeName: parsedLocation.placeName,
//       };
    
//   }
  
//   return {coordinates:{lat:'',lng:''},placeName:''};
// };

// // Initial state using the helper function
// const initialState: LocationState = loadLocationFromLocalStorage();

// const locationSlice = createSlice({
//   name: 'location',
//   initialState,
//   reducers: {
//     setLocation(state, action: PayloadAction<LocationState>) {
//       const updatedState = action.payload;
     
//         localStorage.setItem(
//           'userLocation',
//           JSON.stringify({
//             coordinates: updatedState.coordinates,
//             placeName: updatedState.placeName,
//           })
//         );
//         state.coordinates = updatedState.coordinates;
//         state.placeName = updatedState.placeName;
//     },
//   },
// });

// export const { setLocation } = locationSlice.actions;
// export default locationSlice.reducer;


import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Coordinates {
  lat: number | string
  lng: number | string
}

interface LocationState {
  coordinates: Coordinates
  placeName: string
  isCurrentLocation: boolean // New flag to track if current location is selected
}

// Helper function to load location from localStorage with the required checks
const loadLocationFromLocalStorage = (): LocationState => {
  if (typeof window === "undefined") {
    return {
      coordinates: { lat: "", lng: "" },
      placeName: "",
      isCurrentLocation: false,
    }
  }

  const storedLocation = localStorage.getItem("userLocation")

  if (storedLocation) {
    try {
      const parsedLocation = JSON.parse(storedLocation)

      return {
        coordinates: parsedLocation.coordinates || { lat: "", lng: "" },
        placeName: parsedLocation.placeName || "",
        isCurrentLocation: parsedLocation.isCurrentLocation || false,
      }
    } catch (error) {
      console.error("Error parsing stored location:", error)
    }
  }

  return {
    coordinates: { lat: "", lng: "" },
    placeName: "",
    isCurrentLocation: false,
  }
}

// Initial state using the helper function
const initialState: LocationState = loadLocationFromLocalStorage()

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(
      state,
      action: PayloadAction<Omit<LocationState, "isCurrentLocation"> & { isCurrentLocation?: boolean }>,
    ) {
      const { coordinates, placeName, isCurrentLocation = false } = action.payload

      // Update state
      state.coordinates = coordinates
      state.placeName = placeName
      state.isCurrentLocation = isCurrentLocation

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            coordinates,
            placeName,
            isCurrentLocation,
          }),
        )
      }
    },

    // New action to set current location
    setCurrentLocation(state, action: PayloadAction<{ coordinates: Coordinates }>) {
      const { coordinates } = action.payload

      state.coordinates = coordinates
      state.placeName = "Current Location"
      state.isCurrentLocation = true

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            coordinates,
            placeName: "Current Location",
            isCurrentLocation: true,
          }),
        )
      }
    },

    // New action to clear location
    clearLocation(state) {
      state.coordinates = { lat: "", lng: "" }
      state.placeName = ""
      state.isCurrentLocation = false

      if (typeof window !== "undefined") {
        localStorage.removeItem("userLocation")
      }
    },
  },
})

export const { setLocation, setCurrentLocation, clearLocation } = locationSlice.actions
export default locationSlice.reducer

