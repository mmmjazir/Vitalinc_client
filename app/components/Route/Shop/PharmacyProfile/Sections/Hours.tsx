// import { getShopStatus } from "@/app/utils/pharmacyOpenStatus";
// import { AccessAlarm, EventBusy } from "@mui/icons-material";
// import { MdAccessTime, MdClose } from "react-icons/md"; 

// type Hours={
//     hours:any
// }

// export const Hours = ({ hours }:Hours) => {
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
//     const formatTime = (time) => {
//       const [hour, minute] = time.split(":");
//       const date = new Date();
//       date.setHours(hour, minute);
//       return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     };
  
//     // Group consecutive days with the same hours
//     const groupedHours = days.reduce((acc, day) => {
//         const dayData = hours?.[day]; // Safely access the day data
//         const isOpen = dayData?.isOpen || false; // Default to false if undefined
//         const timeString = isOpen
//           ? `${formatTime(dayData.startTime)} - ${formatTime(dayData.endTime)}`
//           : "Closed";
      
//         if (acc.length && acc[acc.length - 1].timeString === timeString) {
//           acc[acc.length - 1].endDay = day;
//         } else {
//           acc.push({ startDay: day, endDay: day, timeString });
//         }
//         return acc;
//       }, []);
      
//   return (
//     <div className="pt-5 mt-3 pb-3 p-3 px-6 w-full">
//     <p className="text-xl flex items-center gap-2 text-gray-600 font-medium">Hours</p>
//     <div className="flex gap-8 items-start py-4">
//       <div className="flex flex-col gap-2 font-thin text-[17px]">
//         {groupedHours.map((group, index) => (
//           <p key={index}>
//             {group.startDay === group.endDay
//               ? group.startDay
//               : `${group.startDay} - ${group.endDay}`}
//           </p>
//         ))}
//       </div>
//       <div className="flex flex-col gap-2 text-[17px]">
//         {groupedHours.map((group, index) => (
//           <p key={index} className="flex gap-1">
//             <span>{group.timeString === "Closed" ? <EventBusy /> : <AccessAlarm />}</span>
//             {group.timeString}
//           </p>
//         ))}
//       </div>
//     </div>
//   </div>
//   );
// };



// export const HoursTodayStatus = ({data})=>{

//   if (!data?.pharmacy?.hours) {
//     return <p>Hours information is not available</p>; 
//   }

//   const todayKey = new Date().toLocaleString("en-US", { weekday: "long" });

//   // Retrieve today's hours using the day name
//   const todayHours = data.pharmacy.hours[todayKey];

//   const status = getShopStatus(todayHours);
  
//   return(
//     <div className="flex items-center px-2"> 
//       <span className="font-extrabold font-Poppins">
//                       &middot;
//        </span>
//          <p className={` text-myPrimary ${status=== 'Closed' && 'text-secondary'} text-lg font-medium px-1`}>
        
//        <span>{status}</span>        
//       </p>
//     </div>
   
//   )
// }



import { getShopStatus } from "@/app/utils/pharmacyOpenStatus"
import { Clock, AlertCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Hours = {
  hours: any
}

export const Hours = ({ hours }: Hours) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const formatTime = (time) => {
    const [hour, minute] = time.split(":")
    const date = new Date()
    date.setHours(hour, minute)
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }

  const groupedHours = days.reduce((acc, day) => {
    const dayData = hours?.[day]
    const isOpen = dayData?.isOpen || false
    const timeString = isOpen ? `${formatTime(dayData.startTime)} - ${formatTime(dayData.endTime)}` : "Closed"

    if (acc.length && acc[acc.length - 1].timeString === timeString) {
      acc[acc.length - 1].endDay = day
    } else {
      acc.push({ startDay: day, endDay: day, timeString, isOpen })
    }
    return acc
  }, [])

  const todayIndex = new Date().getDay()
  const todayHours = groupedHours.find(
    (group) => days.indexOf(group.startDay) <= todayIndex && days.indexOf(group.endDay) >= todayIndex,
  )

  return (
    <Card className="bg-white shadow-md overflow-hidden">
        <CardTitle className="text-xl font-semibold p-4 flex text-myPrimary font-Arimo items-center">
          Operating Hours
        </CardTitle>
      <CardContent>
        <div className="flex justify-between items-center py-4 mb-4">
          <span className="font-medium">Today</span>
          <span className={`${todayHours?.isOpen ? "text-green-600" : "text-red-600"} font-medium`}>
            {todayHours?.timeString}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          <span>View all hours</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2"
            >
              {groupedHours.map((group, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="font-medium text-gray-700">
                    {group.startDay === group.endDay ? group.startDay : `${group.startDay} - ${group.endDay}`}
                  </div>
                  <div
                    className={`flex items-center gap-2 ${group.isOpen ? "text-green-600" : "text-red-600"} font-medium`}
                  >
                    {group.isOpen ? <Clock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {group.timeString}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export const HoursTodayStatus = ({ data }) => {
  if (!data?.pharmacy?.hours) {
    return null
  }

  const todayKey = new Date().toLocaleString("en-US", { weekday: "long" })
  const todayHours = data.pharmacy.hours[todayKey]
  const status = getShopStatus(todayHours)

  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-gray-100 transition-colors duration-200">
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          status === "Open" ? "bg-green-500" : status === "Closed" ? "bg-red-500" : "bg-yellow-500"
        }`}
      ></span>
      <span className={status === "Open" ? "text-green-700" : status === "Closed" ? "text-red-700" : "text-yellow-700"}>
        {status}
      </span>
    </div>
  )
}

