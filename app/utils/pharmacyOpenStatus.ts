
export const getShopStatus = (hours: { isOpen: boolean; startTime: string; endTime: string } | null) => {
    if (!hours || !hours.isOpen) return "Closed";
  
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
    const [startHours, startMinutes] = hours.startTime.split(":").map(Number);
    const [endHours, endMinutes] = hours.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    // Check if the shop is currently open
    if (currentMinutes < startTotalMinutes || currentMinutes > endTotalMinutes) {
      return "Closed";
    }
  
    // Format the closing time properly
    const closingTime = new Date();
    closingTime.setHours(endHours, endMinutes, 0);
  
    const formattedClosingTime = closingTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    return `Open until ${formattedClosingTime}`;
  };
  