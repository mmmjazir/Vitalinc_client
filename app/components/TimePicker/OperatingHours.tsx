import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, useState } from "react";

// type Props ={
//  hours:any
// }

const OperatingHours:FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const hours = [
        { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 7:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
      ];

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Operating Hours
          </h4>
          {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
        
        <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {hours.map((day, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="font-medium text-gray-700">{day.day}</span>
            <span className="text-gray-600">{day.hours}</span>
          </div>
        ))}
      </div>
      </div>
    );
  };

  export default OperatingHours;