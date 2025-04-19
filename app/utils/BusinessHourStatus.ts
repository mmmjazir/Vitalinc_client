// utils/businessHours.ts

/**
 * Interface for today's hours data structure
 */
interface TodayHours {
  isOpen: boolean;
  startTime?: string;
  endTime?: string;
}

/**
 * Return value interface with business status and user-friendly time information
 */
interface BusinessHoursInfo {
  isCurrentlyOpen: boolean;
  displayStatus: string;
  closingSoon: boolean;
  timeRemaining?: number; // minutes remaining until closing
  fullTimeString: string; // full operating hours
}

/**
 * Gets user-friendly business hours information
 * @param todayHours Object containing isOpen flag and operating hours
 * @returns Object with current status and user-friendly time information
 */
export function getBusinessHoursInfo(todayHours: TodayHours): BusinessHoursInfo {
  // Default values
  const defaultInfo: BusinessHoursInfo = {
    isCurrentlyOpen: false,
    displayStatus: "Closed Today",
    closingSoon: false,
    fullTimeString: "Closed Today"
  };

  // If isOpen is false in todayHours, the business is closed for the day
  if (!todayHours.isOpen) {
    return defaultInfo;
  }

  // If no start or end time provided despite isOpen being true
  if (!todayHours.startTime || !todayHours.endTime) {
    return {
      ...defaultInfo,
      displayStatus: "Hours not specified",
      fullTimeString: "Hours not specified"
    };
  }

  // Get current time in Asia/Kolkata timezone
  const now = new Date();
  const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false };
  const timeInKolkata = now.toLocaleTimeString('en-US', options);
  
  // Extract hours and minutes from the current time
  const [currentHours, currentMinutes] = timeInKolkata.split(':').map(Number);
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Parse start and end times
  const [startHours, startMinutes] = todayHours.startTime.split(':').map(Number);
  const [endHours, endMinutes] = todayHours.endTime.split(':').map(Number);
  
  const startTimeInMinutes = startHours * 60 + startMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  // Format time for 12-hour display (9:00 AM, 5:30 PM, etc.)
  const formatTimeString = (hours: number, minutes: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Format time for natural language (9 AM, 5:30 PM, etc.)
  const formatNaturalTime = (hours: number, minutes: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return minutes === 0 
      ? `${displayHours} ${period}` 
      : `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const formattedStartTime = formatTimeString(startHours, startMinutes);
  const formattedEndTime = formatTimeString(endHours, endMinutes);
  const naturalEndTime = formatNaturalTime(endHours, endMinutes);
  
  // Determine if business spans overnight
  const isOvernightBusiness = endTimeInMinutes <= startTimeInMinutes;
  
  // Format full time string
  const fullTimeString = isOvernightBusiness
    ? `${formattedStartTime} - ${formattedEndTime} (next day)`
    : `${formattedStartTime} - ${formattedEndTime}`;

  // Check if business is currently open
  let isOpen = false;
  let timeRemaining = 0;

  if (isOvernightBusiness) {
    // For overnight businesses (e.g., 10 PM to 2 AM)
    isOpen = currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes;
    
    if (isOpen) {
      if (currentTimeInMinutes >= startTimeInMinutes) {
        // After start time but before midnight
        timeRemaining = (24 * 60) - currentTimeInMinutes + endTimeInMinutes;
      } else {
        // After midnight but before end time
        timeRemaining = endTimeInMinutes - currentTimeInMinutes;
      }
    }
  } else {
    // For same-day businesses (e.g., 9 AM to 5 PM)
    isOpen = currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
    
    if (isOpen) {
      timeRemaining = endTimeInMinutes - currentTimeInMinutes;
    }
  }

  // Determine if closing soon (within 30 minutes)
  const closingSoon = isOpen && timeRemaining <= 30;

  // Create user-friendly status message
  let displayStatus = "Closed";
  
  if (isOpen) {
    if (timeRemaining <= 15) {
      displayStatus = `Closing in ${timeRemaining} minute${timeRemaining === 1 ? '' : 's'}`;
    } else {
      displayStatus = `Open until ${naturalEndTime}`;
    }
  } else {
    // Check if opening soon (within next hour)
    const minutesUntilOpening = isOvernightBusiness && currentTimeInMinutes > endTimeInMinutes
      ? (startTimeInMinutes - currentTimeInMinutes + (24 * 60)) % (24 * 60)
      : startTimeInMinutes - currentTimeInMinutes;
      
    if (minutesUntilOpening > 0 && minutesUntilOpening <= 60) {
      displayStatus = `Opening in ${minutesUntilOpening} minute${minutesUntilOpening === 1 ? '' : 's'}`;
    }
  }

  return {
    isCurrentlyOpen: isOpen,
    displayStatus,
    closingSoon,
    timeRemaining: isOpen ? timeRemaining : undefined,
    fullTimeString
  };
}